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
                <div class="content">
                <div class="row justify-content-center">           
                     <div class="col-md-6">
                         <h1 class="my-4">My Articles                       
                         </h1>
                         {this.state.articles.map((article, i) => <Article key={article._id}
                                                                       index={i} {...article} {...this.props}/>)}
                     </div>
                 </div>
             </div>
            )
        } else {
            return (
                <Redirect To='/'/>
            )
        }
    }
}