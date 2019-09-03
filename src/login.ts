import base64url from 'base64url';
import { randomBytes } from 'crypto';
import { serialize } from 'cookie'
import { IncomingMessage, ServerResponse } from 'http';

import IOidcSettings from './oidc-settings';
import { IOidcClientProvider } from 'oidc-client-provider';

export default function login(clientProvider: IOidcClientProvider, settings: IOidcSettings) {
  return async (_req: IncomingMessage, res: ServerResponse) => {
    if (!res) {
      throw new Error('Response is not available');
    }

    // Generate the state
    const state = base64url(randomBytes(48));

    // Create the authorization url.
    const client = await clientProvider();
    const authorizationUrl = client.authorizationUrl({
      redirect_uri: settings.redirectUri,
      scope: settings.scope,
      response_type: 'code'
    });

    // Set the state in the cookie.
    res.setHeader('Set-Cookie', serialize('oidc:state', state, {
      maxAge: 60 * 60,
      path: '/'
    }))
    // Redirect to the authorize endpoint.
    res.writeHead(302, {
      Location: `${authorizationUrl}&state=${state}`
    });
    res.end();
  };
}
