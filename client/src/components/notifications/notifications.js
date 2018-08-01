import React, { Component } from 'react';
import './notifications.css';
import Notification from '../notification/notification';
 
class Notifications extends React.Component {
  render() {

    return (
	    <div>
	    	<Notification bidder={"Bob"}/>
	    	<br/>
			<Notification bidder={"Fred"}/>
			<br/>
			<Notification bidder={"Eric"}/>
			<br/>
			<Notification bidder={"Cali"}/>
			<br/>
			<Notification bidder={"Fornia"}/>
			<br/>
			<Notification bidder={"Rob"}/>
		</div>
    )
  }
}

export default Notifications;
