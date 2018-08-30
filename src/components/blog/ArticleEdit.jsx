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
                    category: res.category,
                    id: articleId
                });
                console.log(res);
            })
            .catch(console.log);
    };

    render = () => {
        const isAdmin = sessionStorage.getItem('userRole') === 'admin';
        const authorizedSection = <div>
            <br/>
            <Link to='#' onClick={this.deleteArticle} class="btn btn-danger btn-sm">Delete Article</Link>        
            </div>
        return (
            <div class="content">
            <div class="row justify-content-center">
            <div class="col-6 text-center">
            <div class="form-group">
                <form id="articleCreateForm" onSubmit={this.handleSubmit}>
                    <h2>Edit Article</h2>
                    {this.props.error}
                    <div class="form-group">
                        <label>Title:</label>
                        <input class="form-control"
                               name="title"
                               onChange={this.handleChange}
                               type="text"
                               value={this.props.title}
                               placeholder={this.state.title}/>
                    </div>
                    <hr></hr>
                    <div class="form-group">
                        <label>Image URL:</label>
                        <input class="form-control"
                               name="imageUrl"
                               onChange={this.handleChange}
                               type="text"
                               value={this.props.imageUrl}
                               placeholder={this.state.imageUrl} required/>
                    </div>
                    <hr></hr>
                    <div class="form-group">
                        <label>Description:</label>
                        <input class="form-control"
                               name="description"
                               onChange={this.handleChange}
                               type="text"
                               value={this.props.description}
                               placeholder={this.state.description}/>
                    </div>
                    <hr></hr>
                    
                    <div class="form-group">
                        <label>Category</label>
                        <select name="category"
                                class="form-control"
                                onChange={this.handleChange}
                                type="text"
                                value={this.state.category}>                            
                            <option value="Audi">Audi</option>
                            <option value="VW">VW</option>
                            <option value="BMW">BMW</option>
                            <option value="Mercedes">Mercedes</option>
                            <option value="Skoda">Skoda</option>
                            <option value="Seat">Seat</option>
                            <option value="Opel">Opel</option>
                            <option value="Kia">Kia</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Honda">Honda</option>    
                        </select>
                    </div>
                    <hr></hr>
                    <div class="form-group">
                        <label>Content:</label>
                        <textarea class="form-control"
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
            </div></div></div>
        )
    }
}


export default ArticleEdit;
