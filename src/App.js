import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import LoginForm from './components/welcome/LoginForm';
import BlogHome from './components/blog/BlogHome';
import Header from './components/common/Header';
import Logout from './components/user/Logout';
import Notification from './components/common/Notification';
import Navigation from './components/common/Navigation';
import MyArticles from './components/blog/MyArticles';
import AllArticles from './components/blog/AllArticles';
import ArticleDetails from './components/blog/ArticleDetails';
import ArticleEdit from './components/blog/ArticleEdit';
import ArticleForm from './components/blog/ArticleForm';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {username: null};
    }
    render() {
        return (
            <div className="App">
                <Header {...this.props}/>
                <Navigation/>
                <Notification/>
                <Switch>
                    <Route path='/' exact component={LoginForm}/>
                    <Route path='/blog' exact component={BlogHome}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/allArticles' component={AllArticles} {...this.props}/>
                    <Route path='/MyArticles' component={MyArticles}/>
                    <Route path='/Article/Create' component={ArticleForm}/>
                    <Route path='/Article/Details/:id' component={ArticleDetails}/>
                    <Route path='/Article/Edit/:id' component={ArticleEdit}/>
                </Switch>
            </div>
        );
    }
}

export default App;