import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/navigation/Navigation';
import Posts from './components/posts/Posts';
import Transaction from './components/transaction/Transaction';
import Whoops404 from './components/whoops404/Whoops404';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SinglePosting from './components/postingSingle';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import MetaCoin from "./components/ethComponents/metacoin.js"

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
<<<<<<< HEAD
				<Route path="/metacoin/" component={MetaCoin}/>
=======
				<Route path="/login" component={Login}/>
>>>>>>> cwkuan/login-auth
				<Route component={Whoops404}/>
			</Switch>
		</div>
	</BrowserRouter>),
	document.getElementById('body-content')
);

registerServiceWorker();
