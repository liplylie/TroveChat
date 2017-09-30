import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

class Scroll extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Scrollbars style={{ width: 460, height: 350, top: '10px', left: '10px' }}>
          {this.props.children}
        </Scrollbars>
      </div>
    )
  }
}

export default Scroll;
