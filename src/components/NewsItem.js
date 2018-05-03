import React, { Component, PropTypes } from 'react';

require('./NewsItem.less');

export default class NewsItem extends Component {

  render() {
    const { newsItem, onClick } = this.props;
    return (
      <div className="b-news-item" onClick={onClick}>
        <div className="b-news-item__left">
          <img alt="" className="b-news-item__img" src={newsItem.images[0]} />
        </div>
        <div className="b-news-item__right">
          <p className="b-news-item__title">{newsItem.title}</p>
        </div>
      </div>
    );
  }
}

NewsItem.propTypes = {
  newsItem: PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
  onClick: PropTypes.func
};
