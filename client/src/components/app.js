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

        this.clearState();
    }

    clearState() {
        this.state = {
            routePath: "",
            routeProps: {}
        }
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
                <Navigation handleRouteCallback={this.handleRouteCallback}/>
                <CatNavigation />
                <Search handleRouteCallback={this.handleRouteCallback}/>
                <Main routePath={this.state.routePath} routeProps={this.state.routeProps} clearRouteState={this.clearState}/>
            </div>
        )
    }
}

export default App;