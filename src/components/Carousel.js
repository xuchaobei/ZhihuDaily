import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';

require('./Carousel.css');

export default class Carousel extends Component {

  render() {
    const { topNews } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true
    };
    return (
      <Slider {...settings}>
        {
          topNews.map(item => (<div className="headline-container" onClick={() => this.props.onClick(item.id)}>
            <div className="headline-bg" style={{ backgroundImage: `url(${item.image})` }} />
            <p className="title">{item.title}</p></div>))
        }
      </Slider>
    );
  }
}

Carousel.propTypes = {
  topNews: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};
