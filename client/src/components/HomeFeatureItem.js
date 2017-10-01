import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class HomeFeatureItem extends Component {
  render() {
    return (
      <div className='col-md-4 wow fadeIn animated'>
        <Link to={{pathname: `/item/${this.props.featureItem.id}`, params: {itemInfo: this.props.featureItem, addToCart: this.props.addToCart, checkUser: this.props.checkUser}}}>
          <div className='feature-section-wrap'>
            <div className='feature-section-picture'>
              <img src={this.props.featureItem.image}></img>
            </div>
            <div className='feature-info'>
              <div>
                {this.props.featureItem.brand}
              </div>
              <div>
                {this.props.featureItem.itemname}
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default HomeFeatureItem;