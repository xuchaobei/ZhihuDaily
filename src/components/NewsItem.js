import React, { Component,PropTypes} from 'react';

require('./NewsItem.less');

export default class NewsItem extends Component{

	constructor(props){
		super(props)
		
	}

	render() {
		const {newsItem, onClick} = this.props;

		return (		
				<div className="item" onClick= { onClick }>
					<div className="item-left">
						<img src={newsItem.images[0]}/>
					</div>					
					<div className="item-right">
						<p className="title">{newsItem.title}</p>
						
					</div>
				</div>			
		)		
	}

	
}

NewsItem.propTypes = {
	newsItem : PropTypes.object
}