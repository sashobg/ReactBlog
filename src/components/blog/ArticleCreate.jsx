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
            <div className="form-group">
                <form id="articleCreateForm" onSubmit={this.props.handleSubmit}>
                    <h2>Create Article</h2>
                    {this.props.error}
                    <div className="form-group">
                    <label>Title:</label>
                    <input className="form-control"
                           name="title"
                           onChange={this.props.handleChange}
                           type="text"
                           value={this.props.title}/>
                    </div>
                    <div className="form-group">
                    <label>Image URL:</label>
                    <input className="form-control"
                           name="imageUrl"
                           onChange={this.props.handleChange}
                           type="text"
                           value={this.props.imageUrl}/>
                    </div>
                    <div className="form-group">
                    <label>Description:</label>
                    <input className="form-control"
                           name="description"
                           onChange={this.props.handleChange}
                           type="text"
                           value={this.props.description}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Category</label>
                        <select name="Category"
                                className="form-control"
                        onChange={this.props.handleChange}
                        type="text"
                        value={this.props.Category}>
                             <option>...</option>
                            <option>Audi</option>
                            <option>BMW</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label>Content:</label>
                    <textarea className="form-control"
                              name="content"
                              onChange={this.props.handleChange}
                              type="text"
                              value={this.props.content}/>
                    </div>
                    <input class="btn btn-sm" type="submit" value="Submit Article Post"/>
                </form>
            </div>
        )
    }
}


export default articleController(ArticleCreate, articleModel, articleService.create);
