import {REQUEST_LIST, REQUEST_LIST_SUCCESS, REQUEST_LATEST_NEWS_SUCCESS, REQUEST_LIST_FAILURE, SET_POSITION_OFFSET,
    SET_OFFSET_FROM_TODAY, SET_TITLE} from '../actions/MainAction'
import Immutable from 'immutable';


const initialState = {
  fetching: false,
  news: [],
  topNews: [],
  date: null,
  positionOffset: 0,
  offsetFromToday:0,
  title:'首页',
  titleMap:[]
};

function mainReducer(state = Immutable.fromJS(initialState), action) {
  switch (action.type) {

    case REQUEST_LIST:
      return state.merge({fetching: true});

    case REQUEST_LIST_SUCCESS:
      const length = state.get('titleMap').size;
      const preYPosition = state.get('titleMap').get(length-1).yPosition;
      const size = state.get('news').get(length-1).stories.length;
      return state.merge({
        fetching: false,
        news: state.get('news').push(action.news),
        titleMap : state.get('titleMap').push({'date':action.news.date, 'yPosition':preYPosition + (30+8) + (92+8) * (size)})
      });
    //return Object.assign({}, state, {
    //    fetching: false,
    //    news: state.news.concat(action.news),
    //    date: action.date
    //})

    case REQUEST_LATEST_NEWS_SUCCESS:
      return state.merge({
        fetching: false,
        news: state.get('news').push(action.news),
        topNews: action.news.top_stories,
        titleMap : state.get('titleMap').push({'date':action.news.date, 'yPosition':250})
      });

    case REQUEST_LIST_FAILURE:
      return state.merge({fetching: false});

    case SET_POSITION_OFFSET:
      return state.merge({positionOffset: action.positionOffset});

    case SET_OFFSET_FROM_TODAY:
      return state.merge({offsetFromToday: action.offsetFromToday});

    case SET_TITLE:
      const yPosition = - action.positionOffset;
      if(yPosition < 240){
          return state.merge({title:'首页'})
      }
      let titleMap = state.get('titleMap');
      let preTitle = titleMap.get(0);
      titleMap.forEach((title)=>{
        if(yPosition < title.yPosition){
          return;
        }else{
            preTitle = title;
        }
      });
      const titleShow = dateFormat(preTitle.date);
      return  state.merge({title:titleShow});

    default:
      return state

  }
}

function dateFormat(date) {
    const today = dateStr(0);
    if (today === date) {
        //return (new Date()).pattern("yyyy-MM-dd EEE");

        return "今日热闻";
    } else {
        const month = date.substr(4, 2);
        const day = date.substr(6, 2);
        return month + "月" + day + "日";
    }
}

function dateStr(offset) {
    var date = new Date();
    date.setDate(date.getDate() + offset); //获取offset天后的日期
    var year = date.getFullYear();
    var month = date.getMonth() + 1;  //获取当前月份的日期
    var day = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    return "" + year + month + day;
}

export default mainReducer 

