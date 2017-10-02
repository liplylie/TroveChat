import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Home from './Home';
import Men from './Men';
import Women from './Women';
import Login from './Login';
import Footer from './Footer';
import Dashboard from './Dashboard';
import Wardrobe from './Wardrobe';
import firebase, {auth} from '../firebase';
import Item from './Item';
import SearchResult from './SearchResult';
import UserWardrobe from './UserWardrobe';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      startDate: null,
      endDate: null,
      authenticated: null,
      user: null,
      sqlUser: null,
      searchInput: '',
      searchRes: [],
      checkThisUser: null,
      viewCart: JSON.parse(localStorage.getItem('viewCart')) || false,
      userId: null

    }
    this.fetch = this.fetch.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleCheckUser = this.handleCheckUser.bind(this);

    this.showCart = this.showCart.bind(this);
  }

  handleCheckUser(num) {
    this.state.checkThisUser = num;
    console.log('CheckUSER:', this.state.checkThisUser);
  }

  search() {
    const res = [];
    const clone = this.state.allItems;
    const split = this.state.searchInput.split(' ');
    for (let i = 0; i < clone.length; i++) {
      for (let j = 0; j < split.length; j++) {
        let checkThis = split[j].toLowerCase();
        if (clone[i].itemname.toLowerCase().includes(checkThis)) {
          res.push(clone[i]);
        }
      }
    }
    this.state.searchRes = res;
  }

  handleSearch(input) {
    this.state.searchInput = input;
  }

  componentDidMount() {
    this.fetch();
    auth.onAuthStateChanged((user) => {
      if(user) {
        console.log(user.email);
        axios.get(`/api/user/${user.email}`)
        .then(({data}) => {
          this.setState({
            authenticated: true,
            user: user,
            sqlUser: data,
            userId: data.id
          })
        })
      } else {
        console.log('not logged in')
      }
    })
  }

  //Add login event
  authWithEmailPassword() {
    const email = document.getElementById('txtEmail').value;
    const pw = document.getElementById('txtPassword').value;
    const userData = null;
    const authDomain = firebase.auth();

    auth.signInWithEmailAndPassword(email, pw)
      .then((result) => {
        console.log('logged in')
        axios.get(`/api/user/${email}`)
        .then(({data}) => {
          this.setState({
            authenticated: true,
            user: result,
            sqlUser: data
          })
        })
        .catch(err => console.log('error in axios: ', err.message));
      })
      .catch(err => alert(err.message));

    document.getElementById('txtEmail').value = '';
    document.getElementById('txtPassword').value = '';
  }

  logout() {
    auth.signOut()
      .then(() => {
        console.log('signed out')
        this.setState({
          authenticated: false,
          user: null,
          sqlUser: null,
          cart: localStorage.setItem('cart', JSON.stringify([]))
        })
        console.log('state on logout: ', this.state);        
      })
      .catch(err => alert(err.message));
  }

  //Sign up
  signUp () {
    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPw = document.getElementById('newPw').value;
    const confPw = document.getElementById('confPw').value;

    if (newPw === confPw) {
      auth.createUserWithEmailAndPassword(newEmail, newPw)
        .then((result) => {
          console.log('signed up')
          axios.post('/api/user', {
            userName: newName,
            userEmail: newEmail
          })
          .then(({data}) => {
            this.setState({
              authenticated: true,
              user: result,
              sqlUser: data
            })
            alert('Account successfully created!')
          })
          .catch(err => alert(err.message));
        })
        .catch(err => alert(err.message));
    } else {
      alert('Please make sure both passwords match');
    }
  }
  
  fetch() {
    axios.get('/api')
    .then(items => {
      this.setState({ allItems: items.data });
    })
    .catch(err => {
      console.log('Fetch err:', err);
    })
  }

  handleAddToCart(item, start, end) {
    item.startDate = start;
    item.endDate = end;
    console.log('this is the item: ', item)
    let currCart = this.state.cart;
    if (start === null || end === null) {
      alert('Please specify rent dates!');
    } else {
      if(currCart) {
        for (var i = 0; i < JSON.parse(localStorage.getItem('cart')).length; i++) {
          if (item.id === JSON.parse(localStorage.getItem('cart'))[i].id) {
            return alert('You already have this item in your cart')
          } 
        }
        currCart.push(item); 
        this.setState({
          cart: currCart
        },() => {
          localStorage.setItem('cart', JSON.stringify(this.state.cart))
        });
      }
    }
    console.log('check cart localStorage: ', JSON.parse(localStorage.getItem('cart')))
    // console.log('cart after adding item: ', this.state.cart);
  }

  removeFromCart(id) {
    console.log('id: ', id)
    let currCart = this.state.cart;
    let removeItemIndex = currCart.findIndex((item => item.id === id)) 
    currCart.splice(removeItemIndex, 1);
    this.setState({
      cart: currCart,
    },() => {
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    });
  }

  showCart(e) {
    this.setState({
      viewCart: !this.state.viewCart
    })
  }

  hideCart(e) {
    if (this.state.viewCart === true) {
      this.setState({
        viewCart: false
      },() => {
        localStorage.setItem('viewCart', JSON.stringify(this.state.viewCart))
      })
    }
  }


  render() {
    console.log('this is state in render: ', this.state.cart);
    return (
      <BrowserRouter>
        <div>
          <div>
            <NavBar 
            authenticated={this.state.authenticated} 
            logout={this.logout}
            passItems={this.state.allItems}
            passHandleInput={this.handleSearch}
            passSearch={this.search}
            cart={this.state.cart} 
            remove={this.removeFromCart} 
            showCart={this.showCart}
            showCartState={this.state.viewCart}
            renterId = {this.state.userId} />
          </div>
          <div onClick={() => this.hideCart()}>
          <Switch>
            <Route exact path='/' component={() => (
              <Home 
              passItems={this.state.allItems}
              checkUser={this.handleCheckUser} />)} />
            <Route exact path='/men' component={() => (
              <Men 
              emptyCart={this.emptyCart}
              passItems={this.state.allItems} 
              addToCart={this.handleAddToCart}
              checkUser={this.handleCheckUser} />)} />
            <Route exact path='/women' component={() => (
              <Women 
              emptyCart={this.emptyCart}
              passItems={this.state.allItems} 
              addToCart={this.handleAddToCart}
              checkUser={this.handleCheckUser} />)} />
            <Route exact path='/account' component={() => (<Dashboard sqlUser={this.state.sqlUser} passItems={this.state.allItems}/>)} />
            <Route exact path='/wardrobe' component={() => (<Dashboard sqlUser={this.state.sqlUser} passItems={this.state.allItems}/>)} />
            <Route exact path='/archive' component={() => (<Dashboard sqlUser={this.state.sqlUser} passItems={this.state.allItems}/>)} />
            <Route exact path='/login' component={() => (<Login authenticated={this.state.authenticated} login={this.authWithEmailPassword} signUp={this.signUp}/>)} />
            <Route exact path='/item/:item_id' component={Item} />
            <Route exact path='/search' component={() => (
              <SearchResult passRes={this.state.searchRes} />)} />
            <Route exact path='/userwardrobe' component={() => (
              <UserWardrobe 
              passItems={this.state.allItems}
              getThisUser={this.state.checkThisUser} />)} />
            <Route render={function() {
								return (
                  <div className='fourofour-section'>
                    <p className='fourofour-status'>404</p>
                    <p className='fourofour-description'>PAGE NOT FOUND!</p>
                  </div>
                  )
							}} />
          </Switch>
          </div>
          <div onClick={() => this.hideCart()}>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;