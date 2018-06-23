// import C from './contants';

export const bid = (bidPrice) =>
	({
		type: "ADD_BID",
		payload: bidPrice	
	})