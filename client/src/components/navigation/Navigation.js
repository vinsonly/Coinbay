import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import Search from '../search/Search';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdbreact/dist/css/mdb.css';
import './navigation.css';


/** Class representing a Navigation Bar component */
class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false,
            transactionsdropdownOpen: false,
            collapse2: false,
            walletBalance: -1
        };

        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.checkUserLoggedIn = this.checkUserLoggedIn.bind(this);
        this.checkUserLoggedIn();
    }
    /**
     * Keep track of navigation section being expanded via sandwich bar (state)
     */
    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    onClick2() {
        this.setState({
            collapse2: !this.state.collapse2,
        });
    }

    /**
     * Keep track of navigation section being collasped via sandwich bar (state)
     */
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggle2() {
        this.setState({
            transactionsdropdownOpen: !this.state.transactionsdropdownOpen
        });
    }
    /**
     * Navigation corresponding to a user logged in and guest
     */
    checkUserLoggedIn() {
        let sessionToken = localStorage.getItem('sessionToken');
        let data = {
            token: sessionToken
        }
        let status;
        fetch('/api/validateToken', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log(res);
            status = res.status;
            return res.json()
        })
        .then(body => {
            console.log(body);

            if(status != 200) {
                console.log('ERROR:' + body.message);
            } else {
                console.log("token is valid");
                this.setState({
                    user: body
                })
                console.log(this.state);
            }
        })
    }
    /**
     * Navigation is expanded to show google maps image if current page is the home page
     */
    homeNavigation() {
        var is_root = window.location.pathname == "/";

        if (is_root == true) {
            return(
                <div className="center-search" style={{backgroundImage: 'url(' + require('./img/splash-map-lower-mainland.png') + ')'}} >
                    <h1 id="slogan">Buy With Cryptocurrency, Sell With Certainty</h1>
                    <div className="searching">
                        <form className="form-inline md-form mt-0" id="searchForm">
                            <Search handleRouteCallback={this.props.handleRouteCallback}/>
                        </form>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="center-search-min">
                    <div className="searching-min">
                        <form className="form-inline md-form mt-0" id="searchForm">
                            <Search handleRouteCallback={this.props.handleRouteCallback}/>
                        </form>
                    </div>
                </div>
            );
        }
    }
    render() {

        let walletBalance
        if(this.props.walletBalance == -1) {
            walletBalance = "n/a"
        } else {
            walletBalance = this.props.walletBalance + " ETH"
        }

      return (
            <div className="nav-color">
                <div className="white-text">
                    <Navbar className="expand" dark expand="lg" scrolling>
                        <NavLink to="#" onClick={() => {window.location.replace('/')}}>
                            <strong>CoinBay</strong>
                            <sup> Classifieds</sup>
                        </NavLink>
                        { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                        <Collapse isOpen={ this.state.collapse } navbar>
                            <NavbarNav left>
                              {/* <NavItem tag="nav-postings">
                                  <NavLink to="/posts">Postings</NavLink>
                              </NavItem> */}
                              <NavItem id="nav-create-posting">
                                  {/*<NavLink to="/new_posting">+Create Posting</NavLink>*/}
                                  <span id="createPosting" onClick={() => {window.location.replace("/new_posting")}}>+Create Posting</span>
                              </NavItem>
                            </NavbarNav>
                            <NavbarNav right>
                                {
                                    (this.props.loggedInUser.id) ? (
                                        <NavItem>
                                            <span id="navEth">
                                                <i class="material-icons">
                                                    account_balance_wallet
                                                </i>
                                                {walletBalance}
                                            </span>
                                        </NavItem>
                                    ) : (<div></div>)
                                }

                                {
                                    (this.props.loggedInUser.id) ? (<NavItem>
                                        {/* {this.notifier()} */}
                                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle nav caret><span><i id="buddy" class="material-icons">
                                            person
                                            </i>{this.props.loggedInUser.username}</span></DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem><NavLink to="/manage_transactions">Manage Transactions</NavLink></DropdownItem>
                                            <DropdownItem><NavLink to="/transaction_history">Transaction History</NavLink></DropdownItem>
                                            <DropdownItem><NavLink to="/profile">Profile</NavLink></DropdownItem>
                                            <DropdownItem onClick={this.props.signOut}><span id="signOut">Sign Out</span></DropdownItem>
                                        </DropdownMenu>
                                        </Dropdown>
                                    </NavItem>  ) : (<div></div>)
                                }
                                {
                                    (!this.props.loggedInUser.id) ? (
                                        <NavItem>
                                            <NavLink to="/register">Register</NavLink>
                                        </NavItem>
                                    ) : (<div></div>)
                                }

                                {
                                    (!this.props.loggedInUser.id) ? (
                                        <NavItem>
                                            <NavLink to="/login">Login</NavLink>
                                        </NavItem>
                                    ) : (<div></div>)
                                }
                            </NavbarNav>
                        </Collapse>
                    </Navbar>
                </div>
                {this.homeNavigation()}
            </div>
      );
    }
}

export default Navigation;
