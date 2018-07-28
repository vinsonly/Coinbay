import React, { Component } from 'react';
import SimpleMediaCard from '../simpleMediaCard/SimpleMediaCard';
import 'bootstrap/dist/css/bootstrap.css'
import 'mdbreact/dist/css/mdb.css'
import './posts.css';

class Posts extends Component {
	constructor(props) {
		super(props);

		let postingStatus;

    this.state = { format: "grid",
    				counter: 10 
    			};

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
	componentDidMount() {
		window.addEventListener('scroll', function() {
			if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				this.setState(
					(prevState,props)=>{
					return {counter: this.state.counter += 20};
					}
				);
			}
		}.bind(this));

		// var myDiv = document.getElementById("body-content");
		// alert(myDiv.scrollHeight);
	}
	changeFormat(form) {
		if (form == "grid" && this.state.format !== "grid") {
			this.setState(
				(prevState,props)=>{
				return {format: "grid"};
				}
			);			
		} else if (form == "list" && this.state.format !== "list") {
			this.setState(
				(prevState,props)=>{
				return {format: "list"};
				}
			);
		} else if (form == "detailed-list" && this.state.format !== "detailed-list") {
			this.setState(
				(prevState,props)=>{
				return {format: "detailed-list"};
				}
			);
		} else {
		}
	}
	classFormat(form) {
		if (this.state.format === "grid")
			return "items";
		else
			return "items-list";
	}
 	render() {
		console.log(this.state);
		window.state = this.state;

		if(!this.state.postings) {
			return (<div class="grid list detailed-list">Loading</div>)
		} else {
			return (
				<div>
					<div className="format-options">
						<p class="grid" onClick={() => this.changeFormat("grid")}>grid layout&nbsp;&nbsp;&nbsp;</p>
						<p class="detailed-list" onClick={() => this.changeFormat("detailed-list")}>detailed list layout&nbsp;&nbsp;&nbsp;</p>
						<p class="list" onClick={() => this.changeFormat("list")}>list layout&nbsp;&nbsp;&nbsp;</p>
					</div>
					<div className="container">
							{this.state.postings.slice(0, this.state.counter).map(posting => {
								return (
									<div className={this.classFormat(this.state.format)}>
										<SimpleMediaCard format={this.state.format} post={posting.id} title={posting.postingTitle} description={posting.description} price={posting.price} username={posting.User.username} rating={posting.User.rating} date={posting.createdAt} image={posting.images[0]}/>
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