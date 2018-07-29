import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from './navigation/Navigation';
import Search from './search/Search';
import CatNavigation from './catNavigation/catNavigation';
import Posts from './posts/Posts';
import Transaction from './transaction/Transaction';
import Whoops404 from './whoops404/Whoops404';
import SinglePosting from './postingSingle';
import PostingUpload from './postingUpload';

import MetaCoin from "./ethComponents/metacoin.js"

import Login from "./login/Login"
import Register from "./register/Register"

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reRenderFlag: false
        }
        this.path = null;
        this.pathProps = null;
        this.handleRoute = this.handleRoute.bind(this);
    }

    // routes to the specified and passes in the specified props to the component to be rendered
    handleRoute(path, props) {
        let reRenderFlag = this.state.reRenderFlag;
        console.log("handlingRoute");
        console.log("path", path);
        console.log("props", props);

        this.path = path;
        this.pathProps = props;

        this.setState({
            reRenderFlag: !reRenderFlag
        })
    }

    render() {

        if(this.props.routePath && this.props.routePath.length > 1) {
            // render the route at this path
            switch(this.props.routePath) {
                case "/":
                    return (
                        <Route exact path="/" component={Posts}/>
                    )
                    
                case "/posts":
                    return (
                        <Route path="/posts" render={(props) => ( <Posts searchResults={this.props.routeProps}/> )} />
                    )
                    
            }
        }

        return(
            <main>
                <Switch>
                    <Route exact path="/" component={Posts}/>
                    <Route path="/posts/:id" render={props => <SinglePosting {...props} /> }/>
                    <Route path="/posts/" component={Posts}/>
                    <Route path="/:user/transaction/:item" render={props => <Transaction {...props} /> }/>
                    <Route path="/metacoin/" component={MetaCoin}/>
                    <Route path="/new_posting/" component={PostingUpload}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/posts/search_results" render={props => <Posts {...props} />} />
                    <Route component={Whoops404}/>
                </Switch>
            </main>
        )
    }
}

export default Main;