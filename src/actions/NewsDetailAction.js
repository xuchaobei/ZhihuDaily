import fetch from 'isomorphic-fetch';
import uris from '../utils/uris';
import { isShell } from '../utils/deviceType';

export const REQUEST_NEWS = 'REQUEST_NEWS';
export const REQUEST_NEWS_SUCCESS = 'REQUEST_NEWS_SUCCESS';
export const REQUEST_MEWS_FAILURE = 'REQUEST_NEWS_FAILURE';

export const REQUEST_STYLE_SUCCESS = 'REQUEST_STYLE_SUCCESS';
export const CLEAR_DATA = 'CLEAR_DATA';

function requestNews(id) {
  return {
    type: REQUEST_NEWS,
    newsId: id
  };
}

function receiveNews(json) {
  return {
    type: REQUEST_NEWS_SUCCESS,
    content: json.body,
    title: json.title,
    image: json.image,
    image_source: json.image_source,
    style: json.css
  };
}

export function clearData() {
  return {
    type: CLEAR_DATA
  };
}

function receiveNewsStyle(text) {
  return {
    type: REQUEST_STYLE_SUCCESS,
    style_content: text
  };
}

function fetchNewsStyle(style) {
  let styleLink = style[0];
  if (!isShell) {
    styleLink = style[0].replace('http://news-at.zhihu.com', 'http://localhost:3000/zhihu');
  }


  return function (dispatch) {
    return fetch(styleLink)
      .then(response => response.text())
      .then(text =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveNewsStyle(text))
    );
  };
}


export default function fetchNews(id) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestNews(id));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(uris.newsDetail(id))
      .then(response => response.json())
      .then((json) => {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveNews(json));
        dispatch(fetchNewsStyle(json.css));
      });

      // In a real world app, you also want to
      // catch any error in the network call.
  };
}
