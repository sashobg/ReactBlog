import React, {Component} from 'react';

import formController from './../controllers/formController';
import userModel from '../../models/userModel'
import userService from '../../services/userService'

class RegisterForm extends Component {
    render = () => {
        return (
            <div className="form-group">
            <form id="registerForm" onSubmit={this.props.handleSubmit}>
                <h2>Sign Up</h2>
                <label>Username:</label>
                <input name="username"
                       type="text"
                       onChange={this.props.handleChange}
                       value={this.props.username}/>
                <label>Password:</label>
                <input name="password"
                       type="password"
                       onChange={this.props.handleChange}
                       value={this.props.password}/>
                <input id="btnRegister"
                       type="submit"
                       value="Sign Up"/>
            </form>
            </div>
        )
    }
}

export default formController(RegisterForm, userModel, userService.register);