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
    }
    this.roomID;
    this.handlePrivateRoom = this.handlePrivateRoom.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.joinChatWithUser = this.joinChatWithUser.bind(this);
    console.log(props, 'chatlist props')
  }

  componentDidMount(){
    this.socket = io.connect('http://localhost:3000');
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
      rooms: [...this.state.rooms, room]
    })  
    console.log(this.state.rooms, 'rooms bro')
  }

  joinChatWithUser(room){
    console.log(room, 'room')
    this.socket.emit('seller subscribe', room);
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


 render(){
    return (
      <div > 
      {"Chat"}
      {this.state.rooms.map((room,i) => {
        return (<div key={i} className="roomNames" onClick={()=>{this.joinChatWithUser(room)}} >{room}</div>);
      })}
      {this.state.text.map((msg,i) => {
        return (<ChatListLog key={i} msg={msg.message} user={msg.user} sellerName={this.state.name} sellerEmail={this.state.sellerEmail}/>);
      })}
      </div>
    )
  }
};

export default ChatList;