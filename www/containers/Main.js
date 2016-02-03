import React, { Component,PropTypes} from 'react'
import NewsItem from '../components/NewsItem'
import fetchNewsList from '../actions/MainAction'
import { connect } from 'react-redux'

require('./Main.less');

class Main extends Component{

	constructor(props){
		super(props);
		const date = this.nextDate();
		this.props.dispatch(fetchNewsList(date));	
	}

	render() {
		const {news} = this.props;
		return (
			<div>
			<div className="header">
				<div><span>知乎日报</span></div>
			</div>
			<div className="container">			
				{( news.length > 0 ) ? 
					news.map((item, index) => <NewsItem key={index} newsItem = {item} onClick={ () => this.onNewsClick(item.id) }/>) : ''}			
			</div>
			</div>
		)
		
	}

	nextDate() {
		var date = new Date();
		var year = date.getFullYear();
   		var month = date.getMonth() + 1;
	    var strDate = date.getDate()+ 1;
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = year + month + strDate;
	    return currentdate;	         
	}

	onNewsClick(id) {
	
		this.props.history.pushState(null, `/detail/${id}`);
	}
}

Main.propTypes = {
  // Injected by React Redux
  news: PropTypes.array, 
}

function mapStateToProps(state) {
	const mystate = state.mainReducer
	  return {
	    news: mystate.news,    
	  }
}

export default connect(mapStateToProps)(Main)