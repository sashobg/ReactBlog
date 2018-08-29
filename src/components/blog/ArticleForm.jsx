import React, {Component} from 'react';
import ArticleCreate from './ArticleCreate';
import {Redirect} from 'react-router';

export default class ArticleForm extends Component {
    constructor(props){
        super(props);
        this.state = { username: null }
    }
    render = () => {
        if (sessionStorage.getItem('username')) {
            return (
                <div>
                    <ArticleCreate/>
                </div>
            )
        } else {
            return (
                <Redirect to='/'/>
            )
        }
    }
}
