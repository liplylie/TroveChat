import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

class Upload extends Component {
  render(){
    const { text,onRequestClose } = this.props;
    return (
       <Modal
          onRequestClose={onRequestClose}
          effect={Effect.SlideFromBottom}>
          <h1>What you input : {text}</h1>
          <button onClick={ModalManager.close}>Upload</button>
       </Modal>
    );
  }
}

export default Upload;