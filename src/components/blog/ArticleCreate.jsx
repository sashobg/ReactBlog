import React, {Component} from 'react';

import articleController from './../controllers/articleController';
import articleModel from '../../models/articleModel';
import articleService from '../../services/articleService';

class ArticleCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {username: null};
    }

    render = () => {
        return (
            <div class="content">
            <div class="row justify-content-center">
            <div class="col-6 text-center">
            <div class="form-group">
                <form id="articleCreateForm" onSubmit={this.props.handleSubmit}>
                    <h2>Create Article</h2>
                    {this.props.error}
                    <div class="form-group">
                    <label>Title:</label>
                    <input class="form-control"
                           name="title"
                           onChange={this.props.handleChange}
                           type="text"
                           value={this.props.title}/>
                    </div>
                    <hr></hr>
                    <div class="form-group">
                    <label>Image URL:</label>
                    <input class="form-control"
                           name="imageUrl"
                           onChange={this.props.handleChange}
                           type="text"
                           value={this.props.imageUrl} required/>
                    </div>
                    <hr></hr>
                    <div class="form-group">
                    <label>Description:</label>
                    <input class="form-control"
                           name="description"
                           onChange={this.props.handleChange}
                           type="text"
                           value={this.props.description}/>
                    </div>
                    <hr></hr>
                    <div class="form-group">
                        <label>Category</label>
                        <select name="category"
                                class="form-control"
                        onChange={this.props.handleChange}
                        type="text"
                        value={this.props.category}>                            
                            <option>Audi</option>
                            <option>VW</option>
                            <option>BMW</option>
                            <option>Mercedes</option>
                            <option>Skoda</option>
                            <option>Seat</option>
                            <option>Opel</option>
                            <option>Kia</option>
                            <option>Toyota</option>
                            <option>Honda</option>                        
                        </select>
                    </div>
                    <hr></hr>
                    <div class="form-group">
                    <label>Content:</label>
                    <textarea class="form-control"
                              name="content"
                              onChange={this.props.handleChange}
                              type="text"
                              value={this.props.content}/>
                    </div>
                    <input class="btn btn-sm btn-success" type="submit" value="Submit Article Post"/>
                </form>
            </div>
       </div>
       </div>
        </div>
        )
    }
}


export default articleController(ArticleCreate, articleModel, articleService.create);
