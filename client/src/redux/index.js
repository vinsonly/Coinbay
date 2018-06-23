// import C from './constants'
// import initialState from './initialState.json'
// import appReducer from 'store/reducers'
// import { createStore } from 'redux'

// const store = createStore(appReducer, initialState)

// store.dispatch({
// 	type: C.ADD_BID,
// 	payload: 20
// })


import storeFactory from 'store'
import { bid } from 'actions'

const store = storeFactory()

store.dispatch (
	bid(10)
)
