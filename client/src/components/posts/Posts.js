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

		this.state = { 
			format: "grid",
			counter: 10 
		};

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

		window.props = props;
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

		console.log(this.props);

		console.log(this.state);
		window.state = this.state;
		var idArr;
		if (this.props.searchResults) {
			idArr = [];

			for(var index = 0; index < Object.keys(this.props.searchResults).length; index++) {
				idArr.push(this.props.searchResults[index].id);
			}

			console.log(idArr);
		}

		console.log(this.state);

		if(!this.state.postings) {
			return (<div className="grid list detailed-list">Loading</div>)
		} else {
			if(idArr != null && idArr.length > 0) {
				return (
					<div>
						<div className="format-options">
							<p className="grid" onClick={() => this.changeFormat("grid")}>grid layout&nbsp;&nbsp;&nbsp;</p>
							<p className="detailed-list" onClick={() => this.changeFormat("detailed-list")}>detailed list layout&nbsp;&nbsp;&nbsp;</p>
							<p className="list" onClick={() => this.changeFormat("list")}>list layout&nbsp;&nbsp;&nbsp;</p>
						</div>
						<div className="container">
								{this.state.postings.map(posting => {
									if (idArr.includes(posting.id)) {
										return (
											<div className={this.classFormat(this.state.format)}>
												<SimpleMediaCard format={this.state.format} post={posting.id} title={posting.postingTitle} description={posting.description} price={posting.price} username={posting.User.username} rating={posting.User.rating} date={posting.createdAt} image={posting.images[0]}/>
											</div>
										)
									}
								})}
						</div>
					</div>
				);
			} else {
				console.log("blah")
				return (
					<div>
						<div className="format-options">
							<p className="grid" onClick={() => this.changeFormat("grid")}>grid layout&nbsp;&nbsp;&nbsp;</p>
							<p className="detailed-list" onClick={() => this.changeFormat("detailed-list")}>detailed list layout&nbsp;&nbsp;&nbsp;</p>
							<p className="list" onClick={() => this.changeFormat("list")}>list layout&nbsp;&nbsp;&nbsp;</p>
						</div>
						<div className="container">
								{this.state.postings.map(posting => {
									return (
										<div className={this.classFormat(this.state.format)}>
											<SimpleMediaCard format={this.state.format} post={posting.id} title={posting.postingTitle} description={posting.description} price={posting.price} username={posting.User.username} rating={posting.User.rating} date={posting.createdAt} image={posting.images}/>
										</div>
									)
								})}
						</div>
					</div>
				);
			}
		}
	}
}

export default Posts;
