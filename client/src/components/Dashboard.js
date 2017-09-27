// This component will display logged in user's account info
// Will also route to other user-specific pages (wardrobe, history)
import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route, Link } from 'react-router-dom';
import Wardrobe from './Wardrobe';

class Dashboard extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='row dashboard'>
          <div className='col-mid-4'>
            <div className='dashboard-wrap'>
              <div>
                <span>MY ACCOUNT</span>
              </div>
              <div>
                <NavLink exact activeClassName="active" className="dashboard-link" to='/account' >
                  Account Dashboard
                </NavLink>
                <NavLink exact activeClassName="active" className="dashboard-link" to='/wardrobe' >
                  My Wardrobe
                </NavLink>
              </div>
            </div>
          </div>
          <div className='col-mid-8'>
            <div className='dashboard-wrap'>
              <div>
                <span>MY DASHBOARD</span>
              </div>
              <div>
                <Route exact path='/account' render={() => {return <span>SELECT A TAB ON THE LEFT SIDE TO BEGIN WITH!</span>}} />
                <Route exact path='/wardrobe' component={() => (<Wardrobe />)} />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Dashboard;