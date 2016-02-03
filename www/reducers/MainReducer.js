import {REQUEST_LIST, REQUEST_LIST_SUCCESS, REQUEST_LIST_FAILURE} from '../actions/MainAction'


const initialState = {
	fetching : false,
	news : [],
	date : null
};

function mainReducer(state = initialState, action){
	switch (action.type) {

	case REQUEST_LIST:
		return Object.assign({}, state, {
	        fetching: true
	    })

	case REQUEST_LIST_SUCCESS:
		return Object.assign({}, state, {
	        fetching: false,
	        news: action.news,
	        date: action.date
	    })

 	case REQUEST_LIST_FAILURE:
		return Object.assign({}, state, {
	        fetching: false

	    })
	default:
		return state

	}


}


export default mainReducer 

