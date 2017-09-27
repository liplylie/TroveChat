import React, { Component } from 'react';
import Loading from './Loading';
import { BrowserRouter, Route, Link } from 'react-router-dom';


class MenItem extends Component {
  constructor() {
    super();
    this.itemClickHandler = this.itemClickHandler.bind(this);
  }

  itemClickHandler(item) {
    {console.log(`/item/${item.id}`)}
    <Link to={`/item/${item.id}`} />
  }

  render() {
    return (
      <div className='col-md-3 wow fadeIn animated'>
        <div className='list-section-wrap'>
          <div className='list-section-picture'>
            <img src={this.props.passItem.image} onClick={() => this.itemClickHandler(this.props.passItem)} ></img>
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
      </div>
    )
  }
}


export default MenItem;