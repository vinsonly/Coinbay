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
                alert('ERROR:' + body.message);
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

        console.log(this.state.user);

      return (
            <Navbar color="grey" dark expand="lg" scrolling>
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
                       {
                            (!this.state.user) ? (
                            <div>                   
                                <NavItem>
                                    <NavLink to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/register">Register</NavLink>
                                </NavItem>
                            </div>) : (<div></div>)
                        }    

                    </NavbarNav>
                    <NavbarNav right>
                        {
                            (this.state.user) ? (<NavItem>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav caret>{this.state.user.username}</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="#">Profile</DropdownItem>
                                    <DropdownItem href="#">Sign Out</DropdownItem>
                                </DropdownMenu>
                                </Dropdown>
                            </NavItem>  ) : (<div></div>)
                        }         
                       <NavItem>
                          <form className="form-inline md-form mt-0" id="searchForm">
                            <Search handleRouteCallback={this.props.handleRouteCallback}/>
                          </form>
                       </NavItem>  
                    </NavbarNav>
                </Collapse>
            </Navbar>
      );
    }
}

export default Navigation;
