import 'react-notifications/lib/notifications.css';
import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import swal from 'sweetalert';
import BasicEscrow from '../../eth/build/contracts/BasicEscrow.json';
import getWeb3 from '../../eth/getWeb3';
import { BrowserRouter, Route, Link, Router, Redirect, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import "./notification.css";

const contract = require('truffle-contract');
const escrow = contract(BasicEscrow);


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

  async connectToWeb3() {
    await getWeb3
      .then(results => {
        console.log("results.web3", results.web3);
        this.setState({
          web3: results.web3
        })
      })
      .catch(() => {
        console.log('Error finding web3.');
        swal({
          title: "Unable to connect to the Ethereum Blockchain",
          text: "Please install the Metamask for your preferred browser at https://metamask.io/",
          icon: "error"
        })
      })
  }

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

      this.connectToWeb3()
        .then(() => {
          this.acceptOffer();
        })

      return;
      
    } else if(this.props.status == "pending") {
      // ok the transaction with metamask as well as the database
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

  acceptOffer() {
    if(!this.state.web3.currentProvider) {
      swal({
        title: "Unable to connect to the Ethereum Blockchain",
        text: "Please make sure you logged into your Ethereum account and conneced to the Ropsten TestNet on the MetaMask extension",
        icon: "error"
      })
      return; 
    }

    escrow.setProvider(this.state.web3.currentProvider);

    let contractAddress = this.props.post.transaction.contractAddress;
    let sellerAddress;
    let buyerAddress;
    let obj = this;

    console.log(contractAddress);

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

            let myAddress = this.props.loggedInUser.crypto;

            if(accounts[0].toLowerCase() != myAddress.toLowerCase()) {
              swal({
                title: "Unable to validate Metamask Ethereum Address",
                text: "Please make sure your current Metamask address is the same the address registered with Cryptobay. Make sure you are connected to the Ropsten Test Network with the correct account then try again.",
                icon: "error",
                closeOnClickOutside: false
              })
              return;
            }

            swal({
              title: "Accepting Offer",
              text: "Please confirm the MetaMask transaction with the default 'Gas Limit' and 'Gas Price' values to ensure that the transaction succeeds. Please do not navigate away from this page. Once the transaction is submitted, the transaction will be posted to the Ethereum Blockchain",
              icon: "info",
              buttons: {
                cancel: {
                  text: "Cancel",
                  value: null,
                  visible: false,
                  className: "",
                  closeModal: false,
                },
                confirm: {
                  text: "OK",
                  value: true,
                  visible: true,
                  className: "",
                  closeModal: false
                }
              },
              closeOnClickOutside: false,
            })

            instance.acceptOffer({
              from: accounts[0]
            }).then(function(result) {
              console.log('result', result);
              if(result.tx) {

                let data = {
                  id: obj.props.post.id,
                  txid: result.tx,
                  accepted: true
                }

                let status;

                // set the state to pending
                // save result.tx into the database and set status to pending on the database
                fetch('/api/posting/setoffer', {
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
                      console.log(body);
                      swal({
                        title: "Offer Accepted",
                        text: "You have accepted this offer. Please now meet up with the buyer to follow through with the deal. To receive funds, both you and the seller will be required to 'Approve' the transaction.",
                        icon: "success",
                        closeOnClickOutside: false
                      })

                      .then(() => {
                        console.log("accepted offer");
                        window.location.reload();
                      })
                      
                      // setTimeout(function() {
                      //   window.location.reload();
                      // }, 3000)
                      
                  }
                })
                .catch(err => {
                  console.error('ERROR', err);
                })

              }
            })
            .catch(err => {
              console.error("err", err);
            })
          }
        })
      })
  }

  rejectOffer() {
    if(!this.state.web3.currentProvider) {
      swal({
        title: "Unable to connect to the Ethereum Blockchain",
        text: "Please make sure you logged into your Ethereum account and conneced to the Ropsten TestNet on the MetaMask extension",
        icon: "error"
      })
      return; 
    }

    escrow.setProvider(this.state.web3.currentProvider);

    let contractAddress = this.props.post.transaction.contractAddress;
    let sellerAddress;
    let buyerAddress;
    let obj = this;

    console.log(contractAddress);

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

            let myAddress = this.props.loggedInUser.crypto;

            if(accounts[0].toLowerCase() != myAddress.toLowerCase()) {
              swal({
                title: "Unable to validate Metamask Ethereum Address",
                text: "Please make sure your current Metamask address is the same the address registered with Cryptobay. Make sure you are connected to the Ropsten Test Network with the correct account then try again.",
                icon: "error",
                closeOnClickOutside: false
              })
              return;
            }

            swal({
              title: "Rejecting Offer",
              text: "Please confirm the MetaMask transaction with the default 'Gas Limit' and 'Gas Price' values to ensure that the transaction succeeds. Please do not navigate away from this page. Once the transaction is submitted, the transaction will be posted to the Ethereum Blockchain",
              icon: "info",
              buttons: {
                cancel: {
                  text: "Cancel",
                  value: null,
                  visible: false,
                  className: "",
                  closeModal: false,
                },
                confirm: {
                  text: "OK",
                  value: true,
                  visible: true,
                  className: "",
                  closeModal: false
                }
              },
              closeOnClickOutside: false,
            })

            instance.declineOffer({
              from: accounts[0]
            }).then(function(result) {
              console.log('result', result);
              if(result.tx) {

                let data = {
                  id: obj.props.post.id,
                  txid: result.tx,
                  accepted: false
                }

                let status;

                // set the state to pending
                // save result.tx into the database and set status to pending on the database
                fetch('/api/posting/setoffer', {
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
                      console.log(body);
                      swal({
                        title: "Offer Rejected",
                        text: "You have rejected this offer. Please now meet up with the buyer to follow through with the deal. To receive funds, both you and the seller will be required to 'Approve' the transaction.",
                        icon: "success",
                        closeOnClickOutside: false
                      })

                      .then(() => {
                        console.log("rejected offer");
                        window.location.reload();
                      })
                      
                  }
                })
                .catch(err => {
                  console.error('ERROR', err);
                })

              }
            })
            .catch(err => {
              console.error("err", err);
            })
          }
        })
      })
  }

  okTransaction() {
    console.log("Okaying transaction");

    if(!this.state.web3.currentProvider) {
      swal({
        title: "Unable to connect to the Ethereum Blockchain",
        text: "Please make sure you logged into your Ethereum account and conneced to the Ropsten TestNet on the MetaMask extension",
        icon: "error"
      })
      return; 
    }

    let obj = this;

    escrow.setProvider(this.state.web3.currentProvider);

    let contractAddress = this.props.post.transaction.contractAddress;
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

            let myAddress = this.props.loggedInUser.crypto;

            console.log("myAddress", myAddress);

            if(accounts[0].toLowerCase() != myAddress.toLowerCase()) {
              swal({
                title: "Unable to validate Metamask Ethereum Address",
                text: "Please make sure your current Metamask address is the same the address registered with Cryptobay. Make sure you are connected to the Ropsten Test Network with the correct account then try again.",
                icon: "error",
                closeOnClickOutside: false
              })
              return;
            }

            swal({
              title: "Accepting Offer",
              text: "Please confirm the MetaMask transaction with the default 'Gas Limit' and 'Gas Price' values to ensure that the transaction succeeds. Please do not navigate away from this page. Once the transaction is submitted, the transaction will be posted to the Ethereum Blockchain",
              icon: "info",
              buttons: {
                cancel: {
                  text: "Cancel",
                  value: null,
                  visible: false,
                  className: "",
                  closeModal: false,
                },
                confirm: {
                  text: "OK",
                  value: true,
                  visible: true,
                  className: "",
                  closeModal: false
                }
              },
              closeOnClickOutside: false,
            })

            instance.accept({
              from: accounts[0]
            }).then(function(result) {
              console.log('result', result);
              if(result.tx) {

                let data = {
                  id: obj.props.post.id,
                  confirmed: true,
                }

                let status;
                fetch('/api/posting/set_transaction',{
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
                      console.log(body);
                      swal({
                        title: "Offer Accepted",
                        text: "You have accepted this offer. Please now meet up with the buyer to follow through with the deal. To receive funds, both you and the seller will be required to 'Approve' the transaction.",
                        icon: "success",
                        closeOnClickOutside: false
                      })

                      .then(() => {
                        console.log("accepted offer");
                        window.location.reload();
                      })
                      
                  }
                })
                swal({
                  title: "Confirmed Transaction",
                  text: "Once both users have confirmed the transaction, the Ether stored in the Escrow Smart Contract will be released to the seller.",
                  icon: "success",
                  closeOnClickOutside: false
                })
              }
            })
            .catch(err => {
              console.error("err", err);
            })
          }
        })
      })
  }

  declineTransaction() {
    console.log("Declining transaction");

    if(!this.state.web3.currentProvider) {
      swal({
        title: "Unable to connect to the Ethereum Blockchain",
        text: "Please make sure you logged into your Ethereum account and conneced to the Ropsten TestNet on the MetaMask extension",
        icon: "error"
      })
      return; 
    }

    let obj = this;

    escrow.setProvider(this.state.web3.currentProvider);

    let contractAddress = this.props.post.transaction.contractAddress;
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

            let myAddress = this.props.loggedInUser.crypto;

            console.log("myAddress", myAddress);

            if(accounts[0].toLowerCase() != myAddress.toLowerCase()) {
              swal({
                title: "Unable to validate Metamask Ethereum Address",
                text: "Please make sure your current Metamask address is the same the address registered with Cryptobay. Make sure you are connected to the Ropsten Test Network with the correct account then try again.",
                icon: "error",
                closeOnClickOutside: false
              })
              return;
            }

            swal({
              title: "Declining Offer",
              text: "Please confirm the MetaMask transaction with the default 'Gas Limit' and 'Gas Price' values to ensure that the transaction succeeds. Please do not navigate away from this page. Once the transaction is submitted, the transaction will be posted to the Ethereum Blockchain",
              icon: "info",
              buttons: {
                cancel: {
                  text: "Cancel",
                  value: null,
                  visible: false,
                  className: "",
                  closeModal: false,
                },
                confirm: {
                  text: "OK",
                  value: true,
                  visible: true,
                  className: "",
                  closeModal: false
                }
              },
              closeOnClickOutside: false,
            })

            instance.cancel({
              from: accounts[0]
            }).then(function(result) {
              console.log('result', result);
              if(result.tx) {
                let data = {
                  id: obj.props.post.id,
                  confirmed: false,
                }

                let status;
                fetch('/api/posting/set_transaction',{
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
                      console.log(body);
                      swal({
                        title: "Declined Transaction",
                        text: "You have declined this transaction. If both parties decline, the contract will be erased and all funds will be refunded to the buyer.",
                        icon: "success",
                        closeOnClickOutside: false
                      })

                      .then(() => {
                        console.log("declined offer");
                        window.location.reload();
                      })
                      
                      // setTimeout(function() {
                      //   window.location.reload();
                      // }, 3000)
                      
                  }
                })
              }
            })
            .catch(err => {
              console.error("err", err);
            })
          }
        })
      })
  }

  rejectTransaction(type, otherUser) {
    console.log("type", type);
    console.log("reject transaction");
    console.log("bidderId", otherUser);
    if(this.props.status == "pendingConfirmation") {
      // post to database that this transaction is accepted.
      let status;
      let data = {
        id: this.props.post.id,
        accepted: true
      }

      this.connectToWeb3()
        .then(() => {
          this.rejectOffer();
        })

      return;
      
    } else if(this.props.status == "pending") {
      // ok the transaction with metamask as well as the database
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
    if(this.props.post.transaction.buyerStatus == null) {
      buyerStatus = "pending"
    } else if(this.props.post.transaction.buyerStatus) {
      buyerStatus = "confirmed"
    } else {
      buyerStatus = "rejected"
    }

    let sellerStatus;
    if(this.props.post.transaction.sellerStatus == null) {
      sellerStatus = "pending"
    } else if(this.props.post.transaction.sellerStatus) {
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