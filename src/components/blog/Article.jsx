import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import articleService from '../../services/articleService';
import userService from '../../services/userService';
import observer from "../../api/observer";
//

export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: null
        };
    }

    deleteAuthor = () => {
        console.log(this.props.author);
        userService.getByUsername(this.props.author).then((res) => {
            let data = res[0]._id;
            userService.delete.send(data)
                .then(userService.delete.success)
                .catch(userService.delete.fail);
            observer.trigger(observer.events.redirect, '/blog');
        })
    };

    render() {
        const isAuthorized = this.props.author === sessionStorage.getItem('username');
        const isAdmin = sessionStorage.getItem('userRole') === 'admin';
        const adminSection =
            <div>
                <Link to='#' onClick={this.deleteAuthor} class="btn btn-danger btn-sm">Ban User</Link>
            </div>;
        const authorizedSection =
            <div class="article-button">
                <Link to={'/Article/Edit/' + this.props._id} class="btn btn-warning btn-sm">Edit</Link>
                
            </div>;
        return(                
          <div class="card mb-4">
            <img class="card-img-top" src={this.props.imageUrl} alt="Card image cap"/>
            <div class="card-body">
              <h2 class="card-title">{this.props.title}</h2>
              <p class="card-text">{this.props.description}</p>
              <div class="article-button">
                <Link  class="btn btn-outline-secondary" to={'/Category/' + this.props.category}>{this.props.category}</Link>
              </div>
             
              <Link to={'/Article/Details/' + this.props._id} class="btn btn-primary btn-sm">Read More &rarr;</Link>
            </div>
            <div class="card-footer text-muted">
            Posted {articleService.createdBeforeDays(this.props._kmd.ect)} ago by 
              <a href="#"> {this.props.author}</a>
              {isAuthorized || isAdmin ? authorizedSection : null}
                            {isAdmin ? adminSection : null}
            </div>
          </div>
    )
    }
}