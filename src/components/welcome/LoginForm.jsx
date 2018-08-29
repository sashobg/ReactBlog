import React, {Component} from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {Redirect} from 'react-router';

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {username: null}
    }
    render = () => {
        if (!this.state.username) {
            return (
                <div>
                    <SignIn/>
                    <SignUp/>
                </div>
            )
        } else {
            return (
                <Redirect to='/blog'/>
            )
        }
    }
}
