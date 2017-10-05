import React, {Component} from 'react';
import ChatListLog from './ChatListLog'
import io from 'socket.io-client'

class ChatList extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: [''],
      message: '',
    }
    this.roomID;
    this.chatMessage = this.chatMessage.bind(this);
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

  chatMessage(text){
    console.log(text , 'chat data from chatlist');
    this.setState({
       text: [...this.state.text, text]
    })
  }

  handlePrivateRoom(room){
    console.log(room, 'room bro')
    this.roomID = room;
    this.setState({
      message: `chat with ${this.roomID}`
    })  
  }

  joinChatWithUser(e){
    console.log(e.target.innerHTML, 'roomName')
    let roomName = e.target.innerHTML.split(" ")[2];
    console.log(roomName, ' look here bro')
    this.socket.emit('subscribe', roomName);
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
      <div className="roomNames" onClick={this.joinChatWithUser} >{this.state.message}</div>
      {this.state.text.map((msg,i) => {
              return (<ChatListLog key={i} msg={msg.message} user={msg.user} sellerName={this.state.name} sellerEmail={this.state.sellerEmail}/>);
          })}
      </div>
    )
  }
};

export default ChatList;