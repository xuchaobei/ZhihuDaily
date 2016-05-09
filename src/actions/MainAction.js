import fetch from 'isomorphic-fetch'
import uris from '../utils/uris'

export const REQUEST_LIST = 'REQUEST_LIST';
export const REQUEST_LIST_SUCCESS = 'REQUEST_LIST_SUCCESS';
export const REQUEST_LIST_FAILURE = 'REQUEST_LIST_FAILURE';
export const SET_POSITION_OFFSET = 'SET_POSITION_OFFSET';
export const REQUEST_LATEST_NEWS_SUCCESS = 'REQUEST_LATEST_NEWS_SUCCESS';


function requestList() {
  return {
    type: REQUEST_LIST
  }
}

function receiveList( json) {
  return {
    type: REQUEST_LIST_SUCCESS,
    news: json
  }
}

function receiveLatestNews( json) {
  return {
    type: REQUEST_LATEST_NEWS_SUCCESS,
    news: json
  }
}

export function setPositionOffset(offset){
  return {
    type: SET_POSITION_OFFSET,
    positionOffset: offset
  }
}

export default function fetchNewsList(date) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

   
    var request = new Request(uris.newsList(date));  


    dispatch(requestList());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(request)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveList(json))
      );

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}

export function fetchLatestNews() {

  return function (dispatch) {

    var request = new Request(uris.latestNews());

    dispatch(requestList());

    return fetch(request)
      .then(response => response.json())
      .then(json =>

        dispatch(receiveLatestNews(json))
      );

  }
}