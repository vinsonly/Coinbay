import 'react-notifications/lib/notifications.css';
import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import swal from 'sweetalert';
 
import BasicEscrow from '../../eth/build/contracts/BasicEscrow.json';

import getWeb3 from '../../eth/getWeb3';

const contract = require('truffle-contract');
const escrow = contract(BasicEscrow);

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.confirmTransaction = this.confirmTransaction.bind(this);
    this.rejectTransaction = this.rejectTransaction.bind(this);
    this.createNotification = this.createNotification.bind(this);
    this.okTransaction = this.okTransaction.bind(this);
  }

  createNotification(type, otherUser) {

    console.log(this.props.status);
    console.log(this.props.currentUser);

    let selector = otherUser + this.props.status + this.props.currentUser

    console.log(selector);
    console.log(type);

    switch (type) {
        case 'success':
          NotificationManager.success('Transaction has been accepted.', 'Accept Message');
          document.getElementById(selector).style.display = "none";
          break;
        case 'error':
          NotificationManager.error('Transaction has been rejected.', 'Reject Message');
          document.getElementById(selector).style.display = "none";
          break;
    }
    
  };

  confirmTransaction(type, otherUser) {
    console.log("confirm transaction");
    console.log("type", type);
    console.log("bidderId", otherUser);

    if(this.props.status == "pendingConfirmation") {
      // post to database that this transaction is accepted.
      let status;
      let data = {
        id: this.props.post.id,
        accepted: true
      }

      fetch('/api/posting/acceptoffer', {
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
          alert(`Error: ${body.message}`);
        } else {
            swal("Offer accepted! Please make sure to be on time to your meeting... or else");
            this.createNotification(type, otherUser);
            console.log(body);
            setTimeout(function() {
              window.location.reload();
            }, 3000)
        }
      })
      .catch(err => {
        console.error('ERROR', err);
      })
    } else if(this.props.status == "pending") {
      // ok the transaction with metamask
        getWeb3
        .then(results => {
          this.setState({
            web3: results.web3
          })
          this.okTransaction();
        })
        .catch(() => {
          console.log('Error finding web3.');
        })
    }    
  }

  okTransaction() {
    console.log("Okaying transaction");

    if(!this.state.web3.currentProvider) {
      swal('We ran into an connecting to the Ethereum Blockchain, please try again later.'); 
      return; 
    }

    escrow.setProvider(this.state.web3.currentProvider);

    let contractAddress = this.props.post.contractAddress;
    let sellerAddress;
    let buyerAddress;

    escrow.at(contractAddress)
      .then(function(instance){
        console.log(instance);
        window.instance1 = instance;
        return instance;
      })
      .then(async instance => {
        await instance.seller().then(async seller => {
          sellerAddress = seller;
        })
        return instance;
      })
      .then(async instance => {
        await instance.buyer().then(async buyer => {
          buyerAddress = buyer;
        })
        return instance;
      })
      .then(instance => {

        // get the current user's address
        this.state.web3.eth.getAccounts((error, accounts) => {
          if(error) {
            console.log("error", error)
          } else {
            console.log("accounts", accounts);
    
            console.log("sellerAddress", sellerAddress);
            console.log("buyerAddress", buyerAddress);
    
            let lowerCaseBuyer = buyerAddress.toLowerCase()
            let lowerCaseSeller = sellerAddress.toLowerCase();

            let myAddress = this.props.loggedInUser.crypto;

            console.log("myAddress", myAddress);

            if(accounts[0].toLowerCase() != myAddress.toLowerCase()) {
              swal("Please set up Metamask with the same address as the one registered to your account");
              return;
            }

            swal('Please follow the instructions on Metamask to sign and approve of the transaction');
            instance.accept({
              from: accounts[0]
            }).then(function(result) {
              console.log('result', result);
              if(result.tx) {
                swal('You have accepted this transaction.')
              }
            })
          }
        })
      })


    
  }

  rejectTransaction(type, otherUser) {
    console.log("type", type);
    console.log("reject transaction");
    console.log("bidderId", otherUser);
    this.createNotification(type, otherUser);
  }
 
  render() {

    if(!this.props.post) {
      return(<div></div>)
    }

    let acceptMsg;
    let rejectMsg;
    let otherUser;

    // can only be pendingConfirmation or pending

    if(this.props.status == "pendingConfirmation") {
      acceptMsg = "Accept Offer"
      rejectMsg = "Reject Offer"
    } else {
      acceptMsg = "Confirm Transaction"
      rejectMsg = "Reject Transaction"
    }

    if(this.props.currentUser == "seller") {
      otherUser = this.props.post.buyerId
    } else {
      otherUser = this.props.post.userId
    }

    let postingId = this.props.post.id;

    console.log(this.props);
    return (
    	<div id={otherUser + this.props.status + this.props.currentUser}>
        {(this.props.currentUser == "seller") ? (
          <p>Buyer Id: {this.props.post.buyerId}</p>
        ) : (
          <p>Seller Id: {this.props.post.userId}</p>
        )}
        <p>Posting Id: {this.props.post.id}</p>
        <p>Posting Title: {this.props.post.postingTitle}</p>
        <a href={`/posts/${postingId}`}><p>Link to Post</p></a>
	      <div className="presence">
	        <button className='btn btn-success'
	          onClick={this.confirmTransaction.bind(this, 'success', otherUser)}>{acceptMsg}
	        </button>
		    <button className='btn btn-danger'
	          onClick={this.rejectTransaction.bind(this, 'error', otherUser)}>{rejectMsg}
	        </button> 
	       </div>
	        <NotificationContainer/>
      	</div>
    );
  }
}
 
export default Notification;