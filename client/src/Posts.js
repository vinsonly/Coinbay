import React, { Component } from 'react';
import SimpleMediaCard from './SimpleMediaCard';

class Posts extends Component {
  render() {
    return (
		<div>
	      <h2>This is going to be our page with all the posts.</h2>
	      <SimpleMediaCard post={1}/>
	      <SimpleMediaCard post={2}/>
	      <SimpleMediaCard post={3}/>
	      <SimpleMediaCard post={4}/>
	      <SimpleMediaCard post={5}/>
	    </div>
    );
  }
}

export default Posts;