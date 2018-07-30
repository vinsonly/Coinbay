import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    
      if( !this.props.loggedInUser ) {
        return(<div>Please log in.</div>);
      }

      if( this.props.loggedInUser ) {
        return (
          <div className={this.props.root}>
            <Grid container spacing={24}>
      
              <Grid item xs={12} md={6}>
                <h2>List of Postings</h2>
              </Grid>
              <Grid item xs={12} md={6}>
                <h2>User Info</h2>
              </Grid>
      
            </Grid>
          </div>
  
    )}
  }
}

export default UserDashboard;