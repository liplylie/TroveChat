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
			name: "",
			sellerEmail: "",
		}
		this.message = '';
		this.chatMessage = this.chatMessage.bind(this);
		this.handleChat = this.handleChat.bind(this);
		this.handleText = this.handleText.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
		this.fetch = this.fetch.bind(this)
	}

	  componentDidMount() {
	  this.fetch();
    this.socket = io.connect('http://localhost:3000');
    this.socket.on('connection', console.log('connected on socket'));
    this.socket.on('chat message', this.chatMessage);
  }


	fetch() {
    axios.get(`/api/user/owner/${this.props.getThisUser}`)
    .then(user => {
    	console.log(user, 'user fetch')
      this.setState({ name: user.data.userName, sellerEmail: user.data.userEmail });
    })
    .catch(err => {
      console.log('User fetch err:', err);
    })
  }
  chatMessage(text) {
  	console.log(text, 'text')
    this.setState({
      text: [...this.state.text, text],
    });
  }

  handleChat() {
    const usermsg = {
    	user: this.props.user,
      message: this.message,
    };
    this.socket.emit('chat message', usermsg);
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

	render(){
		return(
			<div>
			{this.state.name} 
			{this.state.text.map((msg,i) => {
              return (<ChatLog key={i} msg={msg.message} user={msg.user} sellerName={this.state.name} sellerEmail={this.state.sellerEmail}/>);
          })}
			<div id="form">
          <input id="m" onChange={this.handleText} onKeyDown={this.handleEnterKey} />
          <button id ="chatButton"onClick={()=>{
            this.handleChat(); 
            }
          }>Send</button>
        </div>
        Send {this.state.name} an email at <a href={`mailto:${this.state.sellerEmail}`}> {this.state.sellerEmail}</a>
			</div>
			)
	}
}