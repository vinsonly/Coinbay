import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'mdbreact/dist/css/mdb.css'
import './catNavigation.css'


class CatNavigation extends Component {
	componentDidMount() {
		// click on left most category to observe effect
		document.getElementById('expand').addEventListener("click", function() {
			document.querySelector("#tabs").classList.toggle('expand');
		});
	}
    render() {
    	var categories = {  0: "Automotives",
                    1: "Beauty",
                    2: "Pets",
                    3: "Electronics",
                    4: "Books",
                    5: "Clothing",
                    6: "Jewelry",
                    7: "Art",
                    8: "Health",
                    9: "Gardening",
                    10: "Office",
                    11: "Music",
                    12: "Home",
                    13: "Outdoors",
                    14: "Toys",
                    15: "Tools",                    
                    16: "Antiques",
                    17: "miscellaneous"
                };
        var rows = [];

		for (var i = 0; i < Object.keys(categories).length; i++) {
		    rows.push(<Link to="/posts/1"><button>{categories[i]}</button></Link>);
		}

        return (
        	<div>
				<Navbar color="blue lighten-5" light id="no-padding">
				    <NavbarBrand tag="span" id="tabs">
				    {rows}
				    </NavbarBrand>
				</Navbar>
				<p id="expand">Press me</p>
			</div>
		)
	}
}

export default CatNavigation;
