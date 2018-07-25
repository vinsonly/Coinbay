import React, { Component } from 'react';
import SimpleMediaCard from '../simpleMediaCard/SimpleMediaCard';
import 'bootstrap/dist/css/bootstrap.css'
import 'mdbreact/dist/css/mdb.css'
import './posts.css';

class Posts extends Component {
	constructor(props) {
		super(props);

		let postingStatus;

    this.state = { format: "grid" };

    fetch(`/api/postings_with_users`)
      .then(res => {
        console.log(res);
        postingStatus = res.status;
        return res.json();
      })
      .then(body => {
        console.log(body);
        console.log("postingStatus", postingStatus);
        if(postingStatus == 200) {
          this.setState({
						postings: body
					});
          console.log(this.state);
        }
        return body;
			})
			.catch(err => {
				console.log("ERROR!!");
				console.log(err);
			})
		
	} 
	changeFormat() {
		this.setState(
			(prevState,props)=>{
			return {format: "list"};
			}
		);
	}
 	render() {
		console.log(this.state);
		window.state = this.state;

		if(!this.state.postings) {
			return (<div>Loading</div>)
		} else {
			return (
				<div>
				<p id="list" onClick={() => this.changeFormat()}>grid layout</p>
				<div className="container">
						{this.state.postings.map(posting => {
							return (
								<div className="items">
									<SimpleMediaCard format={this.state.format} post={posting.id} title={posting.postingTitle} description={posting.description} price={posting.price} username={posting.User.username} rating={posting.User.rating}/>
								</div>
							)
						})}
					</div>
				</div>
			);
		}
	}
}

export default Posts;