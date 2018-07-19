import React, { Component } from 'react';
import { Link } from 'react-router';
import Item from './Item';

class Transaction extends Component {
  render() {
    return (
		<div>
			<p>{this.props.params.user} purchasing item {this.props.params.item}</p>
	    </div>
    );
  }
}

export default Transaction;