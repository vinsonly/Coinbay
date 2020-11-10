import React, { Component } from 'react';
import './notifications.css';
import Notification from '../notification/notification';
 
class Notifications extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			fetchedBuyerPosts: false,
			fetchedSellerPosts: false
		};

		this.fetchBuyerPosts = this.fetchBuyerPosts.bind(this);
		this.fetchSellerPosts = this.fetchSellerPosts.bind(this);
		this.refreshPosts = this.refreshPosts.bind(this);
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
					console.log("body", body);
					let pendingConfPosts = [];
					let pendingPosts = [];
					console.log("status", status);
					if(status == 200) {
						const promises = body.map(async posting => {
							if(posting.status == "pendingConfirmation") {
								await pendingConfPosts.push(posting);
							} else if(posting.status == "pending") {
								await pendingPosts.push(posting);
							}
						})
						await Promise.all(promises);
						return {
							buyerPendingConfPosts: pendingConfPosts,
							buyerPendingPosts: pendingPosts
						}
					}
				})
				.then(res => {
					console.log("res", res);
					this.setState({
						buyerPendingPosts: res.buyerPendingPosts,
						buyerPendingConfPosts: res.buyerPendingConfPosts,
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
		fetch(`/api/seller_postings/${this.props.loggedInUser.id}/with_buyer`)
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
									await activePosts.push(posting);
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

	refreshPosts() {
		this.setState({
			fetchedBuyerPosts: false,
			fetchedSellerPosts: false
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

				This page can probably be removed and its functionality merged with the transactions history page, look at how ebay does it

				<div id="sentOffers" className="notificationsPost">
					<h3> Pending Sent Offers [{this.state.buyerPendingConfPosts.length}]</h3>
					{this.state.buyerPendingConfPosts.map(post => {
						return(
							<Notification post={post} currentUser="buyer" status="pendingConfirmation" loggedInUser={this.props.loggedInUser} refreshBalance={this.props.refreshBalance} refreshPosts={this.refreshPosts}/>
						)
					})}
				</div>

				<div id="pendingSales" className="notificationsPost">
					<h3> Pending Sales [{this.state.sellerPendingPosts.length}]</h3>
					{this.state.sellerPendingPosts.map(post => {
						return(
							<Notification post={post} currentUser="seller" status="pending" loggedInUser={this.props.loggedInUser} refreshBalance={this.props.refreshBalance} refreshPosts={this.refreshPosts}/>
						)
					})}
				</div>

				<div id="pendingPurchases" className="notificationsPost">
					<h3> Pending Purchases [{this.state.buyerPendingPosts.length}]</h3>
					{this.state.buyerPendingPosts.map(post => {
						return(
							<Notification post={post} currentUser="buyer" status="pending" loggedInUser={this.props.loggedInUser} refreshBalance={this.props.refreshBalance} refreshPosts={this.refreshPosts}/>
						)
					})}
				</div>

				<div id="receivedOffers" className="notificationsPost">
					<h3> Received Offers [{this.state.sellerActivePosts.length}]</h3>
					{this.state.sellerActivePosts.map(post => {
						return(
							<Notification post={post} currentUser="seller" status="pendingConfirmation" loggedInUser={this.props.loggedInUser} refreshBalance={this.props.refreshBalance} refreshPosts={this.refreshPosts}/>
						)
					})}
				</div>
		</div>
    )
  }
}

export default Notifications;
