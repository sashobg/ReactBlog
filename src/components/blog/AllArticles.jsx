import requester from "../../api/requester";
import Article from "./Article";
import React, {Component} from 'react';

export default class AllArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            username: null
        }
    };

    getPosts = () => {
        if (!sessionStorage.getItem('username')) {
           
        } else {
            requester.get('appdata', 'articles', 'kinvey')
                .then(res => {
                    this.setState({articles: res})
                });
        }
    };


    componentDidMount = () => this.getPosts();

    render = () => {
        
            return (
                <div class="content">
                   <div class="row justify-content-center">           
                        <div class="col-md-6">
                            <h1 class="my-4">All Articles                       
                            </h1>
                            {this.state.articles.map((article, i) => <Article key={article._id}
                                                                          index={i} {...article} {...this.props}/>)}
                        </div>
                    </div>
                </div>
        
                   
                )
        
       
    }
}