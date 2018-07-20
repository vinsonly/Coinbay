import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Item from './Item';

class Posts extends Component {
  render() {
    return (
		<div>
	      <h2>This is going to be our page with all the posts.</h2>
			<Link to="/posts/1">Item</Link>
	    </div>
    );
  }
}

export default Posts;