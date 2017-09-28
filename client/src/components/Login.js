import React, { Component } from 'react';
import { BrowserRouter,Redirect, Route, Link } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    // Redirect if authenticated
    if(this.props.authenticated) {
      return <Redirect to='/' />;
    }
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
                <input id="txtPassword" className="form-control signin-input" type="password"></input>
              </div>
              <span className='signin-input-title'>Forget your password?</span>
              <br></br>
              <div className='signin-input-area-title'>
                <button id="btnLogin" className="btn signin-btn-color btn-lg btn-block" type="submit"
                onClick={() => this.props.login()}
                >LOGIN</button>
              </div>
            </div>
            <div className='col-md-5 register'>
              <span className='log-reg-title'>New Customer</span>
              <br></br>
              <div className='signin-input-area-title'>
                <span className='signin-input-title'>NAME*</span>
                <input id="newName" className="form-control signin-input" type="text"></input>
              </div>
              <div className='signin-input-area-title'>
                <span className='signin-input-title'>EMAIL ADDRESS*</span>
                <input id="newEmail" className="form-control signin-input" type="text"></input>
              </div>
              <div className='signin-input-area-title'>
                <span className='signin-input-title'>PASSWORD*</span>
                <input id="newPw" className="form-control signin-input" type="password"></input>
              </div>
              <div className='signin-input-area-title'>
                <span className='signin-input-title'>CONFIRM PASSWORD*</span>
                <input id="confPw" className="form-control signin-input" type="password"></input>
              </div>
              <span className='signin-input-title'>By registering your details you agree to our Terms and Conditions and privacy and cookie policy</span>
              <br></br>
              <div className='signin-input-area-title'>
                <button 
                onClick={() => this.props.signUp()}
                className="btn signin-btn-color btn-lg btn-block" type="submit">REGISTER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;