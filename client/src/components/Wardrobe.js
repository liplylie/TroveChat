// This component will display logged user's items for rent
import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import Upload from './Upload';
import Loading from './Loading';
import WardrobeItem from './WardrobeItem';

class Wardrobe extends Component {

  openModal() {
    ModalManager.open(<Upload onRequestClose={() => true} passUser={this.props.passUser} />);
  }

  render() {
    return (
      <div>
        <div className='upload-btn-section'><button className="btn wardrobe-btn-color" type="button" onClick={this.openModal.bind(this)}> Add to Wardrobe </button> </div>
        <div className='row'>
          {this.props.passItems.map(item => 
            { if(item.rentee_id === this.props.passUser.id) {
              return <WardrobeItem passItem={item} key={item.id} /> }
            }
          ).reverse()}
        </div>
      </div>
    );
  }
}

export default Wardrobe;