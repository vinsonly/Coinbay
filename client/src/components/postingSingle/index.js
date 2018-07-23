import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './postingSingle.css';

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
      })
  }

  render() {

    window.state = this.state;
    if(!this.state.posting || !this.state.user) {
      return(<div></div>);
    }

    if(this.state.posting || this.state.user) {
      return (
        <div className={this.props.root}>
          <Grid container spacing={24}>
    
            <Grid item xs={12} md={6}>
              <img id="postingPicture"src="https://i.kinja-img.com/gawker-media/image/upload/s--zIoxCmxH--/c_scale,f_auto,fl_progressive,q_80,w_800/e83aktlptf1pybjfkcex.jpg"></img>
            </Grid>
            <Grid item xs={12} md={6}>
                <div className="postingInfo">
                    <h1>{this.state.posting.postingTitle}</h1>
                    <h2>${this.state.posting.price}</h2>
                    <p>{this.state.posting.description}</p>
                    <h3>Seller: {this.state.user.username}</h3>
                    <div className="sellerRating">
                      <h3>Rating</h3>
                      <i className="material-icons">
                        star_rate
                      </i>
                      <i className="material-icons">
                        star_rate
                      </i>
                      <i className="material-icons">
                        star_rate
                      </i>
                      <i className="material-icons">
                        star_rate
                      </i>
                      <i className="material-icons">
                        star_rate
                      </i>
                    </div>
                    <Button variant="contained" color="primary" className={this.props.button}>
                      Buy Now
                    </Button>
                </div>
            </Grid>
    
          </Grid>
        </div>
      );
    }
  }
}

export default withStyles(styles)(SinglePosting);