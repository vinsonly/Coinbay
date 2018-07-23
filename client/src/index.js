import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Navigation from './components/Navigation';
import Posts from './components/posts/Posts';
import Item from './components/Item';
import Transaction from './components/Transaction';
import Whoops404 from './components/Whoops404';


import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Post from "./components/posts/Posts.js"

import SinglePosting from "./components/postingSingle"

import Login from "./components/login"

ReactDOM.render(
	<Navigation/>,
	document.getElementById('navigation')
);


ReactDOM.render((
	<BrowserRouter>
		<div>
			<Switch>
				<Route exact path="/" component={Posts}/>
				<Route path="/posts/:id" render={props => <SinglePosting {...props} /> }/>
				<Route path="/posts/" component={Posts}/>
				<Route path="/:user/transaction/:item" render={props => <Transaction {...props} /> }/>
				<Route path="/login" component={Login}/>
				<Route component={Whoops404}/>
			</Switch>
		</div>
	</BrowserRouter>),
	document.getElementById('body-content')
);

registerServiceWorker();

