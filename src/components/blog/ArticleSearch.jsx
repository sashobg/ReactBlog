import requester from "../../api/requester";
import Article from "./Article";
import React, {Component} from 'react';
import {Redirect} from "react-router";

export default class ArticleSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            username: null            
        }
    };
   
  
    getPostsBySearchQuery = (query) => {
        requester.get('appdata', 'articles', 'kinvey')
                .then(res => {
                    let resultArticles = [];
                    for(let i = 0; i < res.length; i++){
                        if(res[i].title.toLowerCase().indexOf(query.toLowerCase()) !== -1){
                            resultArticles.push(res[i]);
                        }
                    }
                    this.setState({articles: resultArticles});
                });
        };
      
          componentDidUpdate(prevProps) {
           if(prevProps.match.params.query !== this.props.match.params.query)    
            {              
                this.getPostsBySearchQuery(this.props.match.params.query)
            }
           
          }
        componentDidMount () {
            const { query } = this.props.match.params           
            this.getPostsBySearchQuery(query)
          }

         

    render = () => {
        if (sessionStorage.getItem('username')) {
            return (
                <div class="content">
           <div class="row justify-content-center">           
                <div class="col-md-6">
                    <h1 class="my-4">Search: "{this.props.match.params.query}"                     
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