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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
      cart: [],
      startDate: null,
      endDate: null,
      authenticated: null,
      user: null,
      sqlUser: null,
      searchInput: '',
      searchRes: []
    }
    this.fetch = this.fetch.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  search() {
    const clone = this.state.allItems;
    // Extremely strict search, could be optimized to be more broad..
    const res = clone.filter(item => {
      return item.itemname === this.state.searchInput;
    });
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
            sqlUser: data
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
          sqlUser: null
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
      currCart.push(item);
      this.setState({
        cart: currCart
      })
    }
    console.log('cart after adding item: ', this.state.cart);
  }

  removeFromCart(id) {
    console.log('id: ', id)
    let currCart = this.state.cart;
    let removeItemIndex = currCart.findIndex((item => item.id === id)) 
    currCart.splice(removeItemIndex, 1);
    this.setState({
      cart: currCart
    })
  }

  render() {
    console.log('this is state in render: ', this.state);
    return (
      <BrowserRouter>
        <div>
          <NavBar 
          authenticated={this.state.authenticated} 
          logout={this.logout}
          passItems={this.state.allItems}
          passHandleInput={this.handleSearch}
          passSearch={this.search}
          cart={this.state.cart} 
          remove={this.removeFromCart} />
          <Switch>
            <Route exact path='/' component={() => (<Home passItems={this.state.allItems} />)} />
            <Route exact path='/men' component={() => (
              <Men passItems={this.state.allItems} addToCart={this.handleAddToCart}/>)} />
            <Route exact path='/women' component={() => (
              <Women passItems={this.state.allItems} addToCart={this.handleAddToCart}/>)} />
            <Route exact path='/account' component={() => (<Dashboard sqlUser={this.state.sqlUser} passItems={this.state.allItems}/>)} />
            <Route exact path='/wardrobe' component={() => (<Dashboard sqlUser={this.state.sqlUser} passItems={this.state.allItems}/>)} />
            <Route exact path='/login' component={() => (<Login authenticated={this.state.authenticated} login={this.authWithEmailPassword} signUp={this.signUp}/>)} />
            <Route exact path='/item/:item_id' component={Item} />
            <Route exact path='/search' component={() => (<SearchResult passRes={this.state.searchRes} />)} />
            <Route render={function() {
								return (
                  <div className='fourofour-section'>
                    <p className='fourofour-status'>404</p>
                    <p className='fourofour-description'>PAGE NOT FOUND!</p>
                  </div>
                  )
							}} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;