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
    return (
       <Modal
          onRequestClose={onRequestClose}
          effect={Effect.SlideFromBottom}>
          <div><input type="text" placeholder="Brand" ref="input" 
          onChange = { (e) => {this.handleInput('brand', e.target.value) }} />
          </div>
          <div><input type="text" placeholder="Item Name" ref="input" 
          onChange = { (e) => {this.handleInput('itemname', e.target.value) }}/>
          </div>
          <div><input type="text" placeholder="Retail Price" ref="input" 
          onChange = { (e) => {this.handleInput('price', parseFloat(e.target.value).toFixed(2)) }}/>
          </div>
          <div>
            Size:
            <button type="button"
            onClick = { () => {this.handleInput('size', 'Small') }}>S</button>
            <button type="button"
            onClick = { () => {this.handleInput('size', 'Medium') }}>M</button>
            <button type="button"
            onClick = { () => {this.handleInput('size', 'Large') }}>L</button>
          </div>
          <div>
            Sex:
            <button type="button"
            onClick = { () => {this.handleInput('sex', 'M') }}>M</button>
            <button type="button"
            onClick = { () => {this.handleInput('sex', 'F') }}>F</button>
          </div>
          <div>
            <ReactTags tags={tags}
                suggestions={suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag} />
          </div>
          <button
          onClick={ () => { this.handlePost(); ModalManager.close(); }}>Upload</button>
       </Modal>
    );
  }
}

// Tags

export default Upload;