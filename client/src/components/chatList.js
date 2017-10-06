import React, {Component} from 'react';
import ChatListLog from './ChatListLog';
import io from 'socket.io-client';

class ChatList extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: [''],
      start: '',
      rooms: [''],
      chatStatus: 'no Chats',
    }
    this.roomID;
    this.handlePrivateRoom = this.handlePrivateRoom.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.joinChatWithUser = this.joinChatWithUser.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
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
      chatStatus: 'chats from: '

    })  
    console.log(this.state.rooms, 'rooms bro')
  }

  joinChatWithUser(room){
    console.log(room, 'room single')
    console.log(this.roomID, 'joinChatWithUser room')
    this.socket.emit('seller subscribe', this.roomID);
    alert(`chat opened with ${room}`)
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
          {this.state.chatStatus}
          {this.state.rooms.map((room,i) => {
            return (<div key={i} className="roomNames" onClick={()=>{this.joinChatWithUser(room)}} >{room}</div>);
          })}
          {this.state.text.map((msg,i) => {
            return (<ChatListLog key={i} msg={msg.message} user={msg.user} sellerName={this.state.name} sellerEmail={this.state.sellerEmail}/>);
          })}
          <div id="form">
            <input id="m" onChange={this.handleText} onKeyDown={this.handleEnterKey} />
            <button id ="chatButton"onClick={()=>{this.handleChat()}}>Send</button>
          </div>
        </div>
      )    
    } 
};

export default ChatList;