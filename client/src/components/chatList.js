import React, {Component} from 'react';
import ChatListLog from './ChatListLog';
import io from 'socket.io-client';
import axios from 'axios'

class ChatList extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: [''],
      start: '',
      rooms: [''],
      chatStatus: 'No Chats',
    }
    this.roomID;
    this.handlePrivateRoom = this.handlePrivateRoom.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.joinChatWithUser = this.joinChatWithUser.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.handleSavedMessages = this.handleSavedMessages.bind(this);
    console.log(props, 'chatlist props')
  }

  componentDidMount(){
    this.socket = io.connect('http://localhost:3000');
    this.socket.emit('seller name', this.props.sqlUser.userName)
    this.socket.on('private room', this.handlePrivateRoom);
    var context = this;
    this.socket.on('conversation private post', function(text) {
      console.log(text, 'text from private')
      context.setState({
        text: [...context.state.text, text],
      });
    });
  }


  handlePrivateRoom(room){
    console.log(room, 'room bro')
    this.roomID = room;
    this.setState({
      rooms: [...this.state.rooms, room.split(" ")[0]],
      chatStatus: 'Chats From: '

    })  
    console.log(this.state.rooms, 'rooms bro')
  }

  joinChatWithUser(room){
    console.log(room, 'room single')
    console.log(this.roomID, 'joinChatWithUser room')
    this.socket.emit('seller subscribe', this.roomID);
    alert(`chat opened with ${room}`)
    this.socket.on('seller saved messages', this.handleSavedMessages)
  }

  handleChat() {
    const usermsg = {
      user: this.props.sqlUser.userName,
      message: this.message,
      room: this.roomID,
    };
   
    this.socket.emit('send message', usermsg);
    document.getElementById('m').value = null;
  }

  handleSavedMessages(messages){
    console.log(messages,'saved messages')
    let text = {user: messages.sentBy, message: messages.message}
    console.log(text, 'text from saved')
    this.setState({
      text: [...this.state.text, text],
    })
  }


  handleEnterKey(event){
    if (event.keyCode === 13){
      document.getElementById('chatButton').click();
    }
  }

  handleText(e) {
    console.log(e.target.value)
    this.message = e.target.value;
  }


 render(){
      return (
        <div > 
          <span className={"chat-status"}>{this.state.chatStatus}</span>
          {this.state.rooms.map((room,i) => {
            return (<div key={i} className="roomNames" onClick={()=>{this.joinChatWithUser(room)}} >{room}</div>);
          })}
          <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#cdb287', maxWidth:'400'}}>
          {this.state.text.map((msg,i) => {
            return (<ChatListLog key={i} self={this.props.sqlUser.userName} msg={msg.message} user={msg.user} sellerName={this.state.name} sellerEmail={this.state.sellerEmail}/>);
          })}
          </div>
          <div style={{minWidth:400, marginTop: 5}} >
          <div id="form">
            <input id="m" style={{minWidth:335}} onChange={this.handleText} onKeyDown={this.handleEnterKey} />
            <button className="btn item-btn-color" onClick={()=>{this.handleChat()}}>Send</button>
          </div>
          </div>
        </div>
      )    
    } 
};

export default ChatList;