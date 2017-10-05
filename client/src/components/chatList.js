import React, {Component} from 'react';
import ChatListLog from './ChatListLog'
import io from 'socket.io-client'

class ChatList extends Component{
  constructor(props){
    super(props)
    this.state = {
      text: [''],
    }
    this.handleChat = this.handleChat.bind(this);
  console.log(props, 'chatlist props')
  }

  componentDidMount(){
    this.socket = io.connect('http://localhost:3000');
    this.socket.on('chat message', this.handleChat);
  }

  handleChat(text){
    console.log(text , 'chat data from chatlist');
    this.setState({
       text: [...this.state.text, text]
    })
  }

 render(){
    return (
      <div > 
      here in ChatList
      {this.state.text.map((msg,i) => {
              return (<ChatListLog key={i} msg={msg.message} user={msg.user} sellerName={this.state.name} sellerEmail={this.state.sellerEmail}/>);
          })}
      </div>
    )
  }
};

export default ChatList;