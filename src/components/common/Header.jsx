import React, {Component} from 'react';
import observer from '../../api/observer';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {username: null};

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
        observer.subscribe(observer.events.loggedOut, this.userLoggedOut);
        observer.subscribe(observer.events.redirect, this.redirect);
    }
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    redirect = (path) => {
        const { history } = this.props;
        this.props.history.push(path);
    };

    userLoggedIn = username => {
        const { history } = this.props;
        this.setState({username});
        this.props.history.push('/blog');
    };

    userLoggedOut = () =>
        this.setState({username: null});

    render = () => {
        const loggedInSection =
            <div id="profile">
                <span id="username">Hello, {this.state.username}!</span> |
                <Link to="/logout">[logout]</Link>
            </div>;

        return (
            <header>
               
            {this.state.username ? loggedInSection : null}
        </header>
              
        )
    }
}

export default withRouter(Header);