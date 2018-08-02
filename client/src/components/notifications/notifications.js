import React, { Component } from 'react';
import './notifications.css';
import Notification from '../notification/notification';
 
class Notifications extends React.Component {

	constructor(props) {
		super(props);

		// this.state = {
		// 	buyerPosts: [],
		// 	sellerPosts: []
		// }

		this.state = {
			fetchedBuyerPosts: false,
			fetchedSellerPosts: false
		};

		this.fetchBuyerPosts.bind(this);
		this.fetchSellerPosts.bind(this);
		//fetch from database all posts where you are the seller and all posts where you are the buyer

		let obj = this;
	}

	fetchBuyerPosts() {
		let status;
		let userId = this.props.loggedInUser.id;
		console.log("userId", userId);
		fetch(`/api/buyer_postings/${userId}`)
    .then(res => {
      status = res.status;
      return res.json();
    })
		.then(async body => {
			let pendingPosts = [];
      if(status == 200) {
				await body.map(async posting => {
					if(posting.status == "pending") {
						await pendingPosts.push(posting);
					}
				})

				return {
					buyerPendingPosts: pendingPosts
				}
      }
		})
		.then(res => {
			this.setState({
				buyerPendingPosts: res.buyerPendingPosts,
				fetchedBuyerPosts: true
			});
		})
		.catch(err => {
			console.log("ERROR!!");
			console.log(err);
		})
	}

	fetchSellerPosts() {
		let status;
		let userId = this.props.loggedInUser.id;
		console.log("userId", userId);
		fetch(`/api/user/postings/${this.props.loggedInUser.id}`)
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(async body => {
			let activePosts = [];
			let pendingPosts = [];
      if(status == 200) {
				await body.map(async posting => {
					if(posting.status == "pendingConfirmation") {
						await	activePosts.push(posting);
					} else if(posting.status == "pending") {
						await pendingPosts.push(posting);
					}
				})

				console.log(pendingPosts);

				return {
					sellerActivePosts: activePosts,
					sellerPendingPosts: pendingPosts
				}
      }
		})
		.then(res => {
			this.setState({
				sellerActivePosts: res.sellerActivePosts,
				sellerPendingPosts: res.sellerPendingPosts,
				fetchedSellerPosts: true
			});
		})
		.catch(err => {
			console.log("ERROR!!");
			console.log(err);
		})
	}

	componentDidUpdate() {
		console.log(this.props.loggedInUser);
		if(!this.state.fetchedBuyerPosts && this.props.loggedInUser.id) {
			this.fetchBuyerPosts();
		}

		if(!this.state.fetchedSellerPosts && this.props.loggedInUser.id) {
			this.fetchSellerPosts();
		}
	}

	componentDidMount() {
		console.log(this.props.loggedInUser);
		if(!this.state.fetchedBuyerPosts && this.props.loggedInUser.id) {
			this.fetchBuyerPosts();
		}

		if(!this.state.fetchedSellerPosts && this.props.loggedInUser.id) {
			this.fetchSellerPosts();
		}
	}

  render() {

		if(!this.state.fetchedBuyerPosts) {
			return(<div>Loading...</div>)
		}

		if(!this.state.fetchedSellerPosts) {
			return(<div>Loading...</div>)
		}

    return (
	    <div id="notifications">
				<div id="buyerPendingPosts" className="notificationsPost">
					<h2> Sent Offers </h2>
					{this.state.buyerPendingPosts.map(post => {
						return(
							<Notification post={post} currentUser="buyer" status="pending" loggedInUser={this.props.loggedInUser}/>
						)
					})}
				</div>

				<div id="sellerPendingPosts" className="notificationsPost">
					<h2> Pending Deals </h2>


					{this.state.sellerPendingPosts.map(post => {
						return(
							<Notification post={post} currentUser="seller" status="pending" loggedInUser={this.props.loggedInUser}/>
						)
					})}
				</div>

					<div id="sellerActivePosts" className="notificationsPost">
					<h2> Received Offers </h2>
					{this.state.sellerActivePosts.map(post => {
						return(
							<Notification post={post} currentUser="seller" status="pendingConfirmation" loggedInUser={this.props.loggedInUser}/>
						)
					})}
				</div>


		</div>
    )
  }
}

export default Notifications;
