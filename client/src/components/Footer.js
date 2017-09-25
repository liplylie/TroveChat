import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className='footer bg-black'>
        <div className='row'>
          <div className='col-md-2'>
            <span className='bg-logo'>TROVE</span>
          </div>
        </div>
        This is footer
      </div>
    );
  }
}

export default Footer;