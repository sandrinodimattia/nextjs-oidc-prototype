# OpenID Connect for Next.js

```
npm install
npm run build
```

Then to run the demo:

```
cd examples/nextjs-auth-demo
npm install
npm run dev
```

Note: This project currently contains the credentials of my test tenant in Auth0.

## How it works

First you'll initialize the OIDC plugin and export it:

```js
import NextOidc from '@auth0/nextjs-oidc';

module.exports = NextOidc({
  // audience: 'https://api.something.com', (optional, only needed when you proxy to a remote api)
  clientId: 'BP4Pgl2aqs7diQ6ARkiAAH6bAeYjMJv6',
  clientSecret: 'P8WDmH4XyumzkTCx...',
  scope: 'openid profile',
  domain: 'sandrino-nextjs.auth0.com',
  redirectUri: 'http://localhost:3000/api/callback',
  postLogoutRedirectUri: 'http://localhost:3000/',
  session: {
    cookieSecret: 'viloxyf_z2GW6K4CT-KQD_MoLEA2wqv5jWu...'
  }
});
```

Then you create 3 pages under pages which invoke the handlers from the plugin, eg:

```js
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
```

By creating your own page you can implement your own error handlers when the login fails. That's it.

Now create the necessary buttons in your application. Make sure to use `<a>` instead of `<Link>`, you want this to be rendered on the server:

```js
 <a href={"/api/login"}>
    <button>Login</button>
  </a>
  <a href={"/api/logout"}>
    <button>Logout</button>
  </a>
```

And finally you can now read the session when necessary and use it when rendering pages on the server:

```js
import React, { Component } from 'react';
import { getSession } from '../utils/oidc';

export default class Home extends Component {
 static async getInitialProps ({ req }) {
    if (req) {
      return {
        session: await getSession(req)
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
```

If you're caching pages on the server side and you want to render the dynamic content on the client side you can make use of API Routes:

```js
import { getSession } from '../../utils/oidc';

export default async function handle(req, res) {
  const session = await getSession(req);
  res.json(session);
}
```

These can then be called on the client side to update the page:

```js
async componentDidMount() {
  const res = await fetch('/api/me');
  if (res.ok) {
    this.setState({
      session: await res.json()
    })
  }
}
```
