import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import swal from 'sweetalert';
import { BrowserRouter, Route, Link, Router, Redirect, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import "./notification.css";
import 'react-notifications/lib/notifications.css';
import { baseUrl} from '../../index';

let object;

/** Class representing a post notifications component */
class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.confirmTransaction = this.confirmTransaction.bind(this);
    this.rejectTransaction = this.rejectTransaction.bind(this);

    this.createNotification = this.createNotification.bind(this);
    this.connectToWeb3 = this.connectToWeb3.bind(this);

    this.okTransaction = this.okTransaction.bind(this);
    this.declineTransaction = this.declineTransaction.bind(this);

    this.acceptOffer = this.acceptOffer.bind(this);
    this.rejectOffer = this.rejectOffer.bind(this);
    object = this;
    window.notificationProps = object.props;
  }
  /**
   * Notification message for accepting and rejecting transactions
   * @param {string} type - String representation corresponding to type of notification message
   * @param {string} otherUser - String representation corresponding other user making the offer
   */
  createNotification(type, otherUser) {
    let selector = otherUser + this.props.status + this.props.currentUser

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

  /**
   * Other user making the offer is now accepted and is notified
   * @param {string} type - String representation corresponding to type of notification message
   * @param {string} otherUser - String representation corresponding other user making the bid
   */
  confirmTransaction(type, otherUser) {
    // post to database that this transaction is accepted.
    if(this.props.status == "pendingConfirmation") {
      let status;
      let data = {
        id: this.props.post.id,
        accepted: true
      }
      return;

    } else if(this.props.status == "pending") {
      
    }
  }

  acceptOffer() {
  }

  rejectOffer() {
  }
  /**
   * Confirm Transaction for Smart Contract on the Etheruem Blockchain
   */
  okTransaction() {
  }

  declineTransaction() {
  }

  rejectTransaction(type, otherUser) {
  }

  render() {
    if(!this.props.post) {
      return(<div></div>)
    }

    let acceptMsg;
    let rejectMsg;
    let otherUser;

    // can only be pendingConfirmation or pending

    let userOk = false;
    let role;

    if(this.props.loggedInUser.id == this.props.post.userId) {
      role = "seller"
      if(this.props.post.transaction.sellerOk) {
        userOk = true;
      }
    } else if(this.props.loggedInUser.id == this.props.post.buyerId) {
      role = "buyer"
      if(this.props.post.transaction.buyerOk) {
        userOk = true;
      }
    }

    let hideRejectButton = userOk && this.props.status == "pending"

    if(this.props.status == "pendingConfirmation") {
      acceptMsg = "Accept Offer"
      rejectMsg = "Reject Offer"
    } else if(hideRejectButton) {
      acceptMsg = "Accepted"
    }
    else {
      acceptMsg = "Confirm Transaction"
      rejectMsg = "Reject Transaction"
    }

    if(this.props.currentUser == "seller") {
      otherUser = this.props.post.buyerId
    } else {
      otherUser = this.props.post.userId
    }

    let postingId = this.props.post.id;

    let startedAt = convertToDate(this.props.post.transaction.startedAt);

    console.log(this.props);

    let buyerStatus;
    if(this.props.post.transaction.buyerOk == null) {
      buyerStatus = "pending"
    } else if(this.props.post.transaction.buyerOk) {
      buyerStatus = "confirmed"
    } else {
      buyerStatus = "rejected"
    }

    let sellerStatus;
    if(this.props.post.transaction.sellerOk == null) {
      sellerStatus = "pending"
    } else if(this.props.post.transaction.sellerOk) {
      sellerStatus = "confirmed"
    } else {
      sellerStatus = "rejected"
    }

    return (
    	<div id={otherUser + this.props.status + this.props.currentUser}>
        {(this.props.currentUser == "seller") ? (
          <div>
            <p><span className="notificationField">Buyer Id:</span> {this.props.post.buyerId}</p>
            <p><span className="notificationField">Buyer Username:</span> {this.props.post.Buyer.username}</p>
            <p><span className="notificationField">Buyer Status:</span> {buyerStatus}</p>
          </div>
        ) : (
          <div>
            <p><span className="notificationField">Seller Id:</span> {this.props.post.userId}</p>
            <p><span className="notificationField">Seller Username:</span> {this.props.post.User.username}</p>
            <p><span className="notificationField">Seller Status:</span> {sellerStatus}</p>
          </div>
        )}
        <p><span className="notificationField">Posting Id:</span> {this.props.post.id}</p>
        <p><span className="notificationField">Posting Title:</span> {this.props.post.postingTitle}</p>
        <p><span className="notificationField">Price:</span> ${this.props.post.price}</p>
        <p><span className="notificationField">Sent at:</span> {startedAt}</p>
        {/* <p>Meeting Time: {this.props.post.time}</p> */}
        <Button onClick={ () => this.props.history.push(`/posts/${postingId}`) } variant="contained" color="primary" className="bid-button">
            Link to Post
        </Button>

        {
          (this.props.currentUser == "buyer" && this.props.status == "pendingConfirmation") ?
            (<div/>)
              :
            (<div className="presence">

            <button className='btn btn-success'
                onClick={this.confirmTransaction.bind(this, 'success', otherUser)}
                disabled={hideRejectButton}
                >{acceptMsg}
              </button>

            {hideRejectButton ? (
              <div/>
            ) : (
              <button className='btn btn-danger'
                onClick={this.rejectTransaction.bind(this, 'error', otherUser)}>{rejectMsg}
              </button>
            )}

           </div>)
        }

        {/* <div className="notificationsDivider" /> */}
	        <NotificationContainer/>
      </div>
    );
  }
}

export default withRouter(Notification);

function convertToDate(unixtime) {
  var date = new Date(unixtime);
  return date.toString();
}
