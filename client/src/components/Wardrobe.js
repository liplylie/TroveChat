// This component will display logged user's items for rent
import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import Upload from './Upload';

class Wardrobe extends Component {

  openModal() {
    const text = this.refs.input.value;
    ModalManager.open(<Upload text={text} onRequestClose={() => true}/>);
  }

  render() {
    return (
      <div>
        <div><input type="text" placeholder="input something" ref="input" /></div>
        <div><button type="button" onClick={this.openModal.bind(this)}>Upload </button> </div>
      </div>
    );
  }
}


export default Wardrobe;