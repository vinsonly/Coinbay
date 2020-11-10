import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import './postingSingle.css';
import SimpleMap from '../mapsPostLocation/mapsPostLocation';
import setUpRatingArrays from '../../helpers/postings.js';
import swal from 'sweetalert';

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

    this.state = {
      buttonText: "Buy Now",
      buttonDisabled: false,
      bidButtonStyle: {},
      buttonStylesSet: false
    };

    this.arraySetupWrapper = this.arraySetupWrapper.bind(this);
    this.offered = this.offered.bind(this);
    this.setButtonStyle = this.setButtonStyle.bind(this);


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
          this.setState({
            posting: body
          })
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

  setButtonStyle() {
    console.log("setting button style");

    if(!this.state.posting || this.state.buttonStylesSet) {
      return;
    } else {

      console.log(this.state.posting);
      console.log(this.state.buttonStylesSet);
      // check post status
      let status = this.state.posting.status;

      let buttonStyle = {
        color: "black",
        backgroundColor: "grey",
        cursor: "default"
      }

      if(status != "active") {
        this.setState({
          buttonText: "Item Unavailable",
          buttonDisabled: true,
          bidButtonStyle: buttonStyle,
          buttonStylesSet: true
        })
      }
    }
  }

  /**
     *
     * @return {number} The dot's width, in pixels.
    */
  offered() {
    let buyer = this.props.loggedInUser;
    let seller = this.state.user;

    if(buyer.id == seller.id) {
      swal({
        text: 'You may not place an order for own postings',
        icon: "error",
      });
      return;
    }

    console.log("this.props.loggedInUser: ", this.props.loggedInUser)

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

    swal({
      text: "Please confirm whether you would like to purchase this item.",
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

      // TODO: add logic to purchase the item

    })
  }

  componentDidMount() {
    this.setButtonStyle();
  }

  componentDidUpdate() {
    if(this.state.buttonStylesSet) {
      return;
    }
    this.setButtonStyle();
  }

  render() {

    if(!this.state.posting || !this.state.user || this.state.halfStarArray == null || this.state.blackStarArray == null || this.state.emptyStarArray == null ) {
      return(<div></div>);
    }

    let lat, lng;
    if(this.state.posting.location && this.state.posting.location.lat && this.state.posting.location.lng) {
      lat = this.state.posting.location.lat;
      lng = this.state.posting.location.lng;
    } else {
      lat = 49.280904;
      lng = -123.122441;
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
                  <h2 className="prices">${this.state.posting.price}</h2>
                  <p>{this.state.posting.description}</p>
                  <br/>
                  <h2 className="seller-title">Seller: {this.state.user.username}</h2>
                  <div className="seller">
                    <div className="sellerRating">
                      <h4 style={{marginBottom: 0}}>Rating: 
                        {this.state.user.rating == null ? " n/a" : "" }
                      </h4>

                      {
                        this.state.user.rating != null ? (

                          <div>
                            {
                              this.state.blackStarArray.map((x, index) => {
                                return (
                                <i className="material-icons" key={index}>
                                  star
                                </i>
                                )
                              })
                            }
                            {
                              this.state.halfStarArray.map((x, index) => {
                                return (
                                  <i className="material-icons" key={index}>
                                    star_half
                                  </i>
                                )
                              })
                            }
                            {
                              this.state.emptyStarArray.map((x, index) => {
                                return (
                                  <i className="material-icons" key={index} >
                                    star_border
                                  </i>
                                )
                              })
                            }
                          </div>
                          
                        ) : (<div></div>)
                    }

                    </div>
                  </div>
                  <br/>
                  <Button onClick={ () => this.offered() } variant="contained" color="primary" className="bid-button" style={this.state.bidButtonStyle} disabled={this.state.buttonDisabled}>
                    {this.state.buttonText}
                  </Button>
                </div>
            </Grid>
          </Grid>
          <div className="post-map">
            <h5>Meeting Location</h5>
            <SimpleMap lat={lat} lng={lng} />
          </div>
        </div>
      );
    }
  }
}



export default withRouter(withStyles(styles)(SinglePosting));
