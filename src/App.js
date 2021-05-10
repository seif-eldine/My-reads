import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css';
import Home from './components/home';
import Search from './components/search';

import {Route} from 'react-router-dom';

class BooksApp extends React.Component {
  

  render() {
    return (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
      </React.Fragment>
    )
  }
}

export default BooksApp

