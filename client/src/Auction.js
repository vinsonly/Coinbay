import React, { Component } from 'react';
import Timer from './Timer';
import './index.css';

class Auction extends Component {

  componentDidMount() {

  };

  auctionCount() {
    var counter = [];

    for(var index = 0; index < 6; index++)
      counter.push(<Timer position={index} key={index} />);

    return counter;
  };

  render() {

    return (
         this.auctionCount()
    );
  }
}

export default Auction;
