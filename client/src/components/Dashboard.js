// This component will display logged in user's account info
// Will also route to other user-specific pages (wardrobe, history)
import React, { Component } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';
import Wardrobe from './Wardrobe';

class Dashboard extends Component {
  render() {
    return (
        <div>
        <NavLink exact activeClassName="active" className="nav-link" to='/wardrobe' >
        My Wardrobe
        </NavLink>
        <Route exact path='/wardrobe' component={() => (<Wardrobe />)} />
        </div>
    );
  }
}

export default Dashboard;