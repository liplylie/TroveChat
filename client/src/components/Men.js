import React, { Component } from 'react';
import MenItem from './MenItem';
import Loading from './Loading';

class Men extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='list-section'>
        <div className='list-section-title'>
          <span>MEN</span>
        </div>
        <div className='row'>
          {!this.props.passItems ? <Loading /> : this.props.passItems.map(item => 
            { if(item.sex === 'M') {
              return <MenItem 
              passItem={item} 
              addToCart={this.props.addToCart} 
              checkUser={this.props.checkUser}
              key={item.id} />}
            }
          ).reverse()}
        </div>
      </div>
    );
  }
}

export default Men;