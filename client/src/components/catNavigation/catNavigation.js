import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
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
        return (
        	<div>
				<Navbar color="blue lighten-5" light id="no-padding">
				    <NavbarBrand tag="span" id="tabs">
				    	<button>Category 1</button>
				    	<button>Category 2</button>
				    	<button>Category 3</button>
				    	<button>Category 4</button>
				    	<button>Category 5</button>
				    	<button>Category 6</button>
				    	<button>Category 7</button>
				    	<button>Category 8</button>
				    	<button>Category 9</button>
				    	<button>Category 10</button>
				    	<button>Category 11</button>
				    	<button>Category 12</button>
				    	<button>Category 13</button>
				    	<button>Category 14</button>
				    	<button>Category 15</button>
				    	<button>Category 16</button>
				    	<button>Category 17</button>
				    	<button>Category 18</button>
				    	<button>Category 19</button>
				    	<button>Category 20</button>
				    </NavbarBrand>
				</Navbar>
				<p id="expand">Press me</p>
			</div>
		)
	}
}

export default CatNavigation;
