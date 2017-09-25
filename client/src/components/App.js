import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Men from './Men';
import Women from './Women';
import Login from './Login';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Route exact path='/' component={() => (<Home />)} />
          <Route excat path='/men' component={() => (<Men />)} />
          <Route excat path='/women' component={() => (<Women />)} />
          <Route exact path='/login' component={() => (<Login />)} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;