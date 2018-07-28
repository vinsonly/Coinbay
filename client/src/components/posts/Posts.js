import React, { Component } from 'react';
import SimpleMediaCard from '../simpleMediaCard/SimpleMediaCard';
import 'bootstrap/dist/css/bootstrap.css'
import 'mdbreact/dist/css/mdb.css'
import './posts.css';

class Posts extends Component {
	constructor(props) {
		super(props);

		console.log(props);

		let postingStatus;

    this.state = { format: "grid" };

    fetch(`/api/postings_with_users`)
      .then(res => {
        // console.log(res);
        postingStatus = res.status;
        return res.json();
      })
      .then(body => {
        // console.log(body);
        // console.log("postingStatus", postingStatus);
        if(postingStatus == 200) {
          this.setState({
						postings: body
					});
          // console.log(this.state);
        }
        return body;
			})
			.catch(err => {
				console.log("ERROR!!");
				console.log(err);
			})

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

		if(this.props.searchResults) {
			var idArr = [];
			var obj = this.props.searchResults;
			var size = Object.keys(obj).length;

			for(var index = 0; index < size; index++) {
				idArr.push(obj[index].id);
			}
		}

		if(!this.state.postings) {
			return (<div class="grid list detailed-list">Loading</div>)
		} else {
			if(this.props.searchResults) {
				return (
					<div>
						<div className="format-options">
							<p class="grid" onClick={() => this.changeFormat("grid")}>grid layout&nbsp;&nbsp;&nbsp;</p>
							<p class="detailed-list" onClick={() => this.changeFormat("detailed-list")}>detailed list layout&nbsp;&nbsp;&nbsp;</p>
							<p class="list" onClick={() => this.changeFormat("list")}>list layout&nbsp;&nbsp;&nbsp;</p>
						</div>
						<div className="container">
								{this.state.postings.map(posting => {
									if (this.props.searchResults.includes(posting.id)) {
										return (
											<div className={this.classFormat(this.state.format)}>
												<SimpleMediaCard format={this.state.format} post={posting.id} title={posting.postingTitle} description={posting.description} price={posting.price} username={posting.User.username} rating={posting.User.rating} date={posting.createdAt}/>
											</div>
										)
									}
								})}
						</div>
					</div>
				);
			} else {
				return (
					<p>Pull from staging for regular post rendering; WILL get merge conflicts</p>
				);
			}
		}
	}
}

export default Posts;
