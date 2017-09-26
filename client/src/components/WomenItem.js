import React, { Component } from 'react';

class WomenItem extends Component {
  render() {
    return (
      <div>
        {!this.props.passItem ? null : this.props.passItem.sex === 'F' ?
        this.props.passItem.itemname : null }
      </div>
    );
  }
}


export default WomenItem;