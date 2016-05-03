import {REQUEST_LIST, REQUEST_LIST_SUCCESS, REQUEST_LIST_FAILURE, SET_POSITION_OFFSET} from '../actions/MainAction'
import Immutable from 'immutable';


const initialState = {
	fetching : false,
	news : [],
	date : null,
	positionOffset : 0
};

function mainReducer(state = Immutable.fromJS(initialState), action){
	switch (action.type) {

	case REQUEST_LIST:
		return state.merge({fetching: true});
	/*	return Object.assign({}, state, {
	        fetching: true
	    })*/

	case REQUEST_LIST_SUCCESS:
		return state.merge({
			fetching: false,
			news: state.get('news').push(action.news),
			date: action.date
		});
        //return Object.assign({}, state, {
	    //    fetching: false,
	    //    news: state.news.concat(action.news),
	    //    date: action.date
	    //})

 	case REQUEST_LIST_FAILURE:
		return state.merge({fetching: false});
		/*return Object.assign({}, state, {
	        fetching: false

	    })*/
	case SET_POSITION_OFFSET:
		return state.merge({positionOffset: action.positionOffset});
	default:
		return state

	}


}


export default mainReducer 

