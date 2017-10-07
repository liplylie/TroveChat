import React from 'react';

const ChatListLog = (props) => {

  console.log(props, 'chatListlog props bro')
  if (!props.msg){
    return (
    <div className = "userChatLog"> 
    </div>
    );
  } else if (props.self === props.user){
    return (
      <div style={{flex: 1, margin: 2, maxWidth: 400}}> 
        <div className="msj macro" style={{margin: 'auto'}}>  
          <div className="text text-l">
            <p style={{fontWeight: 'bold', textDecoration: 'underline'}} > {props.user}</p>
            <p >{props.msg}</p>
          </div>
        </div>
      </div>
    );
  } else if (props.self !== props.user){
    return (
      <div style={{flex: 1, margin: 2, maxWidth: 400}}> 
        <div className="msj-rta macro" style={{margin: 'auto'}}>  
          <div className="text text-r" style={{background: "whitesmoke !important"}}>
            <div className="text text-r">
              <p style={{fontWeight: 'bold', textDecoration: 'underline'}} > {props.user}</p>
              <p >{props.msg}</p>
            </div>
          </div> 
        </div>
      </div>
    );
  }
};

export default ChatListLog;