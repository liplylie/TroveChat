// This component will display logged user's history of rented items
import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import ArchiveItem from './ArchiveItem';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRentedTrx: [],
      allRentedItems: []
    }
    this.fetchTrx = this.fetchTrx.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
  }

  componentDidMount() {
    this.fetchTrx(this.fetchItems);
      // .then(() => {
      // })
  }

  //Fetch all current user's rented trx
  fetchTrx(cb) {
    let currRentedTrx = this.state.userRentedTrx;
    axios.get(`/api/renttrx/renter/${this.props.sqlUser.id}`)
      .then(({data}) => {
        console.log('this is data: ', data)
        data.forEach(trx => {
          currRentedTrx.push(trx);
        })
      })
      .then(() => {
        this.setState({
          userRentedTrx: currRentedTrx
        }, cb())
      })

      .catch(err => console.log('err in adding rented items ', err));
  }

  //Fetch all items current user has rented
  fetchItems() {
    let userTrx = this.state.userRentedTrx;
    let currRentedItems = this.state.allRentedItems;

    userTrx.forEach(trx => {
      let itemId = trx.item_id;
      axios.get(`/api/item/${itemId}`)
        .then(({data}) => {
          console.log('THIS IS DATA: ', data)
          data.forEach(item => {
            item.startDate = trx.startDate;
            item.endDate = trx.endDate;
            console.log('THIS IS ITEM: ', item)
            currRentedItems.push(item)
          })
          this.setState({
            allRentedItems: currRentedItems
          })
        })
    })
  }


  render() {
    console.log('this is state in archive', this.state)
    // console.log('in archive page, ', this.props.sqlUser)
    return (
      <div>
        <div className='row'>
          {this.state.allRentedItems.map(item => 
            <ArchiveItem passItem={item} key={item.id} /> 
          ).reverse()}
        </div>
      </div>
    );
  }
}

export default Archive;