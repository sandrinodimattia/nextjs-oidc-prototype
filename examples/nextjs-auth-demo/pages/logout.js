import React, { Component } from 'react';

import { handleLogout } from '../utils/oidc';

export default class Logout extends Component {
  static async getInitialProps (ctx) {
    if (ctx.res) {
      await handleLogout(ctx);
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
