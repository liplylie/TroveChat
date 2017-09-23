import React, { Component } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
        <nav className="navbar navbar-toggleable-md navbar-dark bg-dark">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">TROVE</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <NavLink exact activeClassName="active" to='/men' >
                MEM
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact activeClassName="active" to='/women' >
                WOMEN
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact activeClassName="active" to='/login' >
                LOGIN
              </NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
    );
  }
}

export default NavBar;