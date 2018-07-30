import React, { Component } from 'react';
import { Route, Switch, Redirect     } from 'react-router-dom';

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
        
        this.routePath = props.routePath || "";
        this.routeProps = props.routeProps || {};
        this.oldRoutePath = this.routePath;
        this.oldRouteProps = this.routeProps;

        this.clearState = this.clearState.bind(this);
        this.isPropsDifferent = this.isPropsDifferent.bind(this);

        this.state = {
            reRenderFlag: false
        }

        console.log(props);

    }

    clearState() {
        this.routePath = "";
        this.routeProps = {};
    }

    isPropsDifferent() {
        console.log(this.oldRoutePath);
        console.log(this.oldRouteProps);

        let pathSame = this.oldRoutePath == this.props.routePath;
        let propsSame = JSON.stringify(this.oldRouteProps) == JSON.stringify(this.props.routeProps);

        if(!(pathSame && propsSame)) {
            console.log(true);
            return true;
        }
    }

    render() {

        //check if props are different
        if(this.isPropsDifferent()) {
            this.routePath = this.props.routePath,
            this.routeProps = this.props.routeProps

            this.oldRoutePath = this.routePath;
            this.oldRouteProps = this.routeProps;
        } 

        if(this.routePath && this.routePath.length > 1) {

            console.log(this.props);
            console.log(this.routePath);

            // render the route at this path
            switch(this.routePath) {
                case "/posts":
                    console.log("inside posts");
                    let routeProps = this.routeProps;
                    this.clearState();
                    console.log(routeProps);
                    console.log(this.props);

                    return (
                        // <Redirect to="/posts" />
                        // <Route path="/posts" children={props => <Posts searchResults={routeProps} />} />
                        <Redirect
                            to={{
                                pathname: "/posts",
                                state: { 
                                    searchResults: routeProps
                                }
                            }}
                        />
                    )
            }
        }

        return(
            <main>
                <Switch>
                    <Route exact path="/" component={Posts}/>
                    <Route path="/posts/categories/:category" render={props => <Posts {...props} /> } />
                    <Route path="/posts/:id" render={props => <SinglePosting {...props} /> }/>
                    <Route path="/posts/search_results" component={Posts} />
                    <Route path="/posts/" component={Posts}/>
                    <Route path="/:user/transaction/:item" render={props => <Transaction {...props} /> }/>
                    <Route path="/metacoin/" component={MetaCoin}/>
                    <Route path="/new_posting/" component={PostingUpload}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route component={Whoops404}/>
                </Switch>
            </main>
        )
    }
}

export default Main;