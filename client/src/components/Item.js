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

  componentWillMount() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "path/to/instafeed.min.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <img src={this.state.itemInfo.image} width="400" />
        <div>
          <span> {this.state.itemInfo.brand} </span>
        </div>
        <div onClick={() => this.props.location.params.addToCart(this.state.itemInfo)}>
          <span> {this.state.itemInfo.itemname} </span>
        </div>
        <div>
          <span> {this.state.itemInfo.size} </span>
        </div>
        <div>
          <span> {this.state.itemInfo.price} </span>
        </div>
        
        {/* get user's id in here too */}

        <DateRangePicker
          daySize={this.state.daySize}
          minimumNights={this.state.minimumNights}
          startDate={this.state.startDate} 
          endDate={this.state.endDate} 
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} 
          focusedInput={this.state.focusedInput} 
          onFocusChange={focusedInput => this.setState({ focusedInput })} 
          />
        <div>
          {/* make this look pretty */}
          <span> {this.state.itemInfo.tag} </span> 
        </div>
        <div>
          <button type="button">Rent</button>
        </div>
        <div id="instafeed"></div>
      </div>
    )
  }
}

export default Item;