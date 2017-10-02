import React, { Component } from 'react';

class UserWardrobeItem extends Component {
  render() {
    return (
      <div className='col-md-3 wow fadeIn animated'>
        <div className='list-section-wrap'>
          <div className='list-section-picture'>
              <img src={this.props.passItem.image} ></img>
          </div>
          <div className='list-info'>
            <div>
              {this.props.passItem.brand}
            </div>
            <div className='list-item-name'>
                {this.props.passItem.itemname}
              </div>
             <div>
                <span className='list-price-retail line-through'> ${this.props.passItem.price} </span>
                <span className='list-price-rental'> ${Math.floor(this.props.passItem.price * 0.07)} </span>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserWardrobeItem;