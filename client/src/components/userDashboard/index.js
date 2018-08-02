import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ReactTable from "react-table";
import { BrowserRouter, Route, Link, Router, Redirect, withRouter } from 'react-router-dom';

import swal from 'sweetalert';

import './styles.css'

import UserProfile from '../userProfile';

let obj;

class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      data: [],
      redirectTo: null,
      postingsLoaded: false
    };

    this.fetchPosts = this.fetchPosts.bind(this);
    this.editPosting = this.editPosting.bind(this);
    this.deletePosting = this.deletePosting.bind(this);
    this.moreDetails = this.moreDetails.bind(this);


    console.log(props.loggedInUser);
    console.log(props);

    obj = this;
  }

  fetchPosts = async () => {
    let status;
    fetch(`/api/user/postings/${this.props.loggedInUser.id}`)
      .then(res => {
        console.log(res);
        status = res.status;
        return res.json();
      }) 
      .then(body => {
        console.log(body);
        console.log(status);
        this.setState({
          data:body,
          postingsLoaded: true
        })
      })
  }

  // get the user to confirm, then delete the posting
  deletePosting(postingId){
    console.log("deleting posting", postingId);
    console.log("this", this);
    console.log("obj", obj);

    swal(`Are you sure you want to delete posting ${postingId}?`,{
      buttons: {
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          className: "",
          closeModal: false
        },
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
          className: "",
          closeModal: true,
        }
      }
    }).then(res => {
      console.log(res);
      if(res) {
        // delete posting
        swal(`Deleting posting ${postingId} please wait...`);
        // setTimeout(() => {
        //   swal('Posting deleted...')
        // }, 2000)
        let sessionToken = localStorage.getItem('sessionToken');
        let data = {
          id: postingId
        }
        let status;

        fetch('/api/posting/delete', {
          method: 'POST',
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('sessionToken')
          }
        })
      .then((res) => {
          status = res.status;
          return res.json();
      })
      .then(body => {
          if(status != 200) {
            swal('We ran into an error, please try again later...');
          } else {
            console.log(body);
              swal(`Posting ${postingId} successfully deleted`,{
                buttons: {
                  confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: false
                  },
                  cancel: {
                    text: "Cancel",
                    value: false,
                    visible: false,
                    className: "",
                    closeModal: true,
                  }
                }
              }).then(res => {
                window.location.reload();
              })              
            }
      })
      .catch(err => {
          console.error('ERROR', err);
      })


      }
    })
  }

  // set the state to redirect to the posting edit page
  editPosting(postingId) {
    console.log("editting posting", postingId);
    console.log("this", this);
    console.log("obj", obj);
  }

  // set the state to redirect to the view offers page
  viewOffers(postingId) {
    console.log("viewing offers", postingId);
  }
  
  moreDetails(postingId) {
    console.log("moreDetails", postingId);
    this.setState({
      clickedPostingPage: true,
      redirectTo: postingId
    })  
  }

  componentDidMount(){
    if(this.props.loggedInUser.id && !this.state.postingsLoaded) {
      console.log("User is logged in and postings not updated, fetching posts");
      this.fetchPosts();
    }
  }

  componentDidUpdate() {
    if(this.props.loggedInUser.id && !this.state.postingsLoaded) {
      console.log("User is logged in and postings not updated, fetching posts");
      this.fetchPosts();
    }
  }

  render() {

    // redirects
    if(this.state.clickedPostingPage) {
      console.log("redirecting...");
      // return(
      //   <Redirect to={`/posts/${this.state.redirectTo}`}/>
      // )
      this.props.history.push(`/posts/${this.state.redirectTo}`)
    }

    if(this.state.clickedViewOffers) {
      //redirect to the view offers component for this posting
    }

    if(this.state.clickedEdit) {
      // redirect to the view offers component for this posting
    }

    const columns = [
      {
        Header: "Info",
        columns: [
          {
            Header: "Posting Title",
            accessor: "postingTitle"
          },
          {
            Header: "Created At",
            accessor: "createdAt"
          },
          {
            Header: "Updated At",
            accessor: "updatedAt"
          },  
          {
            Header: "Status",
            accessor: "status",
            width: 100
          },   
          {
            Header: 'More Details',
            accessor: 'id',
            Cell: ({value}) => (<button onClick={this.moreDetails.bind(this, value)}>Page</button>),
            width: 70
          },   
        ]
      },
      {
        Header: "Offers",
        columns: [
          {
            Header: "Offers",
            accessor: 'id',
            Cell: ({value}) => (<span>2</span>),
            width: 35 
          },
          {
            Header: "View Offers",
            accessor: 'id',
            Cell: ({value}) => (<button onClick={this.viewOffers.bind(this, value)}>View Offers</button>),
            width: 110
          }
        ],
      },
      {
        Header: "Modify",
        columns: [
          {
            Header: "Delete",
            accessor: 'id',
            Cell: ({value}) => (<button onClick={this.deletePosting.bind(this, value)}>Delete</button>),
            width: 80
          },
          {
            Header: "Edit",
            accessor: 'id',
            Cell: ({value}) => (<button onClick={this.editPosting.bind(this, value)}>Edit</button>),
            width: 50
          }
        ],
      }
    ];
    
      if( !this.props.loggedInUser ) {
        return(<div>Please log in.</div>);
      }

      if( this.props.loggedInUser ) {
        return (
          <div className="userDashboard">
            <Grid container spacing={24}>
              <Grid item xs={12} md={12} lg={8}>
                <div id="listOfPostings">
                  <h2>Your Listed Postings</h2>
                      <ReactTable
                        data={this.state.data}
                        columns={columns}
                        defaultSorted={[{ id: "updatedAt", desc: false }]}
                      />                  
                </div>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <div id="listOfPostings">
                  <h2>User Info</h2>
                  <UserProfile user={this.props.loggedInUser}/>
                </div>
              </Grid>
            </Grid>
          </div>
  
    )}
  }
}

export default withRouter(UserDashboard);