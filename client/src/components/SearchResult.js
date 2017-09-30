import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class SearchResult extends Component {
  render() {
    return (
      <div>
        {this.props.passRes.length === 0 ? <div>No search results found</div> :
        this.props.passRes.map(item =>
        <div className="single-item" key={item.id}>{item.itemname}</div> )}
      </div>
    );
  }
}

export default SearchResult;