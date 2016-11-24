import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewsItem from '../components/NewsItem';
import fetchNewsList, { fetchLatestNews, setPositionOffset, setOffsetFromToday, setTitle } from '../actions/MainAction';
import PullToRefresh from '../components/PullToRefresh';
import Carousel from '../components/Carousel';

require('./Main.less');

class Main extends Component {

  constructor(props) {
    super(props);
    this.onPullUpToLoadMore = this.onPullUpToLoadMore.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
    this.onNewsClick = this.onNewsClick.bind(this);
    if (props.news == null || props.news.length === 0) {
      this.props.dispatch(fetchLatestNews());
    }
  }

  onNewsClick(id) {
    const offset = this.refs.pull_to_refresh_wrapper.getScrollerOffset();
    this.props.dispatch(setPositionOffset(offset));
    this.props.history.pushState(null, `/detail/${id}`);
  }

  onPullUpToLoadMore() {
    let offsetDate = this.props.offsetFromToday;
    const date = this.dateStr(offsetDate);
    this.props.dispatch(fetchNewsList(date));
    this.props.dispatch(setOffsetFromToday(--offsetDate));
  }

  onScrollEnd() {
    const offset = this.refs.pull_to_refresh_wrapper.getScrollerOffset();
    this.props.dispatch(setTitle(offset));
  }

  dateStr(offset) {
    const date = new Date();
    date.setDate(date.getDate() + offset); // 获取offset天后的日期
    const year = date.getFullYear();
    let month = date.getMonth() + 1;  // 获取当前月份的日期
    let day = date.getDate();
    if (month >= 1 && month <= 9) {
      month = `0${month}`;
    }
    if (day >= 0 && day <= 9) {
      day = `0${day}`;
    }
    return `${year}${month}${day}`;
  }

  dateFormat(date) {
    const today = this.dateStr(0);
    if (today === date) {
      // return (new Date()).pattern("yyyy-MM-dd EEE");
      return '今日热闻';
    }
    const month = date.substr(4, 2);
    const day = date.substr(6, 2);
    return `${month}月${day}日`;
  }

  render() {
    const { news, topNews, positionOffset, title } = this.props;
    const options = Object.assign({}, {
      useTransition: true,
      probeType: 2,
      click: true,
      startY: positionOffset
    });
    return (
      <div>
        <div className="header">
          <span>{title}</span>
        </div>
        <div className="container">
          <PullToRefresh
            ref="pull_to_refresh_wrapper" options={options} onPullUp={this.onPullUpToLoadMore}
            onScrollEnd={this.onScrollEnd}
          >
            {
              (topNews && topNews.length > 0) ? <Carousel onClick={this.onNewsClick} topNews={topNews} /> : ''
            }

            {(news.length > 0) ?
              news.map(item => item.stories.map((newsItem, newsIndex) => <div>{newsIndex === 0 ? <div className="date">{this.dateFormat(item.date)}</div> : ''}
                <NewsItem
                  newsItem={newsItem}
                  onClick={() => this.onNewsClick(newsItem.id)}
                />
              </div>))
              : ''}

          </PullToRefresh>
        </div>
      </div>
    );
  }

}

Main.propTypes = {
  // Injected by React Redux
  dispatch: PropTypes.func,
  history: PropTypes.object,
  news: PropTypes.array,
  topNews: PropTypes.array,
  positionOffset: PropTypes.number,
  offsetFromToday: PropTypes.number,
  title: PropTypes.string,
};


function mapStateToProps(state) {
  const mystate = state.mainReducer.toJSON();
  return {
    news: mystate.news,
    topNews: mystate.topNews,
    positionOffset: mystate.positionOffset,
    offsetFromToday: mystate.offsetFromToday,
    title: mystate.title
  };
}

export default connect(mapStateToProps)(Main);
