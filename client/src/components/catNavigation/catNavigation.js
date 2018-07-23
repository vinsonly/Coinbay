import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'mdbreact/dist/css/mdb.css'
import './catNavigation.css'

class CatNavigation extends Component {
    render() {
        return (
			<Navbar color="blue lighten-5" light id="no-padding">
			    <NavbarBrand tag="span" className="tabs">
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    	<button>Category 1</button>
			    </NavbarBrand>
			</Navbar>
		)
	}
}

export default CatNavigation;
