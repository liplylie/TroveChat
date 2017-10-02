import React, { Component } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';
import Checkout from './Checkout';
import { Scrollbars } from 'react-custom-scrollbars'
import moment from 'moment';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart
    }
    this.emptyCart = this.emptyCart.bind(this);
  }
  
  // componentDidMount() {
  //   this.setState
  // }
  

  totalPrice(cart) {
    var totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
      totalPrice += cart[i].price;
    }
    return Math.floor(totalPrice * 0.07);
  }

  emptyCart() {
    this.setState({
      cart: []
    });
  }

  render() {
    console.log('this is nav cart: ', this.props)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
          <NavLink id='bg-logo' exact className="navbar-brand" to='/' >
          TROVE
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <NavLink exact activeClassName="active" className="nav-link nav-title" to='/men' >
                MEN
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact activeClassName="active" className="nav-link nav-title" to='/women' >
                WOMEN
              </NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 search-section">
              <input className="form-control mr-sm-2 input-sm" type="text" placeholder="Search"
              onChange = { (e) => {this.props.passHandleInput(e.target.value) }}></input>
              <NavLink exact activeClassName="active" to='/search'
              onClick = { () => {this.props.passSearch()}} >
              <button className="btn btn-outline-success my-2 my-sm-0 btn-sm nav-btn-color nav-btn-section" type="submit"
              onClick = { () => {this.search() }} ><i className="material-icons nav-search-btn">search</i></button>
              </NavLink>
            </form>
            {/* Check if user logged in */}
            {!this.props.authenticated ?
              <NavLink exact activeClassName="active"  className="nav-link nav-title login" to='/login'>
              <i className="fa fa-user-o cart-icon" aria-hidden="true"></i>LOGIN / REGISTER
              </NavLink>
              :
              (
                <div className='navbar-nav'>
                  <NavLink exact activeClassName="active"  className="nav-link nav-title" to='/account' >
                  <i className="fa fa-suitcase cart-icon" aria-hidden="true"></i>ACCOUNT
                  </NavLink>
                  <NavLink exact activeClassName="active"  className="nav-link nav-title logout" to='/' onClick={() => {this.emptyCart(); this.props.logout() }} >
                  <i className="fa fa-user cart-icon" aria-hidden="true"></i>LOGOUT
                  </NavLink>
                    <a className='nav-link nav-title' onClick={() => this.state.cart.length > 0 ? this.props.showCart() : null}>
                      <i className="fa fa-shopping-cart cart-icon" aria-hidden="true"></i>{this.state.cart.length}
                    </a>
                    <div className={this.props.showCartState ? "cart cart-active" : "cart"}>
                      <div className='col-md-12 cart-section'>
                        <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={400} style={{ width: 460}} >
                          {this.state.cart.map((item, i) => {
                            return (
                              <div className="cart-single-items" key={`cart-item-${i}`}>
                                <div className='row'>
                                  <div className='col-sm-3'>
                                    <img className="item-image" src={item.image}/>
                                  </div>
                                  <div className='col-sm-8'>
                                    <div className='cart-item-name'>{item.itemname}</div>
                                    <div className='cart-item-brand'>{item.brand}</div>
                                    <div className='cart-item-price'>${Math.floor(item.price * 0.07)}</div>
                                  </div>
                                  <div className='col-sm-1'>
                                    <button id="checkout" className='btn cart-remove-btn' type="button" onClick={() => this.props.remove(item.id)}>X</button>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </Scrollbars>
                      </div>
                      <div className="checkout">
                        <p>
                          <Checkout
                            emptyCart={this.emptyCart}
                            renterId={this.props.renterId}
                            cart={this.state.cart}
                            label={'Check Out'}
                            name={'Hey there, hottie'}
                            description={'Trove'}
                            amount={this.totalPrice(this.state.cart)} //in dollars
                            length={this.state.cart.length}
                          />
                        </p>
                      </div>
                    </div>
                </div>
              )
            }
          </div>
        </nav>
    );
  }
}

export default NavBar;