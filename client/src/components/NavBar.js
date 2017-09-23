import React, { Component } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">TROVE</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <NavLink exact activeClassName="active" className="nav-link" to='/men' >
                MEM
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact activeClassName="active" className="nav-link" to='/women' >
                WOMEN
              </NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2 input-sm" type="text" placeholder="Search"></input>
              <button className="btn btn-outline-success my-2 my-sm-0 btn-sm btn-color" type="submit">Search</button>
            </form>
            <NavLink exact activeClassName="active"  className="nav-link" to='/signup' >
                SIGN UP
            </NavLink>
            <NavLink exact activeClassName="active"  className="nav-link" to='/login' >
                LOGIN
            </NavLink>
          </div>
        </nav>
    );
  }
}

export default NavBar;