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

import Login from "./components/login/Login"
import Register from "./components/register/Register"

import App from './components/app';

// let baseUrl = "https://coinbay.vinsonly.me";
let baseUrl = "https://hqk24xu3jg.execute-api.us-east-1.amazonaws.com/dev";

var env = process.env.NODE_ENV || 'development';

if (env == 'development') {
    baseUrl = "http://localhost:5000";
}

if (process.env.REACT_APP_CUSTOM_NODE_ENV && process.env.REACT_APP_CUSTOM_NODE_ENV == 'production') {
	baseUrl = "https://hqk24xu3jg.execute-api.us-east-1.amazonaws.com/dev";
}

console.log("baseUrl: ", baseUrl);

// ReactDOM.render(
// 	<div>
// 		<Navigation/>
// 		<CatNavigation/>
// 		<Search/>
// 	</div>,
// 	document.getElementById('navigation')
// );

ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>),
	document.getElementById('root')
);

registerServiceWorker();

export { baseUrl };