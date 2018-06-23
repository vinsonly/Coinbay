import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auction from './Auction';
import Timer from './Timer';
// import TimerRedux from './TimerRedux';
import registerServiceWorker from './registerServiceWorker';



import sampleData from './initialState';
import storeFactory from './store';
import { Provider, connect } from 'react-redux';
import { bid } from './redux/actions';




const mapStateToProps = state => {
  return {
    bidPrice: 4
  }
};

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onBid(bidPrice) {
// 			dispatch(
// 				bid(bidPrice)
// 			)
// 		}
// 	}
// }

const Container = connect(mapStateToProps)(Timer);

export default Container;


ReactDOM.render(<Auction />, document.getElementById('itemsDiv'));
registerServiceWorker();
