import React, {Component, Fragment} from 'react';

import requester from '../../api/requester'
import articleService from '../../services/articleService';
import {Link} from "react-router-dom";
import observer from "../../api/observer";
import model from '../../models/articleModel';
import DocumentTitle from 'react-document-title';
import userService from "../../services/userService";

function getRequestData(state, defaultState) {
    let data = {};

    for (let key of Object.keys(defaultState)) {
        data[key] = state[key];
    }
    return data;
}

export default class ArticleDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            title: '',
            content: '',
            category: '',
            desctription: '',
            imageUrl: '',
            url: '',
            author: '',
            createdOn: '',
        };
        this.dataModel = {
            ...model.defaultState,
            ...this.props.extraState
        };
    }

    deleteAuthor = () => {
        console.log(this.state.author);
        userService.getByUsername(this.state.author).then((res) => {
            let data = res[0]._id;
            userService.delete.send(data)
                .then(userService.delete.success)
                .catch(userService.delete.fail);
            observer.trigger(observer.events.redirect, '/blog');
        })
    };

    componentDidMount = () => {
        console.log(this.props.match);
        let articleId = this.props.match.params.id;
        console.log(articleId);
        this.setState({_id: articleId});
        requester.get('appdata', 'articles/' + articleId, 'kinvey')
            .then(res => {
                this.setState({
                    createdOn: res._kmd.ect,
                    ...res
                })
            })
            .catch(console.log);
    };
    render = () => {
        const isAdmin = sessionStorage.getItem('userRole') === 'admin';
        const authorizedSection = <div class="article-button">        
            <Link to='#' onClick={this.deleteAuthor} class="btn btn-sm btn-danger">Delete User</Link>
            <div>
                <br/>
                <Link to={'/Article/Edit/' + this.state._id} class="btn btn-sm btn-warning">Edit</Link>
            </div>
        </div>;
        return (
            <div class="container">
              <div class="row justify-content-center">      
                 <div class="col-lg-8">
                    <h1 class="mt-4">{this.state.title}</h1>
                    <p class="lead"> by <a href="#">{this.state.author}</a></p>
                    <hr></hr>
                    <p>Posted {articleService.createdBeforeDays(this.state.createdOn)} ago</p>
                    <hr></hr>
                    <img class="img-fluid rounded" src={this.state.imageUrl} alt=""/>
                    <hr></hr>
                    <p class="lead">Category: <Link to={'/Category/' + this.state.category}>{this.state.category}</Link></p>
                    <hr></hr>
                    <p>{this.state.content}</p>
                    <hr></hr>
                        {isAdmin ? authorizedSection : null}
                        </div>
                    </div>
                </div>
           
        )
    }
}