import React, { Component } from 'react';

import { handleCallback } from '../utils/oidc';

export default class Callback extends Component {
  static async getInitialProps ({ req, res }) {
    if (res) {
      await handleCallback(req, res);
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
