import React, { Component } from 'react';

import oid from '../utils/oidc';

export default class Callback extends Component {
  static async getInitialProps ({ req, res }) {
    if (res) {
      await oid.handleCallback(req, res, { redirectTo: '/' });
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
