import React, { Component } from 'react';
import Loading from './Loading';

class HomeFeatureItem extends Component {
  render() {
    return (
      <div className='col-md-4 wow fadeIn animated'>
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
      </div>
    )
  }
}

export default HomeFeatureItem;