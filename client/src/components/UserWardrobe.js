import React, { Component } from 'react';
import Chat from './chat.js'
import UserWardrobeItem from './UserWardrobeItem';
import axios from 'axios';
import { NavLink, Route, Link } from 'react-router-dom';

class UserWardrobe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.fetch = this.fetch.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    axios.get(`/api/user/owner/${this.props.getThisUser}`)
    .then(user => {
      this.setState({ name: user.data.userName });
    })
    .catch(err => {
      console.log('User fetch err:', err);
    })
  }

  handleClick(){
    console.log('here')
  }

  render() {
    return (
      <div className='list-section'>
      <div className='list-section-title'>
          <span>{this.state.name}</span>
          <Link to="/chat">
            <button id="startChat" onClick={()=>{this.handleClick()}} > message: {this.state.name}</button>
          </Link>
        </div>
        <div className='row'>
          {this.props.passItems.map(item => 
            {if(item.rentee_id === this.props.getThisUser) {
              return <UserWardrobeItem passItem={item} key={item.id} /> }
            }
          ).reverse()}
        </div>
      </div>
    );
  }
}

export default UserWardrobe;