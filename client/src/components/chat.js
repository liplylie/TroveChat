import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import ChatLog from './chatLog'

export default class Chat extends Component{
	constructor(props){
		super(props)
		console.log(props, 'chat props')
		this.state = {
			text: ['text']
		}
		this.message = '';
		this.chatMessage = this.chatMessage.bind(this);
		this.handleChat = this.handleChat.bind(this);
		this.handleText = this.handleText.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
	}

	  componentDidMount() {
    this.socket = io.connect('http://localhost:3000');
    this.socket.on('connection', console.log('connected on socket'));
    this.socket.on('chat message', this.chatMessage);
  }

  chatMessage(text) {
  	console.log(text, 'text')
    this.setState({
      text: [...this.state.text, text],
    });
  }

  handleChat() {
    const usermsg = {
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
    console.log('clicked send')
      document.getElementById('chatButton').click();
    }
  }

	render(){
		return(
			<div>
			Kobe: 
			{this.state.text.map((msg,i) => {
              return (<ChatLog key={i} msg={msg}/>);
          })}
			<div id="form">
          <input id="m" onChange={this.handleText} onKeyDown={this.handleEnterKey} />
          <button id ="chatButton"onClick={()=>{
            this.handleChat(); 
            }
          }>Send</button>
        </div>
			</div>
			)
	}
}