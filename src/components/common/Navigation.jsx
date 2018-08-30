import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { NavBar, Nav, NavItem} from 'react-bootstrap';
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
            <NavItem class= "nav-item nav-link" componentClass={Link} href="/myArticles" to="/myArticles">My Articles</NavItem> 
            <NavItem class= "nav-item nav-link" componentClass={Link} href="/Article/Create" to="/Article/Create" >Create Article</NavItem>
            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <NavItem class= "dropdown-item" componentClass={Link} href="/Category/Audi" to="/Category/Audi">Audi</NavItem> 
        <NavItem class= "dropdown-item" componentClass={Link} href="/Category/VW" to="/Category/VW">VW</NavItem> 
        <NavItem class= "dropdown-item" componentClass={Link} href="/Category/BMW" to="/Category/BMW">BMW</NavItem> 
        <NavItem class= "dropdown-item" componentClass={Link} href="/Category/Mercedes" to="/Category/Mercedes">Mercedes</NavItem> 
        <NavItem class= "dropdown-item" componentClass={Link} href="/Category/Skoda" to="/Category/Skoda">Skoda</NavItem> 
        <NavItem class= "dropdown-item" componentClass={Link} href="/Category/Seat" to="/Category/Seat">Seat</NavItem> 
        <NavItem class= "dropdown-item" componentClass={Link} href="/Category/Opel" to="/Category/Opel">Opel</NavItem> 
        <NavItem class= "dropdown-item" componentClass={Link} href="/Category/Kia" to="/Category/Kia">Kia</NavItem>
        <NavItem class= "dropdown-item" componentClass={Link} href="/Category/Toyota" to="/Category/Toyota">Toyota</NavItem> 
        <NavItem class= "dropdown-item" componentClass={Link} href="/Category/Honda" to="/Category/Honda">Honda</NavItem> 

        </div>
      </li>
            </ul>
            
        const loggedOutSection =
             <NavItem  class= "nav-item nav-link" componentClass={Link} href="/" to="/" >Sign in/Sign up</NavItem>
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand">Car Blog</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
      <NavItem class= "nav-item nav-link" componentClass={Link} href="/blog" to="/blog">Home</NavItem>
      </li>
     
      {!this.state.username ? loggedOutSection : null}
      {this.state.username ? loggedInSection : null}
    </ul>
  </div>
</nav>
            
        )
    }
}