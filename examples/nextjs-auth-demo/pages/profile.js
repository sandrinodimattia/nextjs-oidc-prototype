
import React, { Component } from 'react';
import { getSession } from '../utils/oidc';

export default class Profile extends Component {
  static async getInitialProps ({ req, res }) {
    if (req) {
      const session = await getSession(req);
      if (!session) {
        res.writeHead(302, {
          Location: `/login`
        });      
        res.end();
        return;
      }

      return {
        session
      }
    }
  }

  render () {
    return (
      <div>
        <h1>Profile (server rendered)</h1>
        <pre>{JSON.stringify(this.props.session, null, 2)}</pre>
      </div>
    )
  }
}
