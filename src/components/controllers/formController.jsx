import React, {Component} from 'react';

function getRequestData(state, defaultState) {
    let data = {};

    for (let key of Object.keys(defaultState)) {
        data[key] = state[key];
    }
    return data;
}

export default function ArticleController(Form, model, submitter) {
    return class ArticleManager extends Component {
        constructor(props) {
            super(props);
            this.dataModel = {
                ...model.defaultState,
                ...this.props.extraState
            };

            this.state = {
                error: null,
                ...this.dataModel
            };

            this.success = this.props.success || submitter.success.bind(this);
            this.fail = this.props.fail || submitter.fail.bind(this);
        }

        componentWillReceiveProps = (nextProps) => {
      
        };

        handleChange = ev => {
            let fieldName = ev.target.name;
            let fieldValue = ev.target.value;
            function escapeHtml(unsafe) {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            }
            console.log(escapeHtml(fieldName), escapeHtml(fieldValue));
            this.setState({[escapeHtml(fieldName)]: escapeHtml(fieldValue)});
        };

        handleSubmit = ev => {
            ev.preventDefault();

            let data = getRequestData(this.state, this.dataModel);
            console.log(data);
            if (model.validate) {
                let error = model.validate(data);
                if (error) {
                    this.setState({ error })
                } else {
                    submitter.send(data)
                        .then(this.success)
                        .catch(this.fail);
                }
            }
        };

        render = () => {           
            return (<Form
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    {...this.state} />
            )
        };
    }
}