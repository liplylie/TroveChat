import React from 'react';

const Chatlog = (props) => {
  

  return (
    <div className = "userChatLog"> 
      <div>
        <img className="userPhoto" />
      </div> 
      <p className="chatMessage" > 
        <span className="userInChat"> 
        </span> 
        {" "} {props.msg}
      </p>
    </div>
  );
};

export default Chatlog;