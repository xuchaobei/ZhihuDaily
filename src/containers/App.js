import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div>Hello World!</div>
    );
  }
}


function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  };
}

export default connect(mapStateToProps)(App);
