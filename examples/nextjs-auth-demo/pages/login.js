
import React, { Component } from 'react';

import { handleLogin } from '../utils/oidc';

export default class Login extends Component {
  static async getInitialProps ({ req, res }) {
    if (res) {
      await handleLogin(req, res);
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
