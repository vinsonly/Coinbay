import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdbreact/dist/css/mdb.css';
import './catNavigation.css';

var categories = {
            0: "Automotives",
            1: "Beauty",
            2: "Pets",
            3: "Electronics",
            4: "Books",
            5: "Clothing",
            6: "Jewelry & Accessories",
            7: "Art",
            8: "Health",
            9: "Home & Garden",
            10: "Office",
            11: "Music",
            12: "Housing",
            13: "Sports & Outdoors",
            14: "Toys & Entertainment",
            15: "Tools",
            16: "Antiques",
            17: "Miscellaneous"
};


/** Class representing a categories selection component */
class CatNavigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navText: "Expand"
        };
    }
	componentDidMount() {
		document.getElementById('expand').addEventListener("click", function() {
			document.querySelector("#tabs").classList.toggle('expand');
		});

        for (var i = 0; i < Object.keys(categories).length; i++) {
            document.getElementById(categories[i]).addEventListener("click", function() {
                for (var j = 0; j < Object.keys(categories).length; j++) {
                    document.getElementById(categories[j]).style.backgroundColor = "#2bbbad";
                }

                this.style.backgroundColor = "#6EC5E9";
            });;
        }
	}
    /**
     * Keep track of navigation bar of categories selection of being expanded or collasped
     * @param {string} text - String representation of state
     */
    textChange(text) {
        if(text == "Expand") {
            this.setState(
                (prevState,props)=>{
                return {navText: "Collaspe"};
                }
            );
        }
        else {
            this.setState(
                (prevState,props)=>{
                return {navText: "Expand"};
                }
            );
        }
    }
    render() {
        var rows = [];

        // cycle through all categories and create buttons linked to react router
		for (var i = 0; i < Object.keys(categories).length; i++) {
		    rows.push(<Link onClick={this.props.resetOldState} to={"/posts/categories/"+categories[i]} key={categories[i]}><button id={categories[i]}>{categories[i]}</button></Link>);
		}
        return (
        	<div>
				<Navbar color="blue lighten-5" light id="no-padding">
				    <NavbarBrand tag="span" id="tabs">
				    {rows}
				    </NavbarBrand>
				</Navbar>
				<p id="expand" onClick={ () => this.textChange(this.state.navText) }>{this.state.navText}</p>
			</div>
		)
	}
}

export default CatNavigation;
