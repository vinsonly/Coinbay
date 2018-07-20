import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
  render() {
    return (
    	<div>
      		<h2>This is going to be a single post (item to be sold).</h2>
	      	<Link to ={"/freddy/transaction/" + this.props.match.params.id}>
		        Purchase this item
			</Link>
      	</div>
    );
  }
}

export default Item;
