import requester from "../../api/requester";
import Article from "./Article";
import React, {Component} from 'react';
import {Redirect} from "react-router";

export default class ByCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            username: null            
        }
    };
   
  
    getPostsByCategory = (articleCategory) => {
        requester.get('appdata', 'articles', 'kinvey')
                .then(res => {
                    let categoryArticles = [];
                    for(let i = 0; i < res.length; i++){
                        if(res[i].category === articleCategory){
                            categoryArticles.push(res[i]);
                        }
                    }
                    this.setState({articles: categoryArticles});
                });
        };
      
          componentDidUpdate(prevProps) {
           if(prevProps.match.params.category !== this.props.match.params.category)    
            {              
                this.getPostsByCategory(this.props.match.params.category)
            }
           
          }
        componentDidMount () {
            const { category } = this.props.match.params           
            this.getPostsByCategory(category)
          }

         

    render = () => {
        if (sessionStorage.getItem('username')) {
            return (
                <div class="content">
           <div class="row justify-content-center">           
                <div class="col-md-6">
                    <h1 class="my-4">Category: {this.props.match.params.category}                     
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