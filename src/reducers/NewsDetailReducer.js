import Immutable from 'immutable';
import { REQUEST_NEWS, REQUEST_NEWS_SUCCESS, REQUEST_NEWS_FAILURE, REQUEST_STYLE_SUCCESS, CLEAR_DATA } from '../actions/NewsDetailAction';

const initialState = {
  fetching: false,
  content: null,
  title: null,
  image: null,
  image_source: null,
  style: null,
  style_content: null
};

function newsDetailReducer(state = Immutable.fromJS(initialState), action) {
  switch (action.type) {

    case REQUEST_NEWS:
      return state.merge({ fetching: true });

    case REQUEST_NEWS_SUCCESS:
      return state.merge({
        fetching: false,
        content: action.content,
        title: action.title,
        image: action.image,
        image_source: action.image_source,
        style: action.style
      });

    case REQUEST_NEWS_FAILURE:
      return state.merge({
        fetching: false
      });
    case REQUEST_STYLE_SUCCESS:
      return state.merge({
        style_content: action.style_content
      });
    case CLEAR_DATA:
      return state.merge(initialState);
    default:
      return state;

  }
}

export default newsDetailReducer;

