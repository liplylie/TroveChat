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
        {!this.props.passItems ? <Loading /> : this.props.passItems.map(item => 
          { if(item.rentee_id === this.props.passUser.id) {
            return <div key={item.id}>{item.itemname}</div> }
          }
        )}
        <div><button type="button" onClick={this.openModal.bind(this)}>Upload </button> </div>
      </div>
    );
  }
}


export default Wardrobe;