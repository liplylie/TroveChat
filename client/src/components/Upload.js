import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { WithContext as ReactTags } from 'react-tag-input';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tagsToPost: [],
      itemname: '',
      rentee_id: this.props.passUser.id,
      brand: '',
      price: 0.0,
      size: '',
      sex: '',
      image: '',
      status: 'Available'
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.parseThruTags = this.parseThruTags.bind(this);
  }

  parseThruTags() {
    const clone = this.state.tags.slice();
    for (let i = 0; i < clone.length; i++) {
      this.state.tagsToPost.push(clone[i].text);
    }
    return JSON.stringify(this.state.tagsToPost);
  }

  handleInput(prop, input) {
    this.state[prop] = input;
    // console.log(prop, ':', this.state[prop]);
  }

  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  }

  handleAddition(tag) {
      let tags = this.state.tags;
      tags.push({
          id: tags.length + 1,
          text: tag
      });
      this.setState({tags: tags});
  }

  handleDrag(tag, currPos, newPos) {
      let tags = this.state.tags;

      // mutate array
      tags.splice(currPos, 1);
      tags.splice(newPos, 0, tag);

      // re-render
      this.setState({ tags: tags });
  }

  handlePost() {
    axios.post('/api', {
      rentee_id: this.state.rentee_id,
      itemname: this.state.itemname,
      image: this.state.image,
      brand: this.state.brand,
      price: this.state.price,
      size: this.state.size,
      sex: this.state.sex,
      tag: this.parseThruTags(),
      status: this.state.status
    })
    .then(() => {
      console.log('Upload success');
    })
    .catch(err => {
      console.log('Upload err:', err);
    })
  }

  render(){
    const { text,onRequestClose } = this.props;
    const { tags, suggestions } = this.state;    
    const modalStyle = {
      overlay: {
        backgroundColor : 'transparent'
      },
      content: {
        margin: '10% auto',
        borderRadius: '6px',
        width: '500px'
      }
    }
    return (
       <Modal onRequestClose={onRequestClose} effect={Effect.SlideFromBottom} style={modalStyle} >
         <div className='upload-section'>
          <div className='upload-input'><input className='form-control' type="text" placeholder="Brand" ref="input" 
          onChange = { (e) => {this.handleInput('brand', e.target.value) }} />
          </div>
          <div className='input-group upload-input'><input className='form-control' type="text" placeholder="Item Name" ref="input" 
          onChange = { (e) => {this.handleInput('itemname', e.target.value) }}/>
          </div>
          <div className='input-group upload-input'><input className='form-control' type="text" placeholder="Retail Price" ref="input" 
          onChange = { (e) => {this.handleInput('price', parseFloat(e.target.value).toFixed(2)) }}/>
          </div>
          <div className='input-group upload-input'><input className='form-control' type="text" placeholder="Image URL" ref="input" 
          onChange = { (e) => {this.handleInput('image', e.target.value) }}/>
          </div>
          <div className='upload-input'>
            Size:
            <button className="btn btn-secondary btn-sm upload-btn" type="button"
            onClick = { () => {this.handleInput('size', 'Small') }}>S</button>
            <button className="btn btn-secondary btn-sm upload-btn" type="button"
            onClick = { () => {this.handleInput('size', 'Medium') }}>M</button>
            <button className="btn btn-secondary btn-sm upload-btn" type="button"
            onClick = { () => {this.handleInput('size', 'Large') }}>L</button>
          </div>
          <div className='upload-input'>
            Sex:
            <button className="btn btn-secondary btn-sm upload-btn" type="button"
            onClick = { () => {this.handleInput('sex', 'M') }}>M</button>
            <button className="btn btn-secondary btn-sm upload-btn" type="button"
            onClick = { () => {this.handleInput('sex', 'F') }}>F</button>
          </div>
          <div className='upload-input tag-input'>
            <ReactTags tags={tags}
                suggestions={suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag} />
          </div>
          <button className="btn wardrobe-btn-color"
          onClick={ () => { this.handlePost(); ModalManager.close(); }}>Upload</button>
        </div>
       </Modal>
    );
  }
}

// Tags

export default Upload;