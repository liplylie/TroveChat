import React, { Component } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props)
  } 

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
          {/* <a id='bg-logo'className="navbar-brand" href="/">TROVE</a> */}
          <NavLink id='bg-logo' exact className="navbar-brand" to='/' >
          TROVE
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <NavLink exact activeClassName="active" className="nav-link" to='/men' >
                MEN
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact activeClassName="active" className="nav-link" to='/women' >
                WOMEN
              </NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 search-section">
              <input className="form-control mr-sm-2 input-sm" type="text" placeholder="Search"></input>
              {/* <i className="material-icons btn btn-outline-success  btn-sm btn-color " type="submit">search</i> */}
              <button className="btn btn-outline-success my-2 my-sm-0 btn-sm nav-btn-color nav-btn-section" type="submit"><i className="material-icons">search</i></button>
            </form>
            {/* Check if user logged in */}
            {!this.props.authenticated ?
              <NavLink exact activeClassName="active"  className="nav-link login" to='/login'>
                  LOGIN / REGISTER
              </NavLink>
              :
              (
                <div className='navbar-nav'>
                  <NavLink exact activeClassName="active"  className="nav-link" to='/account' >
                    ACCOUNT
                  </NavLink>
                    <a>
                      <img className="cart-icon" src={require('../../style/bag.jpg')} />
                    </a>
                    {/* <span>Bag</span> */}
                  <NavLink exact activeClassName="active"  className="nav-link logout" to='/' onClick={() => this.props.logout()}>
                    LOGOUT
                  </NavLink>
                </div>
              )
            }
          </div>
        </nav>
    );
  }
}

export default NavBar;