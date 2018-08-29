import React, {Component} from 'react';

import formController from './../controllers/formController';
import userModel from '../../models/userModel'
import userService from '../../services/userService'

class SignIn extends Component {
    render = () => {
        return (
            <div className="form-group">
            <form id="loginForm" onSubmit={this.props.handleSubmit}>
                <h2>Sign In</h2>
                {this.props.error}
                <label>Username:</label>
                <input name="username" onChange={this.props.handleChange} type="text" value={this.props.username} />
                <label>Password:</label>
                <input name="password" onChange={this.props.handleChange} type="password" value={this.props.password} />
                <input id="btnLogin" type="submit" value="Sign In" />
            </form>
            </div>
        )
    }
}

export default formController(SignIn, userModel, userService.login);