import sampleData from './initialState';
import storeFactory from './store';
import { Provider, connect } from 'react-redux';
import { bid } from './redux/actions'
// import { Timer } from './Timer';



const mapStateToProps = state => {
  return {
    bidPrice: 4
  }
};

const mapDispatchToProps = dispatch => {
	return {
		onBid(bidPrice) {
			dispatch(
				bid(bidPrice)
			)
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Timer);

export default Container;