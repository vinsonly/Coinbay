import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Posts from './posts/Posts';
import Item from './Item';
import Transaction from './Transaction';
import Whoops404 from './Whoops404';


import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render((
	<BrowserRouter>
		<div>
			<Switch>
				<Route exact path="/" component={App}/>
				<Route path="/posts/:id" render={props => <Item {...props} /> }/>
				<Route path="/posts/" component={Posts}/>
				<Route path="/:user/transaction/:item" render={props => <Transaction {...props} /> }/>
				<Route component={Whoops404}/>
			</Switch>
		</div>
	</BrowserRouter>),
	document.getElementById('root')
);



registerServiceWorker();

