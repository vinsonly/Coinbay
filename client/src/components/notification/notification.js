import 'react-notifications/lib/notifications.css';
import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
 
class Notification extends React.Component {
  createNotification(type, bidderId) {
    return () => {
      switch (type) {
        case 'success':
          NotificationManager.success('Bid has been accepted.', 'Accept Message');
          document.getElementById(bidderId).style.display = "none";
          break;
        case 'error':
          NotificationManager.error('Bid has been rejected.', 'Reject Message');
          document.getElementById(bidderId).style.display = "none";
          break;
      }
    };
  };
 
  render() {
    return (
    	<div id={this.props.bidder}>
        <p>Bidder: {this.props.bidder}</p>
        <p>Some information about the post that was offered a bid ...</p>
	      <div className="presence">
	        <button className='btn btn-success'
	          onClick={this.createNotification('success', this.props.bidder)}>Accept
	        </button>
		    <button className='btn btn-danger'
	          onClick={this.createNotification('error', this.props.bidder)}>Reject
	        </button> 
	       </div>
	        <NotificationContainer/>
      	</div>
    );
  }
}
 
export default Notification;