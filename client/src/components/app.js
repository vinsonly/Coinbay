import React, { Component } from 'react';

import Main from './main';
import Navigation from './navigation/Navigation';
import Search from './search/Search'
import CatNavigation from './catNavigation/catNavigation';

class App extends Component {

    constructor(props) {
        super(props);

        this.clearState = this.clearState.bind(this);
        this.handleRouteCallback = this.handleRouteCallback.bind(this);
        this.getLoggedInUser = this.getLoggedInUser.bind(this);
        this.signOut = this.signOut.bind(this);

        this.state = {
            loggedInUser: {}
        }

        this.clearState();
        this.getLoggedInUser();
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
                <Navigation handleRouteCallback={this.handleRouteCallback} loggedInUser={this.state.loggedInUser} signOut={this.signOut}/>
                <CatNavigation />
                <Main routePath={this.state.routePath} routeProps={this.state.routeProps} clearRouteState={this.clearState} loggedInUser={this.state.loggedInUser}/>
            </div>
        )
    }
}

export default App;