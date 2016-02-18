import {REQUEST_NEWS, REQUEST_NEWS_SUCCESS, REQUEST_NEWS_FAILURE, REQUEST_STYLE_SUCCESS, CLEAR_DATA} from '../actions/NewsDetailAction'


const initialState = {
	fetching : false,
	content: null,
    title: null,
    image: null,
    image_source: null,
    style:null,
    style_content:null
};

function newsDetailReducer(state = initialState, action){
	switch (action.type) {

	case REQUEST_NEWS:
		return Object.assign({}, state, {
	        fetching: true
	    })

	case REQUEST_NEWS_SUCCESS:
		return Object.assign({}, state, {
	        fetching: false,
	        content: action.content,
	        title: action.title,
	        image: action.image,
	        image_source: action.image_source,
	        style: action.style
	    })

 	case REQUEST_NEWS_FAILURE:
		return Object.assign({}, state, {
	        fetching: false

	    })
	
	case REQUEST_STYLE_SUCCESS:
		return Object.assign({}, state, {
	        style_content: action.style_content

	    })
	case CLEAR_DATA:
		return Object.assign({}, state, initialState)     
	default:
		return state

	}

}

export default newsDetailReducer

