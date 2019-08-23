import base64url from 'base64url';
import { randomBytes } from 'crypto';
import { NextPageContext } from 'next';
import { parseCookies, setCookie } from 'nookies';

import IOidcSettings from './oidc-settings';
import { IOidcClientProvider } from 'oidc-client-provider';

export default function login(clientProvider: IOidcClientProvider, settings: IOidcSettings) {
  return async (ctx: NextPageContext) => {
    if (!ctx.res) {
      throw new Error('Response is not available');
    }

    // Generate the state?
    const state = base64url(randomBytes(48));

    // Create the authorization url.
    const client = await clientProvider();
    const authorizationUrl = client.authorizationUrl({
      redirect_uri: settings.redirectUri,
      scope: settings.scope,
      response_type: 'code'
    });

    // Set the state in the cookie.
    const nextContext: any = ctx;
    parseCookies(nextContext);
    setCookie(nextContext, 'oidc:state', state, {
      maxAge: 60 * 60,
      path: '/'
    })

    // Redirect to the authorize endpoint.
    ctx.res.writeHead(302, {
      Location: `${authorizationUrl}&state=${state}`
    });      
    ctx.res.end();
  };
}
