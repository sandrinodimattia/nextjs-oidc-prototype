
import React, { Component } from 'react';

import { handleLogin } from '../utils/oidc';

export default class Login extends Component {
  static async getInitialProps (ctx) {
    if (ctx.res) {
      await handleLogin(ctx);
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
