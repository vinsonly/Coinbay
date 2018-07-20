import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import PostingSingle from './components/postingSingle';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(< PostingSingle/>, document.getElementById('root'));

registerServiceWorker();
