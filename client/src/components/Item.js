import React, { Component } from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      minimumNights: 7,
      daySize: 30,
      itemInfo: this.props.location.params.itemInfo,
      userInfo: this.props.location.params.checkUser,
      owner: '',
      blockedDates: []
    }
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchDates();
    this.fetchUser();
    this.state.userInfo(this.state.itemInfo.rentee_id);
  }

  fetchUser() {
    axios.get(`/api/user/owner/${this.state.itemInfo.rentee_id}`)
    .then(user => {
      this.setState({ owner: user.data.userName });
    })
    .catch(err => {
      console.log('User fetch err:', err);
    })
  }
  
  fetchDates() {
    var blockedDates = [];
    axios.get(`/api/renttrx/item/${this.state.itemInfo.id}`)
    .then(({data}) => data.forEach(item => {
    //   console.log('items', item)
    // }))
      blockedDates.push(item.startDate);
      blockedDates.push(item.endDate);
    }))
    .then(() => {
      this.setState({
        blockedDates: blockedDates
      })
    })
    .catch(err => {
      console.log('an error occured', err);
    })
  }

  render() {
    let allTags = JSON.parse(this.state.itemInfo.tag);
    
    let tags = allTags.map((tag, i) => {
      return (
        <li key={i}><a href="#"> {tag} </a></li>
      )
    });

    let badDates = this.state.blockedDates;
    const isDayBlocked = function(day) {
      for (var i = 0; i < badDates.length; i += 2) {
        if (moment(day).isBetween(badDates[i], badDates[i + 1], 'day', '[]')) {
          return true;
        }
      }
      return false;
    }

    return (
        <div className='row'>
          <div className='col-md-5 item-image-section'>
            <img src={this.state.itemInfo.image} />
          </div>
          <div className='col-md-5 item-info-section'>
            <div className='item-brand'>
              <span> {this.state.itemInfo.brand} </span>
            </div>
            <div className='item-title'>
              <span> {this.state.itemInfo.itemname} </span>
            </div>
            <Link className='item-user' to='/userwardrobe'>
              By: {this.state.owner}
            </Link>
            <hr className="col-md-12"></hr>
            <div className='item-price'>
              <span className='line-through list-price-retail'> ${this.state.itemInfo.price} </span>
              <span> ${Math.floor(this.state.itemInfo.price * 0.07)} </span>
            </div>
            <div className='item-size'>
              <span> {this.state.itemInfo.size} </span>
            </div>
            
            <div className='item-calendar'>
              <DateRangePicker
                isDayBlocked={isDayBlocked}
                daySize={this.state.daySize}
                minimumNights={this.state.minimumNights}
                startDate={this.state.startDate} 
                endDate={this.state.endDate} 
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} 
                focusedInput={this.state.focusedInput} 
                onFocusChange={focusedInput => this.setState({ focusedInput })} 
                />
            </div>
            <ul className='item-tags'>
              {/* make this look pretty */}
              {tags} 
            </ul>
            <div className='item-btn'>
              <button className='btn btn-block item-btn-color' onClick={() => this.props.location.params.addToCart(this.state.itemInfo, this.state.startDate, this.state.endDate)} type="button">Add to Cart</button>
            </div>
          </div>
        </div>
    )
  }
}

export default Item;