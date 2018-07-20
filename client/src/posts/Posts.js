import React, { Component } from 'react';
import SimpleMediaCard from '../SimpleMediaCard';
import './posts.css';

class Posts extends Component {
  render() {
    return (
    	<div>
			<h2>This is going to be our page with all the posts.</h2>
			<div className="container">
		      <div className="items">
		      	<SimpleMediaCard post={1}/>
		      </div>
		      <div className="items">
		      	<SimpleMediaCard post={2}/>
		      </div>
		      <div className="items">
		      	<SimpleMediaCard post={3}/>
		      </div>
		      <div className="items">
		      	<SimpleMediaCard post={4}/>
		      </div>
		      <div className="items">
		      	<SimpleMediaCard post={5}/>
		      </div>
		      <div className="items">
		      	<SimpleMediaCard post={6}/>
		      </div>
		    </div>
	    </div>
    );
  }
}

export default Posts;