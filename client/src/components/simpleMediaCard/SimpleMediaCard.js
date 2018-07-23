import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import './simpleMediaCard.css';

class SimpleMediaCard extends Component {
  render() {
    return (
        <div className="resize">
          <Card>
            <CardImage className="img-fluid" src="/iphone.png" waves />
            <CardBody>
                <CardTitle>iPhone X<p className="right-text-float">$450</p></CardTitle>
                <CardText>The iPhone X is Apple's new flagship 10th anniversary iPhone featuring a 5.8-inch OLED display, facial recognition
                and 3D camera functionality, a glass body, and an A11 Bionic processor. Launched November 3, 2017.
            </CardText>
                <div className="center-button">
                  <Link to={"/posts/" + this.props.post}><Button>More Details</Button></Link>
                </div>
            </CardBody>
          </Card>
        </div>
    );
  }
}

export default SimpleMediaCard;
