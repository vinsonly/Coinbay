import React, { Component } from 'react';
import Main from './main';
import Navigation from './navigation/Navigation';
import Search from './search/Search'
import CatNavigation from './catNavigation/catNavigation';
import { BrowserRouter, Route, Link, Router, Redirect, withRouter } from 'react-router-dom';
import { baseUrl} from '../index';

class App extends Component {

    constructor(props) {
        super(props);

        this.clearState = this.clearState.bind(this);
        this.handleRouteCallback = this.handleRouteCallback.bind(this);
        this.getLoggedInUser = this.getLoggedInUser.bind(this);
        this.signOut = this.signOut.bind(this);
        this.startBalancePolling = this.startBalancePolling.bind(this);
        this.stopBalancePolling = this.stopBalancePolling.bind(this);
        this.resettedOldState = this.resettedOldState.bind(this);
        this.resetOldState = this.resetOldState.bind(this);

        this.state = {
            loggedInUser: {},
            walletBalance: -1,
            toResetOldState: false
        }

        this.clearState();
        this.getLoggedInUser();
        this.startBalancePolling();
    }

    clearState() {
        this.setState({
            routePath: "",
            routeProps: {}
        });
    }

    getLoggedInUser() {
        let sessionToken = localStorage.getItem('sessionToken');

        if(sessionToken && this.state.user == null)  {
            // fetch the user from the database
            let data = {
                token: sessionToken
            }

            let status;
            fetch(baseUrl + '/api/validateToken', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(res);
                status = res.status;
                return res.json()
            })
            .then(body => {
                console.log(body);

                if(status != 200) {
                    console.log('ERROR:' + body.message);
                } else {
                    console.log("token is valid");

                    console.log(body);

                    this.setState({
                        loggedInUser: body
                    })
                    console.log(this.state);
                }
            })
        }
    }

    signOut() {
        console.log("signing out in app.js");
        localStorage.removeItem('sessionToken');
        this.setState({
            loggedInUser: {}
        })
        this.props.history.push('/');
    }

    handleRouteCallback(routePath, routeProps) {
        console.log('handle search callback');

        console.log("routePath", routePath);
        console.log("routeProps", routeProps);

        // call the function to route
        this.setState({
            routePath: routePath,
            routeProps: routeProps
        })
    }

    startBalancePolling() {
        let obj = this;
    }

    stopBalancePolling() {
        clearInterval(this.accountInterval);
    }

    resettedOldState() {
      this.setState({
        toResetOldState: false
      })
    }

    resetOldState() {
      console.log("resetting old state");
      this.setState({
        toResetOldState: true
      })
    }

    render() {
        return(
            <div id="app">
                <Navigation handleRouteCallback={this.handleRouteCallback} loggedInUser={this.state.loggedInUser} signOut={this.signOut} walletBalance={this.state.walletBalance}/>
                <CatNavigation resetOldState={this.resetOldState}/>
                <Main routePath={this.state.routePath} routeProps={this.state.routeProps} clearRouteState={this.clearState} loggedInUser={this.state.loggedInUser} walletBalance={this.state.walletBalance} toResetOldState={this.state.toResetOldState} resettedOldState={this.resettedOldState}/>
            </div>
        )
    }
}

function convertThreeDecimals(longNumber) {
    return Math.round(longNumber*1000)/1000;
}

export default withRouter(App);
