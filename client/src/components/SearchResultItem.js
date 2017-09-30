import React, { Component } from 'react';
import Loading from './Loading';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class SearchResultItem extends Component {
  render() {
    return (
      <div className='col-md-3 wow fadeIn animated'>
        <Link to={{pathname: `/item/${this.props.passItem.id}`, params: {itemInfo: this.props.passItem, addToCart: this.props.addToCart}}}>
          <div className='list-section-wrap'>
            <div className='list-section-picture'>
                <img src={this.props.passItem.image} ></img>
            </div>
            <div className='list-info'>
              <div>
                {this.props.passItem.brand}
              </div>
              <div>
                {this.props.passItem.itemname}
              </div>
              <div>
                ${this.props.passItem.price}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default SearchResultItem;