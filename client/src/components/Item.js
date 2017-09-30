import React, { Component } from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      minimumNights: 7,
      daySize: 30,
      itemInfo: this.props.location.params.itemInfo
    }
  }

  render() {
    let allTags = JSON.parse(this.state.itemInfo.tag);
    
    let tags = allTags.map((tag, i) => {
      return (
        <li key={i}><a href="#"> {tag} </a></li>
      )
    });

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
            <hr className="col-md-12"></hr>
            <div className='item-price'>
              <span> ${this.state.itemInfo.price} </span>
            </div>
            <div className='item-size'>
              <span> {this.state.itemInfo.size} </span>
            </div>
            
            {/* get user's id in here too */}
            <div className='item-calendar'>
              <DateRangePicker
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