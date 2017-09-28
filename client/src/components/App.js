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
import Item from './Item';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
      authenticated: null,
      user: null,
      sqlUser: null
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

  render() {
    console.log('this is state in render: ', this.state);
    return (
      <BrowserRouter>
        <div>
          <NavBar authenticated={this.state.authenticated} logout={this.logout}/>
          <Route exact path='/' component={() => (<Home passItems={this.state.allItems} />)} />
          <Route exact path='/men' component={() => (
            <Men passItems={this.state.allItems} />)} />
          <Route exact path='/women' component={() => (
            <Women passItems={this.state.allItems} />)} />
          <Route exact path='/account' component={() => (<Dashboard sqlUser={this.state.sqlUser}/>)} />
          <Route exact path='/login' component={() => (<Login authenticated={this.state.authenticated} login={this.authWithEmailPassword} signUp={this.signUp}/>)} />
          <Route exact path='/item/:item_id' render={() => <Item someProp={'wook'} />} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;