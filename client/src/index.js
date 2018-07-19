import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Whoops404 from './Whoops404'

import registerServiceWorker from './registerServiceWorker';
import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App}/>
		<Route path="*" component={Whoops404}/>
	</Router>,
	document.getElementById('root')
);



registerServiceWorker();