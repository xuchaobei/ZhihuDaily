import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import fetchNews, { clearData } from '../actions/NewsDetailAction';

require('./NewsDetail.less');
const backUrl = require('../img/back.png');


class NewsDetail extends Component {

  constructor(props) {
    super(props);
    const id = this.props.params.id;
    this.props.dispatch(fetchNews(id));
    this.goBack = this.goBack.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.style_content !== null;
  }

  createContentHtml(content) {
    return { __html: content };
  }

  goBack() {
    this.props.dispatch(clearData());
    this.props.history.goBack();
  }

  render() {
    const { content, title, image, image_source, style_content } = this.props;
    const bannerStyle = {
      backgroundImage: `url(${image})`
    };
    return (
      <div>
        {
          (style_content != null) ? <style type="text/css">{style_content}</style> : ''
        }
        <div className="b-header">
          <div className="b-header__return" onClick={this.goBack}><img alt="" src={backUrl} /></div>
        </div>
        <div className="b-banner" >
          <div className="b-banner__bg" style={bannerStyle} />
          <p className="b-banner__title">{title}</p>
          <p className="b-banner__corner">{image_source}</p>
        </div>
        <div className="b-content" dangerouslySetInnerHTML={this.createContentHtml(content)} />
      </div>
    );
  }
}

NewsDetail.propTypes = {
  // Injected by React Redux
  dispatch: PropTypes.func,
  history: PropTypes.object,
  id: PropTypes.string,
  params: PropTypes.object,
  content: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  image_source: PropTypes.string,
  style_content: PropTypes.string
};

function mapStateToProps(state) {
  const mystate = state.newsDetailReducer.toJSON();
  return {
    content: mystate.content,
    title: mystate.title,
    image: mystate.image,
    image_source: mystate.image_source,
    style: mystate.style,
    style_content: mystate.style_content
  };
}

export default connect(mapStateToProps)(NewsDetail);
