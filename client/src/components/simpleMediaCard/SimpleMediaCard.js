import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import './simpleMediaCard.css';
import setUpRatingArrays from '../../helpers/postings.js';

class SimpleMediaCard extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {}

    console.log(props.description);

    this.arraySetupWrapper = this.arraySetupWrapper.bind(this);

    this.arraySetupWrapper();
  }

  async arraySetupWrapper() {
    let result = await setUpRatingArrays(this.props.rating);
    this.setState(result);
  }
  parseDate(date) {
    var d = new Date(Date.parse(date));
    var month = d.getMonth();
    var day = d.getDate();
    var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    return months[month] + ' ' + day; 
  }
  render() {
    window.state = this.state;

    if(!this.props.description || this.state.halfStarArray == null || this.state.blackStarArray == null || this.state.emptyStarArray == null) {
      return(<div>Loading...</div>)
    }

    if(this.props.format == "grid") {
      return (
          <div className="resize">
            <Card>
              <div className="relative-position">
                <CardImage className="img-fluid" src={this.props.image} waves />
                <p className="time-position">{this.parseDate(this.props.date)}</p>
                <p className="price-position">${this.props.price}</p>
              </div>
              <CardTitle className="title-padding">{this.props.title}</CardTitle>
              <CardBody>
                  <CardText>{this.props.description}</CardText>
                  <div className="center-button">
                    <Link to={"/posts/" + this.props.post}><Button>More Details</Button></Link>
                  </div>
                  <p className="seller-info">{this.props.username}</p>
                  <p className="seller-info">
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

                  </p>
              </CardBody>
            </Card>
          </div>
      );
    } else if (this.props.format == "detailed-list") {
      return (
        <div className="resize-detailed-list">
          <Link to={"/posts/" + this.props.post}>
            <Card>
              <CardBody>
                  <div className="img-detailed">
                    <CardImage className="img-fluid" src={this.props.image} waves />
                    <p className="time-position">{this.parseDate(this.props.date)}</p>
                  </div>
                  <div className="detailed-title">
                    <CardTitle>{this.props.title}<p className="right-text-float">${this.props.price}</p></CardTitle>
                  </div>
                  <div className="detailed-text">
                    <div className="card-text-list">
                      <CardText>{this.props.description}</CardText>
                    </div>
                  </div>
              </CardBody>
            </Card>
          </Link>
        </div>
      );
    }
    else if (this.props.format == "list") {
      return (
        <div className="resize-detailed-list">
        <Link to={"/posts/" + this.props.post}>
          <Card>
            <CardBody className="inline-display">
                <p className="inline-display">{this.parseDate(this.props.date)}</p>
                <CardTitle className="inline-display">&nbsp;&nbsp;&nbsp;{this.props.title}</CardTitle>
                <p className="inline-display right-float">${this.props.price}</p>
            </CardBody>
          </Card>
        </Link>
        </div>
      );
    } else {
    }
  }
}

export default SimpleMediaCard;
