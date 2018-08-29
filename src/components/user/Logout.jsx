import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import observer from '../../api/observer';

export default class Logout extends Component {
    logout = () => {
        sessionStorage.clear();
        observer.trigger(observer.events.loggedOut);
    };

    render = () => {
        this.logout();
        return <Redirect to='/'/>;
    }
}