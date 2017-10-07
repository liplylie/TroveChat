import React from 'react';

const ChatListLog = (props) => {

  console.log(props, 'chatlog props bro')
  if (!props.msg){
    return (
      <div className = "userChatLog"> 
      </div>
    );
  } else {
    return (
      <div className = "userChatLog"> 
        <p className="chatMessage" > 
          {`${props.user}: ${props.msg}`}
        </p>
      </div>
    );
  }
};

export default ChatListLog;