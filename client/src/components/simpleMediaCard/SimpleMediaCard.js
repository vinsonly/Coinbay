import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import './simpleMediaCard.css';

import setUpRatingArrays from '../../helpers/postings.js';

class SimpleMediaCard extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    console.log(props.description);

    this.arraySetupWrapper = this.arraySetupWrapper.bind(this);

    this.arraySetupWrapper();
  }

  async arraySetupWrapper() {
    let result = await setUpRatingArrays(this.props.rating);
    this.setState(result);
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
              <CardImage className="img-fluid" src="/iphone.png" waves />
              <CardBody>
                  <CardTitle>{this.props.title}<p className="right-text-float">${this.props.price}</p></CardTitle>
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
    } else if (this.props.format == "list") {
      return (
        <div className="resize">
          <Card>
            <CardBody>
                <CardTitle>{this.props.title}<p className="right-text-float">${this.props.price}</p></CardTitle>
                <CardText>{this.props.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    }
    else {
      return (
        <p>simple list</p>
      );
    }
  }
}

export default SimpleMediaCard;
