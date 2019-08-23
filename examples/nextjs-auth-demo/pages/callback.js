import React, { Component } from 'react';

import { handleCallback } from '../utils/oidc';

export default class Callback extends Component {
  static async getInitialProps (ctx) {
    if (ctx.res) {
      await handleCallback(ctx);
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
