import React, { Component } from 'react';
import WomenItem from './WomenItem';

class Women extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      {this.props.passItems.map(item => 
        <WomenItem passItem={item} key={item.id}/>
      )}
      </div>
    );
  }
}

export default Women;