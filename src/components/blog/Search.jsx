import React, {Component} from 'react';
import {Redirect} from 'react-router';

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {username: null}
    }
    render = () => {
        <div>    

        <form class="form-signin" id="loginForm" onSubmit={this.props.handleSubmit}>
           <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
           <input  name="username" onChange={this.props.handleChange} type="text" value={this.props.username} class="form-control" placeholder="Username" required />

           <label for="inputPassword" class="sr-only">Password</label>
           <input type="password" name="password" onChange={this.props.handleChange} value={this.props.password} class="form-control" placeholder="Password" required />
           <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>                
           </form>
       </div>
    }
}
