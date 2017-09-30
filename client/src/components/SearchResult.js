import React, { Component } from 'react';
import SearchResultItem from './SearchResultItem';

class SearchResult extends Component {
  render() {
    return (
      <div className='list-section'>
        <div className='row'>
          {this.props.passRes.map(item => 
              <SearchResultItem passItem={item} addToCart={this.props.addToCart} key={item.id} />
          ).reverse()}
        </div>
      </div>
    );
  }
}

export default SearchResult;