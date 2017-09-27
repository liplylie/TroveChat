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
      authenticated: null,
      user: null
    }

    this.fetch = this.fetch.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    this.fetch();
    auth.onAuthStateChanged((user) => {
      if(user) {
        console.log(user);
        this.setState({
          authenticated: true
        })
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
      .then((result) => {
        console.log('login button worked')
        // document.getElementsByClassName('act-link').style.display = '';
        this.setState({
          authenticated: true,
          user: result.user
        })
        console.log('setting state in authWithEmailPassword, authenticated: ', this.state.authenticated);
      })
      .catch(err => console.log(err.message));

    document.getElementById('txtEmail').value = '';
    document.getElementById('txtPassword').value = '';
  }

  logout() {
    alert('logout function evoked');
    auth.signOut()
      .then(() => {
        this.setState({
          authenticated: false,
          user: null
        })
        console.log('setting state in logout, authenticated: ', this.state.authenticated);        
      })
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
          <NavBar authenticated={this.state.authenticated} logout={this.logout}/>
          <Route exact path='/' component={() => (<Home />)} />
          {/* <Route exact path='/logout' component={() => (<Home />)} /> */}
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