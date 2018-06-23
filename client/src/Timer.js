import React, { Component } from 'react';
import './index.css';


class Timer extends Component {

  componentDidMount() {
    var auctionNumber = document.getElementById("auction-"+this.props.position);
    var timeleft = (Number(this.props.position)*15)+140;

    var downloadTimer = setInterval(function(){
      timeleft--;
      auctionNumber.textContent = timeleft + ' seconds';
      if(timeleft <= 0) {
          auctionNumber.textContent = 'SOLD';
          auctionNumber.style.color = "red";
      }
    }.bind(this),1000);

    document.getElementById("auction-"+this.props.position+"button").addEventListener("click", function () {
      auctionNumber.style.color = "#ffff00";

      var setTimeout = setInterval(function() {
        auctionNumber.style.color = "#2f4f4f";
      }, 200);

      timeleft = timeleft + 10;
    }.bind(this));
  };

  render() {
    return (
        <div className="itemBlock">
          <div className="itemName">
            <h5 className="itemHeader">
              Lamborghini Aventador
            </h5>
          </div>
          <img className="itemPhoto" src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/share%20img/aventador-coupe-facebook-og.jpg"></img>
          <div className="bidInfo">
            <h6 id={"auction-"+this.props.position}></h6>
            <h6>Price</h6>
            <h6>Highest Bid User</h6>
            <p>{this.props.bidPrice}</p>
          </div>
          <button className="bidButton" id={"auction-"+this.props.position+"button"}>
            Bid Now
          </button>
        </div>
    );
  }
}

export default Timer;
