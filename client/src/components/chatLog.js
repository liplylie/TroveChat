import React from 'react';

const Chatlog = (props) => {


  if (props.msg === ""){
    return (
    <div className = "userChatLog"> 
    </div>
  );
  } else {
    return (
      <div className = "userChatLog"> 
        <div>
          <img className="userPhoto" />
        </div> 
        <p className="chatMessage" > 
          <span className="userInChat"> 
          </span> 
          {`${props.user}: ${props.msg}`}
        </p>
      </div>
    );
  }
};

export default Chatlog;