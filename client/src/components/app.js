import React, { Component } from 'react';
import Main from './main';
import Navigation from './navigation/Navigation';
import Search from './search/Search'
import CatNavigation from './catNavigation/catNavigation';
import { BrowserRouter, Route, Link, Router, Redirect, withRouter } from 'react-router-dom';
import getWeb3 from '../eth/getWeb3';

class App extends Component {

    constructor(props) {
        super(props);

        this.clearState = this.clearState.bind(this);
        this.handleRouteCallback = this.handleRouteCallback.bind(this);
        this.getLoggedInUser = this.getLoggedInUser.bind(this);
        this.signOut = this.signOut.bind(this);
        this.getEthBalance1 = this.getEthBalance1.bind(this);
        this.getEthBalance2 = this.getEthBalance2.bind(this);

        this.state = {
            loggedInUser: {},
            walletBalance: -1
        }

        this.clearState();
        this.getLoggedInUser();
        this.getEthBalance1();
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
            fetch('/api/validateToken', {
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

    getEthBalance1() {
        console.log("getting eth balance");

        getWeb3
          .then(results => {
            this.setState({
              web3: results.web3
            })

            console.log("results", results);
            this.getEthBalance2(results.web3);
          })
          .catch(() => {
            console.log('Error finding web3.');
          })
    }

    getEthBalance2(web3) {
        
        console.log(web3);


        web3.eth.getAccounts((err, accounts) => {
            let account;
            if(err) {
                console.error(err);
                return;
            } else {
                console.log(accounts);
                account = accounts[0];
            
                web3.eth.getBalance(account, (err, balance) => {
                    console.log("balance", balance);
                    let etherValue = web3.fromWei(balance.toNumber(), "ether");
                    console.log('etherValue', etherValue);

                    this.setState({
                        walletBalance: convertThreeDecimals(etherValue)
                    })
                })
            }
        })
        
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

    
    render() {
        return(
            <div id="app">
                <Navigation handleRouteCallback={this.handleRouteCallback} loggedInUser={this.state.loggedInUser} signOut={this.signOut} walletBalance={this.state.walletBalance}/>
                <CatNavigation />
                <Main routePath={this.state.routePath} routeProps={this.state.routeProps} clearRouteState={this.clearState} loggedInUser={this.state.loggedInUser} refreshBalance={this.getEthBalance1} walletBalance={this.state.walletBalance}/>
            </div>
        )
    }
}

function convertThreeDecimals(longNumber) {
    return Math.round(longNumber*1000)/1000;
}

export default withRouter(App);