import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './postingSingle.css';
import setUpRatingArrays from '../../helpers/postings.js';


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

    this.state = {};

    this.arraySetupWrapper = this.arraySetupWrapper.bind(this);

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

  render() {

    window.state = this.state;
    if(!this.state.posting || !this.state.user || this.state.halfStarArray == null || this.state.blackStarArray == null || this.state.emptyStarArray == null ) {
      return(<div></div>);
    }

    if(this.state.posting || this.state.user) {
      return (
        <div className={this.props.root}>
          <Grid container spacing={24}>
    
            <Grid item xs={12} md={6}>
              <img id="postingPicture"src={this.state.posting.images[0]}></img>
            </Grid>
            <Grid item xs={12} md={6}>
                <div className="postingInfo">
                    <h1>{this.state.posting.postingTitle}</h1>
                    <h2>${this.state.posting.price}</h2>
                    <p>{this.state.posting.description}</p>
                    <h3>Seller: {this.state.user.username}</h3>
                    <div className="sellerRating">
                      <h3>Rating</h3>
               
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
                    <Link to={"/"+this.props.loggedInUser.username+"/transaction/" + this.props.match.params.id}>
                      <Button variant="contained" color="primary" className={this.props.button}>
                        Buy Now
                      </Button>
                    </Link>
                </div>
            </Grid>
    
          </Grid>
        </div>
      );
    }
  }
}

export default withStyles(styles)(SinglePosting);