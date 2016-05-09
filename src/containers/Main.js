import React, { Component,PropTypes} from 'react'
import NewsItem from '../components/NewsItem'
import fetchNewsList, {fetchLatestNews, setPositionOffset} from '../actions/MainAction'
import { connect } from 'react-redux'
import PullToRefresh from '../components/PullToRefresh'
import Carousel from '../components/Carousel'

require('./Main.less');

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offsetFromNow: 0
    };
    if (props.news == null || props.news.length == 0) {
      this.props.dispatch(fetchLatestNews());

    }
  }

  render() {
    const {news, topNews, positionOffset} = this.props;
    const options = Object.assign({}, {
      useTransition: true,
      probeType: 2, click: true, startY: positionOffset
    });
    return (
      <div>
        <div className="header">
          <span>知乎日报</span>
        </div>
        <div className="container">
          <PullToRefresh ref="pull_to_refresh_wrapper" options={options} onPullUp={this.onPullUpToLoadMore.bind(this)}>
            {
              (topNews && topNews.length > 0) ? <Carousel onClick={this.onNewsClick.bind(this)} topNews = {topNews}/>:''
            }

            {( news.length > 0 ) ?
              news.map((item, index) => {
                return item.stories.map((newsItem, newsIndex) => {
                  return <div>{newsIndex == 0 ? <div className="date">{this.dateFormat(item.date)}</div> : ""}
                    <NewsItem newsItem={newsItem}
                              onClick={ () => this.onNewsClick(newsItem.id) }/>
                  </div>
                })
              })
              : ''}

          </PullToRefresh>
        </div>
      </div>
    )

  }


  dateStr(offset) {
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

  dateFormat(date) {
    const today = this.dateStr(0);
    if (today === date) {
      //return (new Date()).pattern("yyyy-MM-dd EEE");
      return "今日热闻";
    } else {
      const month = date.substr(4, 2);
      const day = date.substr(6, 2);
      return month + "月" + day + "日";
    }
  }

  onNewsClick(id) {
    var offset = this.refs.pull_to_refresh_wrapper.getScrollerOffset();
    this.props.dispatch(setPositionOffset(offset));
    this.props.history.pushState(null, `/detail/${id}`);
  }

  onPullUpToLoadMore() {
    const date = this.dateStr(this.state.offsetFromNow--);
    this.props.dispatch(fetchNewsList(date));
  }
}

Main.propTypes = {
  // Injected by React Redux
  news: PropTypes.array
};


function mapStateToProps(state) {
  const mystate = state.mainReducer.toJSON();
  return {
    news: mystate.news,
    topNews: mystate.topNews,
    positionOffset: mystate.positionOffset
  }
}

export default connect(mapStateToProps)(Main)