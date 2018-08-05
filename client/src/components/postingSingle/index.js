import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { BrowserRouter, Route, Link, Router, Redirect, withRouter } from 'react-router-dom';
import './postingSingle.css';
import SimpleMap from '../mapsPostLocation/mapsPostLocation';
import setUpRatingArrays from '../../helpers/postings.js';
import swal from 'sweetalert';
import BasicEscrow from '../../eth/build/contracts/BasicEscrow.json';

import getWeb3 from '../../eth/getWeb3';

const contract = require('truffle-contract');
const escrow = contract(BasicEscrow)


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class SinglePosting extends React.Component {

  constructor(props) {
    super(props);

    let postingId = props.match.params.id
    // get the postings from the database

    let postingStatus;
    let userStatus;

    this.state = {buttonText: "Buy Now"};

    this.arraySetupWrapper = this.arraySetupWrapper.bind(this);
    this.instantiateContract = this.instantiateContract.bind(this);
    this.offered = this.offered.bind(this);

    //get ethereum price from cmc
    fetch('https://api.coinmarketcap.com/v2/ticker/1027/')
    .then(res => {
      return res.json();
    })
    .then(body => {
      console.log(body.data.quotes.USD.price);
      this.setState({
        ethusd: body.data.quotes.USD.price
      })
      window.state = this.state;
    }) 
    .catch(err => {
      console.log(err);
    });


    fetch(`/api/posting/${postingId}`)
      .then(res => {
        console.log(res);
        postingStatus = res.status;
        return res.json();
      })
      .then(body => {
        console.log(body);
        console.log("postingStatus", postingStatus);
        if(postingStatus == 200) {
          this.state.posting = body;
          console.log(this.state);
        }
        return body;
      })
      .then((body) => {
        console.log(body);
        fetch(`/api/user/${body.userId}`)
          .then((res) => {
            userStatus = res.status;
            console.log(res);
            console.log("userStatus", userStatus);
            return res.json();
          })
          .then((body) => {
            console.log(body);
            if(userStatus == 200) {
              this.setState({
                user: body
              });
              console.log(this.state);
            }
            return body;
          })
          .then((body) => {
            this.arraySetupWrapper(this.state.user.rating);
          })
          .catch(err => {
            console.log(err);
          })
      })

      getWeb3.then(res => {
        window.web3 = res;
      })

  }

  async arraySetupWrapper() {
    let result = await setUpRatingArrays(this.state.user.rating);
    console.log(result);
    this.setState(result);
  }

  /**
     * 
     * @return {number} The dot's width, in pixels.
    */
  offered() {
    console.log("processing transaction")
    let buyer = this.props.loggedInUser;
    let seller = this.state.user;

    if(buyer.id == seller.id) {
      swal({
        text: 'You may not place an order for own postings',
        icon: "error",
      });
      return;
    }

    if(!this.props.loggedInUser.id) {
      swal({
        text: 'Please log in to place offers on items',
        icon: "info",
        buttons: {
          login: "Login Now",
          cancel: "Cancel"
        }
      }).then(res => {
        if(res == "login") {
          this.props.history.push(`/login`);
        }
      })
      return;
    }

    if(this.props.loggedInUser.crypto.length < 10) {
      swal({
        text: 'Please update your profile with a valid Ethereum Address to start placing offers.',
        icon: "info",
        buttons: {
          updateNow: "Update Now",
          cancel: "Cancel"
        }
      }).then(res => {
        if(res == "updateNow") {
          this.props.history.push(`/profile`);
        }
      })
      return;
    }

    swal({
      text: "Are you sure you would like to send an offer for this item? All gas fees for Ethereum transactions are non-refundable.",
      icon: "warning",
      closeOnClickOutside: false,
      buttons: {
        submitOffer: "Submit Offer",
        cancel: "Cancel"
      } 
    }).then(res => {
      if(res == "submitOffer") {
        return true;
      } else {
        return false
      } 
    })
    .then((res) => {
      if(!res) {
        return;
      }

      getWeb3
      .then(results => {
  
        console.log("results.web3", results.web3);
  
        this.setState({
          web3: results.web3
        })
  
        let ethPrice;
  
        if(this.state.ethusd) {
          ethPrice = parseInt(this.state.posting.price)/this.state.ethusd;
        } else {
          ethPrice = parseInt(this.state.posting.price)/420;
        }  
        // Instantiate contract once web3 provided.
        this.instantiateContract(ethPrice)
      })
      .catch(() => {
        console.log('Error finding web3.');
        swal({
          title: "Unable to connect to the Ethereum Blockchain",
          text: "Please install the Metamask for your preferred browser at https://metamask.io/",
          icon: "error"
        })
      })
    })
  }

  instantiateContract(amount) {
    console.log("instantiating contract with amount:", amount);

    if(!this.state.web3.currentProvider) {
      swal({
        title: "Unable to connect to the Ethereum Blockchain",
        text: "Please make sure you logged into your Ethereum account and conneced to the Ropsten TestNet on the MetaMask extension",
        icon: "error"
      })
      return; 
    }

    escrow.setProvider(this.state.web3.currentProvider)

    let sellerAddress = this.state.user.crypto;
    let buyerAddress = this.props.loggedInUser.crypto;

    this.state.web3.eth.getAccounts((error, accounts) => {
      if(error) {
        console.log("error", error)
      } else {
        console.log("accounts", accounts);

        console.log("sellerAddress", sellerAddress);
        console.log("buyerAddress", buyerAddress);

        let lowerCaseBuyer = buyerAddress.toLowerCase()
        let lowerCaseSeller = sellerAddress.toLowerCase();

        if(accounts.length < 1) {
          swal({
            title: "Unable to connect to the Ethereum Blockchain",
            text: "Please click on your installed Metamask browser, connect Ropsten Test Network, and unlock your Ethereum address, then try again.",
            icon: "error",
            closeOnClickOutside: false
          });
          return;
        }

        if(accounts[0].toLowerCase() != buyerAddress.toLowerCase()) {
          swal({
            title: "Unable to validate Metamask Ethereum Address",
            text: "Please make sure your current Metamask address is the same the address registered with Cryptobay. Make sure you are connected to the Ropsten Test Network with the correct account then try again.",
            icon: "error",
            closeOnClickOutside: false
          })
          return;
        }

        swal({
          title: "Processing order",
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

        let wei = this.state.web3.toWei(amount, "ether");

        escrow.new(lowerCaseSeller,{
          from: accounts[0],
          value: wei
        })
        .then(instance => {

          let contractAddress = instance.address.toLowerCase();
          let transactionId = instance.transactionHash;

          let data = {
            id: this.state.posting.id,
            status: "pendingConfirmation",
            contractAddress: contractAddress,
            txids: [transactionId]
          }

          let status;

          // post transaction to database
          fetch(`/api/posting/buy/${this.state.posting.id}`, {
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
              swal(`Error: ${body.message}`);
            } else {
                swal({
                  title: 'Successfully Submitted Offer',
                  text: "Please wait for the seller to accept your offer. Once your offer is accepted, meet the seller at the indicated meeting location at that indicated time and date. You can view the Ethereum transaction hash for the created contract in the 'Manage Transactions' page.",
                  icon: "success",
                  buttons: {
                    transactions: "View Active Transactions",
                    cancel: "Cancel"
                  } 
                }).then(res => {
                  if(res == "transactions") {
                    this.props.history.push(`/manage_transactions`);
                  } else {
                    return false
                  } 
                })
                console.log(body);

                var bidButton = document.getElementsByClassName('bid-button');
                // need condition to check (upon revisit) to see if already bidded
                bidButton[0].style.color = "black";
                bidButton[0].style.backgroundColor = "grey";
                bidButton[0].style.cursor = "default";   

                this.setState(
                  (prevState,props)=>{
                    return {buttonText: "Offer Submitted"};
                  }
                );
            }
          })
          .catch(err => {
            console.error('ERROR', err);
          })
          

        })
        .catch(err => {
          console.log(err);
        })

      }
    })
    
  }

  render() {
    
    if(!this.state.posting || !this.state.user || this.state.halfStarArray == null || this.state.blackStarArray == null || this.state.emptyStarArray == null ) {
      return(<div></div>);
    }

    // var bidButton = document.getElementsByClassName('bid-button');
    //             // need condition to check (upon revisit) to see if already bidded
    //             bidButton[0].style.color = "black";
    //             bidButton[0].style.backgroundColor = "grey";
    //             bidButton[0].style.cursor = "default";   

    //             this.setState(
    //               (prevState,props)=>{
    //                 return {buttonText: "Offer Submitted"};
    //               }
    //             );

    let bidButtonStyles = {};

    if(this.state.posting || this.state.user) {
      return (
        <div id="postingSingleDiv">
          <Grid container spacing={24}>
    
            <Grid item xs={12} md={6}>
              <div className="image-display">
                <img id="postingPicture"src={this.state.posting.images[0]}></img>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <div className="postingInfo">
                  <h1>{this.state.posting.postingTitle}</h1>
                  <br/>
                  <h2 className="prices">${this.state.posting.price}</h2>
                  <p>{this.state.posting.description}</p>
                  <br/>
                  <h2 className="seller-title">Seller: {this.state.user.username}</h2>
                  <div className="seller">
                    <h4>E-mail: {this.state.user.email}</h4>
                    <h4>Phone: {this.state.user.phone}</h4>
                    <h4 style={{wordWrap:"break-word"}}>Ethereum Address: {this.state.user.crypto}</h4>
                    <div className="sellerRating">
                      <h4 style={{marginBottom: 0}}>Rating:</h4>
               
                      {this.state.blackStarArray.map((x, index) => {
                        return (
                        <i className="material-icons" key={index}>
                          star
                        </i>
                        ) 
                      })}

                      {this.state.halfStarArray.map((x, index) => {
                        return (
                          <i className="material-icons" key={index}>
                          star_half
                          </i>
                        ) 
                      })}

                      {this.state.emptyStarArray.map((x, index) => {
                        return (
                          <i className="material-icons" key={index} >
                          star_border
                          </i>
                        ) 
                      })}

                    </div>
                  </div>
                  <br/>
                  <h5 className="metaMaskWarning"><strong>Note: You must have the <a target="_blank" href="https://metamask.io/">Metamask browser extension</a> installed to place orders and confirm orders.</strong></h5>
                  <Button onClick={ () => this.offered() } variant="contained" color="primary" className="bid-button" style={bidButtonStyles}>
                    {this.state.buttonText}
                  </Button>
                </div>
            </Grid>
          </Grid>
          <div className="post-map">
            <h5>Meeting Location</h5>
            <SimpleMap lat={49.282482} lng={-123.118275} />
          </div>
        </div>
      );
    }
  }
}



export default withRouter(withStyles(styles)(SinglePosting));