import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],

      username: '',
      authenticated: false,
      user: null
    }
    this.fetch = this.fetch.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.signUp = this.signUp.bind(this);

  }

  componentDidMount() {
    this.fetch();
    auth.onAuthStateChanged((user) => {
      if(user) {
        console.log(user);
      } else {
        console.log('not logged in')
      }
    })
  }

  //Add login event
  authWithEmailPassword() {
    alert('login button clicked');
    const email = document.getElementById('txtEmail').value;
    const pw = document.getElementById('txtPassword').value;
    
    const authDomain = firebase.auth();
    auth.signInWithEmailAndPassword(email, pw)
      .then(() => console.log('login button worked'))
      .catch(err => console.log(err.message));

    document.getElementById('txtEmail').value = '';
    document.getElementById('txtPassword').value = '';
  }

  //Sign up
  signUp () {
    const newEmail = document.getElementById('newEmail').value;
    const newPw = document.getElementById('newPw').value;
    const confPw = document.getElementById('confPw').value;

    if (newPw === confPw) {
      auth.createUserWithEmailAndPassword(newEmail, newPw)
        .then(() => {
          console.log('created user')
        })
        .catch(err => console.log(err.message));
    } else {
      alert('Please make sure both passwords match');
    }
  }
  

  fetch() {
    axios.get('/api')
    .then(items => {
      this.setState({ allItems: items.data });
      // console.log('Items:', this.state.allItems);
    })
    .catch(err => {
      console.log('Fetch err:', err);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar authenticated={this.state.authenticated}/>
          <Route exact path='/' component={() => (<Home />)} />
          <Route exact path='/men' component={() => (
            <Men passItems={this.state.allItems} />)} />
          <Route exact path='/women' component={() => (
            <Women passItems={this.state.allItems} />)} />
          <Route exact path='/account' component={() => (<Dashboard />)} />
          <Route exact path='/wardrobe' component={() => (<Wardrobe />)} />
          <Route exact path='/login' component={() => (<Login login={this.authWithEmailPassword} signUp={this.signUp}/>)} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;