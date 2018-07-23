import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import './simpleMediaCard.css';

class SimpleMediaCard extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    console.log(props.description);
    
  }

  render() {

    window.state = this.state;

    if(!this.props.description) {
      return(<div>Loading...</div>)
    }

    
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
            </CardBody>
          </Card>
        </div>
    );
  }
}

export default SimpleMediaCard;
