import React, { Component } from 'react';
import * as firebase from 'firebase'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      txtEmail: '',
      txtPassword: ''
    }

    // this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    // const txtEmail = document.getElementById('txtEmail');
    // const txtPassword = document.getElementById('txtPassword');
    // const btnLogin = document.getElementById('btnLogin');
    // btnLogin.addEventListener('click', e => {
    //   //Get email and pass
    //   const email = txtEmail.value;
    //   const pass = txtPassword.value;
    //   const authDomain = firebase.auth();
    //   //Sign in
    //   auth.signInWithEmailAndPassword(email, pass)
    //     .then(() => console.log('login button worked'))
    //     .catch(err => console.log(err.message));
    
    
    // });
  }

  
  //Add login event
  authWithEmailPassword() {
    alert('login button clicked');
  }

  render() {
    return (
      <div className='signin-section'>
        <div className='container'>
          <div className='log-reg-section'>
            <span>SIGN IN</span>
          </div>
          <div className='row'>
            <div className='col-md-5 signin'>
              <span className='log-reg-title'>Returning Customer</span>
              <br></br>
              <div className='signin-input-area-title'>
                <span className='signin-input-title'>EMAIL ADDRESS*</span>
                <input id="txtEmail" className="form-control signin-input" type="text"></input>
              </div>
              <div className='signin-input-area-title'>
                <span className='signin-input-title'>PASSWORD*</span>
                <input id="txtPassword" className="form-control signin-input" type="text"></input>
              </div>
              <span className='signin-input-title'>Forget your password?</span>
              <br></br>
              <div className='signin-input-area-title'>
                <button id="btnLogin" className="btn signin-btn-color btn-lg btn-block" type="submit"
                onClick={() => this.authWithEmailPassword()}
                >LOGIN</button>
              </div>
            </div>
            <div className='col-md-5 register'>
              <span className='log-reg-title'>New Customer</span>
              <br></br>
              <div className='signin-input-area-title'>
                <span className='signin-input-title'>NAME*</span>
                <input className="form-control signin-input" type="text"></input>
              </div>
              <div className='signin-input-area-title'>
                <span className='signin-input-title'>EMAIL ADDRESS*</span>
                <input className="form-control signin-input" type="text"></input>
              </div>
              <div className='signin-input-area-title'>
                <span className='signin-input-title'>PASSWORD*</span>
                <input className="form-control signin-input" type="text"></input>
              </div>
              <div className='signin-input-area-title'>
                <span className='signin-input-title'>CONFIRM PASSWORD*</span>
                <input className="form-control signin-input" type="text"></input>
              </div>
              <span className='signin-input-title'>By registering your details you agree to our Terms and Conditions and privacy and cookie policy</span>
              <br></br>
              <div className='signin-input-area-title'>
                <button className="btn signin-btn-color btn-lg btn-block" type="submit">REGISTER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;