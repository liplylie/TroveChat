// This component will display logged user's items for rent
import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import Upload from './Upload';
import Loading from './Loading';

class Wardrobe extends Component {

  openModal() {
    ModalManager.open(<Upload onRequestClose={() => true} passUser={this.props.passUser} />);
  }

  render() {
    return (
      <div>
        {this.props.passItems.map(item => 
          { if(item.rentee_id === this.props.passUser.id) {
            return <div className="single-item" key={item.id}>{item.itemname}</div> }
          }
        )}
        <div><button className="btn wardrobe-btn-color" type="button" onClick={this.openModal.bind(this)}>Upload </button> </div>
      </div>
    );
  }
}


export default Wardrobe;