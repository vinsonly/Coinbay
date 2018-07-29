import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/navigation/Navigation';
import Search from './components/search/Search';
import CatNavigation from './components/catNavigation/catNavigation';
import Posts from './components/posts/Posts';
import Transaction from './components/transaction/Transaction';
import Whoops404 from './components/whoops404/Whoops404';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SinglePosting from './components/postingSingle';
import PostingUpload from './components/postingUpload';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

import MetaCoin from "./components/ethComponents/metacoin.js"

import Login from "./components/login/Login"
import Register from "./components/register/Register"

ReactDOM.render(
	<div>
		<Navigation/>
		<CatNavigation/>
		<Search/>
	</div>,
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
				<Route path="/metacoin/" component={MetaCoin}/>
				<Route path="/new_posting/" component={PostingUpload}/>
				<Route path="/login" component={Login}/>
				<Route path="/register" component={Register}/>
				<Route path="/posts/search_results" render={props => <Posts {...props} />} />
				<Route component={Whoops404}/>
			</Switch>
		</div>
	</BrowserRouter>),
	document.getElementById('body-content')
);

registerServiceWorker();
