import Iron from '@hapi/iron';
import { serialize } from 'cookie'
import { IncomingMessage, ServerResponse } from 'http';
import { parseCookies } from './cookies';

import IOidcSettings from './oidc-settings';
import { IOidcClientProvider } from './oidc-client-provider';

export default function callback(clientProvider: IOidcClientProvider, settings: IOidcSettings) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    if (!res) {
      throw new Error('Response is not available');
    }

    if (!req) {
      throw new Error('Request is not available');
    }

    if (!req.url) {
      throw new Error('Url is not available');
    }

    // Parse the cookies.
    const cookies = parseCookies(req);

    // Require that we have a state.
    const state = cookies['oidc:state'];
    if (!state) {
      throw new Error('Invalid request, an initial state could not be found');
    }

    // Execute the code exchange
    const client = await clientProvider();
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(settings.redirectUri, params, {
      state: cookies['oidc:state']
    });

    // Create the session.
    const claims = tokenSet.claims();
    const session = {
      ...claims,
      accessToken: tokenSet.access_token
    };

    // Create the session.
    const sealed = await Iron.seal(session, settings.session.cookieSecret, Iron.defaults);
    res.setHeader('Set-Cookie', serialize('oidc:session', sealed, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    }))

    // Redirect to the homepage.
    res.writeHead(302, {
      Location: '/'
    });
    res.end();
  }
}
