import React, { Component,PropTypes} from 'react'
import NewsItem from '../components/NewsItem'
import fetchNewsList from '../actions/MainAction'
import { connect } from 'react-redux'
import PullToRefresh from '../components/PullToRefresh'

require('./Main.less');

class Main extends Component{

	constructor(props){
		super(props);		
		 this.state = {
	         offsetFromNow: 1
	    };
		const date = this.dateStr(this.state.offsetFromNow);
		this.props.dispatch(fetchNewsList(date));	
	}

	render() {
		const {news} = this.props;
		const options = Object.assign({},{useTransition: true,
            probeType: 2, click: true});
		return (
			<div>
			<div className="header">
				<span>知乎日报</span>
			</div>
			<div className="container">	
				<PullToRefresh ref="pull-to-refresh-wrapper" options={options}  onPullUp = {this.onPullUpToLoadMore.bind(this)} >		
				{( news.length > 0 ) ? 
					news.map((item, index) => <NewsItem key={index} newsItem = {item} onClick={ () => this.onNewsClick(item.id) }/>)
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
		var month = date.getMonth()+1;  //获取当前月份的日期 
		var day = date.getDate(); 
		if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (day >= 0 && day <= 9) {
	        day = "0" + day;
	    }
		return ""+ year + month + day;
	}

	onNewsClick(id) {
	
		this.props.history.pushState(null, `/detail/${id}`);
	}

	onPullUpToLoadMore() {
		const date = this.dateStr(--this.state.offsetFromNow) ;
		this.props.dispatch(fetchNewsList(date)) ;
	}
}

Main.propTypes = {
  // Injected by React Redux
  news: PropTypes.array
};



function mapStateToProps(state) {
	const mystate = state.mainReducer.toJSON();
	return {
		news: mystate.news
	}
}

export default connect(mapStateToProps)(Main)