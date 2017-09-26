import React, { Component } from 'react';
import MenItem from './MenItem'

class Men extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maleItems: []
    }
  }

  // componentDidMount() {
  //   this.filterItems();
  // }

  // filterItems() {
  //   this.state.maleItems = this.props.passItems.filter(item => {
  //     return item.sex === 'M';
  //   });
  // }

  render() {
    return (
      <div>
        {!this.props.passItems.length > 0 ? null :
        this.props.passItems.map(item => 
        <MenItem />
        )}
      </div>
    );
  }
}

export default Men;