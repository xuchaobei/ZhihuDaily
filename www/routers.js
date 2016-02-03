import React from 'react'
import { Router, Route, history } from 'react-router'
import Main from './containers/Main'
import NewsDetail from './containers/NewsDetail'


export default function(){
  return (
  	<Router history={ history }>
	  	<Route path="/" component={Main} />	     	
	  	<Route path="/detail/:id"
	           component={NewsDetail} /> 
  	</Router>
  )
}
