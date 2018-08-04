import React, { Component } from 'react';

import ReactTable from "react-table";
import { BrowserRouter, Route, Link, Router, Redirect, withRouter } from 'react-router-dom';
import swal from 'sweetalert';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


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
  }
  
  moreDetails(postingId) {
    console.log("moreDetails", postingId);
    this.setState({
      clickedPostingPage: true,
      redirectTo: postingId
    })  
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
        Header: "Info",
        columns: [
          {
            Header: "Posting Title",
            accessor: "postingTitle"
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
          {
            Header: "Buyer",
            accessor: 'buyer',
            width: 100
          },
          {
            Header: "Buyer Info",
            accessor: 'id',
            width: 100
          }   
        ]
      },
      {
        Header: "Transaction Information",
        columns: [
          {
            Header: "Initializing Time",
            accessor: "startTime"
          },
          {
            Header: "Transaction Time",
            accessor: "endTime"
          },
          {
            Header: "Smart Contract",
            accessor: "smartContract",
          },
          {
            Header: "Transactions",
            accessor: "transactions"
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

export default TransactionHistory;