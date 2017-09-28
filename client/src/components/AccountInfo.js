import React, { Component } from 'react';

class AccountInfo extends Component {
  render() {
    return (
      <div>
        <div className='account-info-title'>
          <span>
            Hello {this.props.sqlUser.userName}
          </span>
        </div>
        <br/>
        <div className='account-info-description'>
          <span>
            From your My Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select link below to view or edit information.
          </span>
        </div>
        <br/>
        <div className='account-section-title'>
          <span>
            Account information
          </span>
        </div>
        <div className='account-info'>
          <div>
            <span>
              {this.props.sqlUser.userName}
            </span>
          </div>
          <div>
            <span>
              {this.props.sqlUser.userEmail}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountInfo;