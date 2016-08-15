/**
 * Created by xu on 16/5/7.
 */
import React, { Component,PropTypes} from 'react';
import Slider from 'react-slick'

require('./Carousel.css');

export default class Carousel extends Component {

  render() {
    const {topNews} = this.props;
    var settings = {
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
          topNews.map((item, index) => {
            return <div className='headline-container' onClick={() => this.props.onClick(item.id)}><div
                        className="headline-bg" style={{backgroundImage: 'url(' + item.image + ')'}}>
            </div><p className="title">{item.title}</p></div>;
          })
        }
      </Slider>
    )
  }

}

Carousel.propTypes = {
  topNews: PropTypes.array
};