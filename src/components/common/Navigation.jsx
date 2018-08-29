import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import observer from "../../api/observer";

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {username: null};

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
        observer.subscribe(observer.events.loggedOut, this.userLoggedOut);
    }

    userLoggedIn = username => {
        this.setState({username});
    };

    userLoggedOut = () =>
        this.setState({username: null});


    render = () => {
        const loggedInSection =
            
            <ul class="navbar-nav">
            <li class="nav-item">
            <NavLink class="nav-link" to='/myArticles'>My Articles</NavLink>
            </li>
            <li class="nav-item">
            <NavLink class="nav-link" to='/Article/Create'>Create Article</NavLink>
            </li>
            </ul>
            
        const loggedOutSection =
          
             <li class="nav-item">
             <NavLink class="nav-link" to='/'>Sign in/Sign up</NavLink>
            </li>
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand">Blog</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
      <NavLink class="nav-link" to='/blog'>Home</NavLink>
      </li>

      {!this.state.username ? loggedOutSection : null}
      {this.state.username ? loggedInSection : null}
    </ul>
  </div>
</nav>
            
        )
    }
}