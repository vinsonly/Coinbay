import React, { Component } from 'react';
import { Link } from 'react-router';

class Item extends Component {
  render() {
    return (
    	<div>
      		<h2>This is going to be a single post (item to be sold).</h2>
      		<p>Item number {this.props.params.item}</p>
	      	<Link to ="/freddy/transaction/1" params={{ user: "freddy", item: "1" }}>
		        Purchase this item
			</Link>
      	</div>
    );
  }
}

export default Item;