import React, {Component} from 'react';

import model from '../../models/articleModel';
import submitter from '../../services/articleService';
import requester from "../../api/requester";
import observer from "../../api/observer";
import {Link} from "react-router-dom";

function getRequestData(state, defaultState) {
    let data = {};

    for (let key of Object.keys(defaultState)) {
        data[key] = state[key];
    }
    return data;
}

class ArticleEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
        };
        this.dataModel = {
            ...model.defaultState,
            ...this.props.extraState
        };
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

    deleteArticle = () => {
        let data = getRequestData(this.state, this.dataModel);
        submitter.delete.send(data)
            .then(submitter.delete.success)
            .catch(submitter.delete.fail);
        observer.trigger(observer.events.redirect, '/blog');
    };

    handleSubmit = ev => {
        ev.preventDefault();

        let data = getRequestData(this.state, this.dataModel);

        if (model.validate) {
            let error = model.validate(data);
            if (error) {
                this.setState({error})
            } else {
                submitter.edit.send(data)
                    .then(submitter.edit.success)
                    .catch(submitter.edit.fail);
            }
        }
    };

    componentDidMount = () => {
        let articleId = window.location.pathname.slice(14);
        requester.get('appdata', 'articles/' + articleId, 'kinvey')
            .then(res => {
                this.setState({
                    author: res.author,
                    title: res.title,
                    content: res.content,
                    imageUrl: res.imageUrl,
                    description: res.description,
                    Category: res.Category,
                    id: articleId
                });
                console.log(res);
            })
            .catch(console.log);
    };

    render = () => {
        const isAdmin = sessionStorage.getItem('userRole') === 'admin';
        const authorizedSection = <div className="border-danger">
            <Link to='#' onClick={this.deleteArticle} className="btn-danger">Delete Article</Link>
        </div>;
        return (
            <div className="form-group">
                <form id="articleCreateForm" onSubmit={this.handleSubmit}>
                    <h2>Edit Article</h2>
                    {this.props.error}
                    <div className="form-group">
                        <label>Title:</label>
                        <input className="form-control"
                               name="title"
                               onChange={this.handleChange}
                               type="text"
                               value={this.props.title}
                               placeholder={this.state.title}/>
                    </div>
                    <div className="form-group">
                        <label>Image URL:</label>
                        <input className="form-control"
                               name="imageUrl"
                               onChange={this.handleChange}
                               type="text"
                               value={this.props.imageUrl}
                               placeholder={this.state.imageUrl}/>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input className="form-control"
                               name="description"
                               onChange={this.handleChange}
                               type="text"
                               value={this.props.description}
                               placeholder={this.state.description}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Category</label>
                        <select name="Category"
                                className="form-control"
                                onChange={this.handleChange}
                                type="text"
                                value={this.props.Category}>
                            <option>...</option>
                            <option>Audi</option>
                            <option>BMW</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <textarea className="form-control"
                                  name="content"
                                  onChange={this.handleChange}
                                  type="text"
                                  value={this.props.content}
                                  placeholder={this.state.content}/>
                    </div>
                    <input class="btn btn-sm btn-success" type="submit" value="Submit Article Edit"/>
                    {isAdmin ? authorizedSection : null}
                </form>
            </div>
        )
    }
}


export default ArticleEdit;
