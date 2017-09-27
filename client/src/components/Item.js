import React, { Component } from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';


class Item extends Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      minimumNights: 7,
      daySize: 30,
    }
  }

  render() {
    {console.log('pass')}
    return (
      <div>
        <p> i'm here </p>
        <DateRangePicker
          daySize={this.state.daySize}
          minimumNights={this.state.minimumNights}
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
      </div>
    )
  }
}

export default Item;