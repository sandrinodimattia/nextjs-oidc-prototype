
import React, { Component } from 'react';
import { getSession } from '../utils/oidc';

export default class Home extends Component {
  static async getInitialProps (ctx) {
    if (ctx.req) {
      return {
        session: await getSession(ctx)
      }
    }
  }

  renderUser() {
    console.log(this.props.session);
    if (!this.props.session) {
      return <div />;
    }

    return <div>
      <p>Subject: {this.props.session.sub}</p>
      <p>Email: {this.props.session.email}</p>
      <p>Name: {this.props.session.name}</p>
      <p>Access Token: {this.props.session.accessToken}</p>
    </div>
  }

  render () {
    return (
      <div>
        <p>Hello Next.js</p>
        <a href={"/login"}>
          <button>Login</button>
        </a>
        <a href={"/logout"}>
          <button>Logout</button>
        </a>
        {this.renderUser()}
      </div>
    )
  }
}
