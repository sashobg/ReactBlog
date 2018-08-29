import requester from "../../api/requester";
import Article from "./Article";
import React, {Component} from 'react';
import {Redirect} from "react-router";

export default class AllArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            username: null
        }
    };

    getMyPosts = () => {
        requester.get('appdata', 'articles', 'kinvey')
                .then(res => {
                    let myArticles = [];
                    for(let i = 0; i < res.length; i++){
                        if(res[i].author === sessionStorage.getItem('username')){
                            myArticles.push(res[i]);
                        }
                    }
                    this.setState({articles: myArticles});
                });
        };


    componentDidMount = () => this.getMyPosts();

    render = () => {
        if (sessionStorage.getItem('username')) {
            return (
                <section id="viewBlog">
                    {this.state.articles.map((article, i) => <Article key={article._id}
                                                                      index={i} {...article} {...this.props}/>)}
                </section>
            )
        } else {
            return (
                <Redirect To='/'/>
            )
        }
    }
}