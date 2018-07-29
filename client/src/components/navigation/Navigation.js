import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
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
    render() {

      return (
            <Navbar color="grey" dark expand="md" scrolling>
                <NavbarBrand href="/">
                    <strong>CryptoBay</strong>
                </NavbarBrand>
                { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                <Collapse isOpen={ this.state.collapse } navbar>
                    <NavbarNav left>
                      <NavItem active>
                          <NavLink to="/posts">Postings</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink to="/new_posting">Create Posting</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink to="#">Profile</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink to="/login">Login</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink to="/register">Register</NavLink>
                      </NavItem>
                    </NavbarNav>
                    <NavbarNav right>
                      <NavItem>
                          <form className="form-inline md-form mt-0">
                          <input className="form-control mr-sm-2 mb-0 text-white" type="text" placeholder="Search" aria-label="Search"/>
                          </form>
                      </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
      );
    }
}

export default Navigation;
