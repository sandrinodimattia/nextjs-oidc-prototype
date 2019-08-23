import base64url from 'base64url';
import { randomBytes } from 'crypto';
import { NextPageContext } from 'next';
import React, { Component } from 'react';
import { parseCookies, setCookie } from 'nookies';

import { OidcSettings } from '../oidc-settings';

function createState() {
  return base64url.encode(randomBytes(48));
}

// Todo: use discovery to find the authorize url.
function createAuthorizeUrl(settings: OidcSettings, state: string) {
  let authorizeUrl = `https://${settings.domain}/authorize?`
    + `client_id=${settings.clientId}`
    + `&response_type=code`
    + `&redirect_uri=${encodeURIComponent(settings.redirectUri)}`
    + `&scope=${encodeURIComponent(settings.scope)}`
    + `&state=${state}`;

  if (settings.audience) {
    authorizeUrl += `&${settings.audience}`;
  }

  return authorizeUrl;
}

export default function(settings: OidcSettings) {
  const LoginPage = class Login extends Component {
    static async getInitialProps (ctx: NextPageContext) {
      if (ctx.res) {
        const state = createState();

        // Set the state in the cookie.
        const nextContext: any = ctx;
        parseCookies(nextContext);
        setCookie(nextContext, 'oidc:state', state, {
          maxAge: 60 * 60,
          path: '/'
        })

        // Redirect to the authorize endpoint.
        ctx.res.writeHead(302, {
          Location: createAuthorizeUrl(settings, state)
        });      
        ctx.res.end();
      }
    }

    render () {
      return (
        <div>
          <p>You should not be seeing this page</p>
        </div>
      )
    }
  }
  return LoginPage;
}
