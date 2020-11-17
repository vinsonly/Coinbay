import React, { Component } from 'react';
import ReactTable from "react-table";
import { BrowserRouter, Route, Link, Router, Redirect, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import '../userDashboard/table-styles.css'
import TransactionModal from './transactionModal';
import UserModal from './userModal';
import DisputeModal from './disputeModal';
import './styles.css';
import { baseUrl} from '../../index';

class TransactionHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      transactionsLoaded: false
    }
    this.fetchTransactions = this.fetchTransactions.bind(this);
    this.moreDetails = this.moreDetails.bind(this);
  }

  fetchTransactions() {
    // get all postings that belong to the user that been fulfilled.
    // store results in the transactions
    let userId = this.props.loggedInUser.id;
    
    console.log(userId);

    let status;
    fetch(`${baseUrl}/api/user/postings/${userId}/transactionHistory`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('sessionToken')
      }
    }) 
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(postings => {
        console.log("postings", postings);
        this.setState({
          data: postings,
          transactionsLoaded: true
        })
      })
  }
  
  moreDetails(postingId) {
    console.log("moreDetails", postingId);
    this.setState({
      clickedPostingPage: true,
      redirectTo: postingId
    })  
  }

  componentDidMount(){
    if(this.props.loggedInUser.id && !this.state.transactionsLoaded) {
      console.log("User is logged in and transactions not updated, fetching posts");
      this.fetchTransactions();
    }
  }

  componentDidUpdate() {
    if(this.props.loggedInUser.id && !this.state.transactionsLoaded) {
      console.log("User is logged in and transactions not updated, fetching posts");
      this.fetchTransactions();
    }
  }

  render() {

    if(this.state.clickedPostingPage) {
      console.log("redirecting...");
      this.props.history.push(`/posts/${this.state.redirectTo}`)
    }

    if(!this.state.transactionsLoaded) {
      return (
        <div>Loading your transaction history...</div>
      )
    }

    // sold items
    const columns = [
      {
        Header: "Posting Info",
        columns: [
          {
            Header: "Posting Title",
            accessor: "postingTitle"
          },
          {
            Header: "Status",
            accessor: "status",
            Cell: ({value}) => (checkStatus(value)),
            width: 100
          },   
          {
            Header: 'More Details',
            accessor: 'id',
            Cell: ({value}) => (<button onClick={this.moreDetails.bind(this, value)}>Page</button>),
            width: 70
          },
          {
            Header: "Buyer/Seller Info",
            Cell: ({row}) => (<UserModal row={row} loggedInUser={this.props.loggedInUser}/>),
            width: 150
          }
        ]
      },
      {
        Header: "Transaction Info",
        columns: [
          {
            Header: "Time Initialized",
            accessor: "transaction.startedAt",
            Cell: ({value}) => (<p>{convertToDate(value)}</p>)
          },
          {
            Header: "Time Completed",
            accessor: "transaction.completedAt",
            Cell: ({value}) => (<p>{convertToDate(value)}</p>)
          },
          {
            Header: "Contract Address",
            accessor: "transaction.contractAddress",
          },
          {
            Header: "Transactions",
            accessor: "transaction.txids",
            Cell: ({value}) => (<TransactionModal txids={value}/>)
          } 
        ],
      },
    ];

    return (
      <div id="transactionHistory">
        <h4>Transaction History</h4>
        <Grid item xs={12}>
        <ReactTable
          data={this.state.data}
          columns={columns}
          defaultSorted={[{ id: "endTIme", desc: true }]}
        />  
        </Grid>
      </div>
    );
  }
}

export default withRouter(TransactionHistory);

function convertToDate(unixtime) {
  var date = new Date(unixtime);
  if(unixtime < 1000 || unixtime == null) {
    return "n/a";
  }
  return date.toString();
}

function checkStatus(status){
  if(status == "disputing") {
    return (
      <div>
        <p>disputing</p>
        <DisputeModal/>
      </div>
    )
  } else {
    return (
      <p>{status}</p>
    )
  }
}
