import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Item from './Item';

class Transaction extends Component {
  render() {
    return (
		<div>
			<p>{this.props.match.params.user} purchasing item {this.props.match.params.item}</p>
	    </div>
    );
  }
}

export default Transaction;