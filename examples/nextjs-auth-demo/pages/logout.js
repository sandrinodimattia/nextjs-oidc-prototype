import React, { Component } from 'react';

import { handleLogout } from '../utils/oidc';

export default class Logout extends Component {
  static async getInitialProps ({ req, res }) {
    if (res) {
      await handleLogout(req, res);
    }
  }

  render () {
    return (
      <div>
      <p>You can implement your custom error handler here!</p>
      </div>
    )
  }
}
