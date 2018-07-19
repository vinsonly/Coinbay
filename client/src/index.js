import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Posts from './Posts';
import Item from './Item';
import Transaction from './Transaction';
import Whoops404 from './Whoops404'

import registerServiceWorker from './registerServiceWorker';
import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App}/>
		<Route path="/posts" component={Posts}/>
		<Route path="/posts/:item" component={Item}/>
		<Route path="/:user/transaction/:item" component={Transaction}/>
		<Route path="*" component={Whoops404}/>
	</Router>,
	document.getElementById('root')
);



registerServiceWorker();

