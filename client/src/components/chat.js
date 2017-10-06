import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import ChatLog from './chatLog';
import axios from 'axios'

export default class Chat extends Component{
	constructor(props){
		super(props)
		console.log(props, 'chat props')
		this.state = {
			text: [''],
			name: '',
			sellerEmail: '',
			onlineStatus: 'is offline',
		}
		this.message = '';
		this.roomID;
		this.handleChat = this.handleChat.bind(this);
		this.handleText = this.handleText.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
		this.changeOnlineStatus = this.changeOnlineStatus.bind(this);
		this.fetch = this.fetch.bind(this)
	}

	 componentDidMount() {
	  this.fetch();
    this.socket = io.connect('http://localhost:3000');
 		this.roomID = this.props.email;
    this.socket.emit('subscribe', this.roomID);
    var context = this;
    this.socket.on('seller joined', this.changeOnlineStatus)
    this.socket.on('conversation private post', function(text) {
    	context.setState({
      	text: [...context.state.text, text],
			});
    });
  }

	fetch() {
    axios.get(`/api/user/owner/${this.props.getThisUser}`)
    .then(user => {
    	console.log(user, 'user fetch')
      this.setState({
        name: user.data.userName, 
      	sellerEmail: user.data.userEmail 
      });
    })
    .catch(err => {
      console.log('User fetch err:', err);
    })
  }

  handleChat() {
    const usermsg = {
    	user: this.props.user,
      message: this.message,
      room: this.roomID,
    };
    this.socket.emit('send message', usermsg);
    document.getElementById('m').value = null;
  }

  handleText(e) {
  	console.log(e.target.value)
    this.message = e.target.value;
  }

  handleEnterKey(event){
    if (event.keyCode === 13){
      document.getElementById('chatButton').click();
    }
  }

  changeOnlineStatus(){
  	this.setState({
  		onlineStatus: 'is online',
  	})
  }

	render(){
		return(
			<div>
			<div>{this.state.name} {this.state.onlineStatus}</div>
			{this.state.text.map((msg,i) => {
              return (<ChatLog key={i} msg={msg.message} user={msg.user} sellerName={this.state.name} sellerEmail={this.state.sellerEmail}/>);
          })}
			  <div id="form">
          <input id="m" onChange={this.handleText} onKeyDown={this.handleEnterKey} />
          <button id ="chatButton"onClick={()=>{this.handleChat()}}>Send</button>
        </div>
        Send {this.state.name} an email at <a href={`mailto:${this.state.sellerEmail}`}> {this.state.sellerEmail}</a>
			</div>
			)
	}
}