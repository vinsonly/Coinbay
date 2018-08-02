import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import Search from '../search/Search'
import 'bootstrap/dist/css/bootstrap.css';
import 'mdbreact/dist/css/mdb.css';
import './navigation.css';

import { Link } from 'react-router-dom';


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };

        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.checkUserLoggedIn = this.checkUserLoggedIn.bind(this);

        console.log(props);

        this.checkUserLoggedIn();

    }
    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

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

    render() {

        console.log(this.state);

        console.log(this.props.loggedInUser);

      return (
            <div className="nav-color">
                <div className="white-text">
                    <Navbar className="expand" dark expand="lg" scrolling>
                        <NavbarBrand href="/">
                            <strong>CryptoBay</strong>
                        </NavbarBrand>
                        { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                        <Collapse isOpen={ this.state.collapse } navbar>
                            <NavbarNav left>
                              <NavItem>
                                  <NavLink to="/posts">Postings</NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink to="/new_posting">Create Posting</NavLink>
                              </NavItem>
                            </NavbarNav>
                            <NavbarNav right>     
                                {
                                    (this.props.loggedInUser.id) ? (
                                        <NavItem>
                                            <NavLink to="/notifications">Notifications</NavLink>
                                        </NavItem>
                                    ) : (<div></div>)
                                }
                                {
                                    (this.props.loggedInUser.id) ? (<NavItem>
                                        {/* {this.notifier()} */}
                                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle nav caret>{this.props.loggedInUser.username}</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem><NavLink to="/profile">Profile</NavLink></DropdownItem>
                                            <DropdownItem onClick={this.props.signOut}>Sign Out</DropdownItem>
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

                <div className="center-search">
                    <div className="searching">
                        <form className="form-inline md-form mt-0" id="searchForm">
                            <Search handleRouteCallback={this.props.handleRouteCallback}/>
                        </form>
                    </div>
                </div>
            </div>
      );
    }
}

{/* <NavLink to="/sign_out">Sign Out</NavLink> */}

export default Navigation;