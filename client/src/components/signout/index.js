import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

class SignOut extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.signOut = this.signOut.bind(this);
    }

    signOut() {

        console.log("signing out");

        localStorage.removeItem('sessionToken');

        // call function that sets the state in app

        this.setState({
            signedOut: true
        })
    }

    componentDidMount() {
        this.signOut();
    }

    componentDidUpdate() {
        this.signOut();
    }

  render() {

    console.log(this.state);

    if(this.state.signedOut) {
        return(
            // <Redirect to="/"/>
            window.location.replace('/')
        )
    }

    return (
      <p>Signing out please wait...</p>
    );
  }
}

export default SignOut;