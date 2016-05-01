import React, { Component,PropTypes} from 'react'
import fetchNews, {clearData} from '../actions/NewsDetailAction'
import { connect } from 'react-redux'

require('./NewsDetail.less');


class NewsDetail extends Component{

	constructor(props){
		super(props);
		const id = this.props.params.id;	
		this.props.dispatch(fetchNews(id));	
		this.goBack = this.goBack.bind(this)
	}

	shouldComponentUpdate(nextProps, nextState) {
	    return nextProps.style_content !== null;
	}

	render() {
		const {content, title, image, image_source, style_content} = this.props;
		const backUrl = require('../img/back.png');		
		const bannerStyle = {
			backgroundImage : 'url(' + image + ')',
		}

		return (
			<div>
			{
				( style_content != null ) ? <style type="text/css">{style_content}</style> : ""
			}

			<div className="header">
				<div className="return" onClick={this.goBack}><img src={backUrl} /></div>
			</div>
			<div className="banner" style={bannerStyle} >
				<p className="title">{title}</p>
				<p className="corner">{image_source}</p>
			</div>
			<div className="container" dangerouslySetInnerHTML={this.createContentHtml(content)} />			
			</div>
		)
		
	}

	createContentHtml(content) { 
		return {__html: content}; 
	}

	goBack(){
		this.props.dispatch(clearData())
		this.props.history.goBack()
	}
}

NewsDetail.propTypes = {
  // Injected by React Redux
  id: PropTypes.string, 
}

function mapStateToProps(state) {

	const mystate = state.newsDetailReducer.toJSON();
	return {
	  	content: mystate.content,
	    title: mystate.title,
	    image: mystate.image,
	    image_source: mystate.image_source,
	    style: mystate.style,
	    style_content:mystate.style_content    
	}
}

export default connect(mapStateToProps)(NewsDetail)