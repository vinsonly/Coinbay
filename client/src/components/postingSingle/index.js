import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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

  }

  async arraySetupWrapper() {
    let result = await setUpRatingArrays(this.state.user.rating);
    console.log(result);
    this.setState(result);
  }

  offered() {
    console.log("offered");
    let buyer = this.props.loggedInUser;
    let seller = this.state.user;

    console.log("buyer", buyer);
    console.log("seller", seller);

    if(buyer.id == seller.id) {
      swal('You may not buy your own postings');
      return;
    }

    if(!this.props.loggedInUser) {
      swal('Please log in to place offers on items');
    }

    if(this.props.loggedInUser.crypto.length < 10) {
      swal('Please update your profile with a valid Ethereum Address to start placing offers.');
    }

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      let ethPrice;

      if(this.state.ethusd) {
        ethPrice = parseInt(this.state.posting.price)/this.state.ethusd;
      } else {
        ethPrice = parseInt(this.state.posting.price)/420;
      }

      console.log(ethPrice);

      // Instantiate contract once web3 provided.
      this.instantiateContract(ethPrice)
    })
    .catch(() => {
      console.log('Error finding web3.');
    })

    // create a contract 

    // var bidButton = document.getElementsByClassName('bid-button');
    // // need condition to check (upon revisit) to see if already bidded
    // bidButton[0].style.color = "black";
    // bidButton[0].style.backgroundColor = "grey";
    // bidButton[0].style.cursor = "default";   

    
    // this.setState(
    //     (prevState,props)=>{
    //       return {buttonText: "Deposit Submitted"};
    //     }
    // );
  }

  instantiateContract(amount) {
    console.log("instantiating contract with amount:", amount);

    if(!this.state.web3.currentProvider) {
      swal('We ran into an connecting to the Ethereum Blockchain, please try again later.'); 
      return; 
    }

    escrow.setProvider(this.state.web3.currentProvider)

    var escrowInstance;

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

        if(accounts[0].toLowerCase() != buyerAddress.toLowerCase()) {
          swal("Please set up Metamask with the same address as the one registered to your account");
          return;
        }

        swal('Please follow the instructions on Metamask to create the contract and deposit into the newly created smart contract');
        escrow.new(lowerCaseBuyer, lowerCaseSeller,{
          from: accounts[0]
        }).then(instance => {
          swal('Smart contract successfully created');
          console.log('instance', instance);
          window.instance = instance;
        })

      }
    })
    
  }

  render() {

    window.state = this.state;
    if(!this.state.posting || !this.state.user || this.state.halfStarArray == null || this.state.blackStarArray == null || this.state.emptyStarArray == null ) {
      return(<div></div>);
    }

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
                    <h2>${this.state.posting.price}</h2>
                    <p>{this.state.posting.description}</p>
                    <br/>
                    <h2>Seller: {this.state.user.username}</h2>
                    <h4>E-mail: {this.state.user.email}</h4>
                    <h4>Phone: {this.state.user.phone}</h4>
                    <h4>Ethereum Address: {this.state.user.crypto}</h4>
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
                    <br/>
                    <Button onClick={ () => this.offered() } variant="contained" color="primary" className="bid-button">
                      {this.state.buttonText}
                    </Button>
                </div>
            </Grid>
          </Grid>
          <div className="post-map">
            <SimpleMap lat={49.282482} lng={-123.118275} />
          </div>
        </div>
      );
    }
  }
}

export default withStyles(styles)(SinglePosting);