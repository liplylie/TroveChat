import React, { Component } from 'react';
import MenItem from './MenItem';

class Men extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      {this.props.passItems.map(item => 
        <MenItem passItem={item} key={item.id}/>
      )}
      </div>
    );
  }
}

export default Men;