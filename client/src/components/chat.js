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
			sellerName: '',
			sellerEmail: '',
			onlineStatus: 'is offline',
			chatStatusColor: 'chatStatusColorRed',
		}
		this.message = '';
		this.roomID;
		this.handleChat = this.handleChat.bind(this);
		this.handleText = this.handleText.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
		this.changeOnlineStatus = this.changeOnlineStatus.bind(this);
    this.handleSavedMessages = this.handleSavedMessages.bind(this);
		this.fetch = this.fetch.bind(this)
	}

	 componentDidMount() {
	  this.fetch();
    this.socket = io.connect('http://localhost:3000');
 		this.roomID = this.props.email;
    this.socket.on('saved messages', this.handleSavedMessages)
    this.socket.on('seller joined', this.changeOnlineStatus);
    var context = this;
    this.socket.on('conversation private post', function(text) {
    	console.log(text, 'text from private chat')
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
        sellerName: user.data.userName, 
      	sellerEmail: user.data.userEmail 
      });
     	this.subscribeEmit = {roomID:`${this.roomID} ${this.state.sellerEmail}`, sellerName: `${this.state.sellerName}`};
    	this.socket.emit('subscribe', this.subscribeEmit);
    	this.socket.emit('confirm seller', this.state.sellerName);
    })
    .catch(err => {
      console.log('User fetch err:', err);
    })
  }

  handleSavedMessages(messages){
    console.log(messages,'saved messages')
    let text = {user: messages.sentBy, message: messages.message}
    console.log(text, 'text from saved')
    this.setState({
      text: [...this.state.text, text],
    })
  }

  handleChat() {
    const usermsg = {
    	user: this.props.user,
      message: this.message,
      room: this.subscribeEmit.roomID,
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
  		chatStatusColor: 'chatStatusColorBlue',
  	})
  }

	render(){
		return(
			<div>
			<div className={this.state.chatStatusColor}>{this.state.sellerName} {this.state.onlineStatus}</div>
      <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#cdb287', maxWidth:'400'}}>
			{this.state.text.map((msg,i) => {
              return (<ChatLog key={i} self={this.props.user} msg={msg.message} user={msg.user} sellerName={this.state.sellerName} sellerEmail={this.state.sellerEmail}/>);
          })}
      </div>
      <div style={{minWidth:400, marginTop: 5}}>
			  <div id="form">
          <input id="m" style={{minWidth:335}} onChange={this.handleText} onKeyDown={this.handleEnterKey} />
          <button className="btn item-btn-color" onClick={()=>{this.handleChat()}}>Send</button>
        </div>
        </div>
        Send {this.state.sellerName} an email at <a href={`mailto:${this.state.sellerEmail}`}> {this.state.sellerEmail}</a>
			</div>
			)
	}
}