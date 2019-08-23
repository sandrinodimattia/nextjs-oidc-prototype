import { NextPageContext } from 'next';
import React, { Component } from 'react';
import { parseCookies, destroyCookie } from 'nookies';

import { OidcSettings } from '../oidc-settings';

function createLogoutUrl(settings: OidcSettings) {
  return `https://${settings.domain}/v2/logout?`
    + `client_id=${settings.clientId}`
    + `&returnTo=${settings.postLogooutRedirectUri}`;
}

export default function(settings: OidcSettings) {
  const LogoutPage = class Logout extends Component {
    static async getInitialProps (ctx: NextPageContext) {
      if (ctx.res) {
        // Set the state in the cookie.
        const nextContext: any = ctx;
        parseCookies(nextContext);
        destroyCookie(nextContext, 'oidc:state');
        destroyCookie(nextContext, 'oidc:session');

        // Redirect to the authorize endpoint.
        ctx.res.writeHead(302, {
          Location: createLogoutUrl(settings)
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
  return LogoutPage;
}
