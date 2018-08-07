import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navigation from './navigation/Navigation';
import Search from './search/Search';
import CatNavigation from './catNavigation/catNavigation';
import Posts from './posts/Posts';
import Transaction from './transaction/Transaction';
import Whoops404 from './whoops404/Whoops404';
import SinglePosting from './postingSingle';
import PostingUpload from './postingUpload';
import SignOut from './signout';
import Notifications from './notifications/notifications';
import Login from "./login/Login"
import Register from "./register/Register"
import UserDashboard from './userDashboard';
import TransactionHistory from './transactionHistory';

class Main extends Component {

    constructor(props) {
        super(props);

        this.routePath = props.routePath || "";
        this.routeProps = props.routeProps || {};
        this.oldRoutePath = this.routePath;
        this.oldRouteProps = this.routeProps;

        this.clearState = this.clearState.bind(this);
        this.isPropsDifferent = this.isPropsDifferent.bind(this);
        this.isPathDifferent = this.isPathDifferent.bind(this);
        this.clearOldState = this.clearOldState.bind(this);

        this.state = {
            reRenderFlag: false
        }

        console.log(props);

    }

    clearState() {
        this.routePath = "";
        this.routeProps = {};
    }

    clearOldState() {
      this.oldRoutePath = "";
      this.oldRouteProps = {};
    }

    isPropsDifferent() {
        console.log(this.oldRouteProps);

        let propsSame = JSON.stringify(this.oldRouteProps) == JSON.stringify(this.props.routeProps);

        if(!(propsSame)) {
            return true;
        }
    }

    isPathDifferent() {
        console.log(this.oldRoutePath);

        let pathSame = this.oldRoutePath == this.props.routePath;

        if(!(pathSame)) {
            return true;
        }
    }

    render() {

        console.log(this.props.loggedInUser);
        console.log("this.props.routePath", this.props.routePath);
        console.log("this.props.routeProps", this.props.routeProps);

        let routePropsChanged  = false;

        //check if props are different
        if(this.isPropsDifferent()) {
            console.log("props different");
            this.routeProps = this.props.routeProps,
            this.oldRouteProps = this.routeProps;
            routePropsChanged = true;
        }

        if(this.isPathDifferent()) {
            console.log("path different");
            this.routePath = this.props.routePath,
            this.oldRoutePath = this.routePath;
        }

        console.log("this.routePath", this.routePath);

        if((this.routePath && this.routePath.length > 1) || routePropsChanged) {

            console.log(this.props);
            console.log(this.routePath);

            let routePath;

            if(!this.routePath || this.routePath.length < 1) {
              routePath = this.oldRoutePath
            } else {
              routePath = this.routePath
            }

            // render the route at this path
            switch(routePath) {
                case "/posts":
                    console.log("inside posts");
                    let routeProps = this.routeProps;
                    this.clearState();
                    console.log(routeProps);
                    console.log(this.props);


                    return (
                        <Redirect
                            to={{
                                pathname: "/posts",
                                state: {
                                    searchResults: routeProps
                                }
                            }}
                        />
                    )
                    break;
            }
        }

        return(
            <main>
                <Switch>
                    <Route exact path="/" component={Posts}/>
                    <Route path="/index" render={props => <Posts {...props} reset={true}/> } />
                    <Route path="/posts/categories/:category" render={props => <Posts {...props} isCategory={true} clearRouteState={this.clearOldState}/> } />
                    <Route path="/posts/:id" render={props => <SinglePosting {...props} loggedInUser={this.props.loggedInUser} refreshBalance={this.props.refreshBalance} walletBalance={this.props.walletBalance}/> }/>
                    <Route path="/posts/search_results" component={Posts} />
                    <Route path="/posts/" component={Posts}/>
                    <Route path="/:user/transaction/:item" render={props => <Transaction {...props } /> } />
                    <Route path="/new_posting/" render={props => <PostingUpload {...props} isEdit={false} title={"Posting Upload"} />}/>
                    <Route path="/edit_posting/" render={props => <PostingUpload {...props} isEdit={true} title={"Posting Edit"} />}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/manage_transactions" render={props => <Notifications loggedInUser={this.props.loggedInUser} refreshBalance={this.props.refreshBalance}/> } />
                    <Route path="/sign_out" component={SignOut}/>
                    <Route path="/profile" render={props => <UserDashboard loggedInUser={this.props.loggedInUser} />} />
                    <Route path="/transaction_history" render={props => <TransactionHistory loggedInUser={this.props.loggedInUser}/>} />
                    <Route component={Whoops404}/>
                </Switch>
            </main>
        )
    }

    componentDidUpdate() {
      console.log("this.routePath", this.routePath);
      console.log("this.routeProps", this.routeProps);
    }
}

export default Main;
