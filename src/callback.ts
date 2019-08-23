import Iron from '@hapi/iron';
import { NextPageContext } from 'next';
import { parseCookies, setCookie } from 'nookies';

import IOidcSettings from './oidc-settings';
import { IOidcClientProvider } from './oidc-client-provider';

export default function callback(clientProvider: IOidcClientProvider, settings: IOidcSettings) {
  return async (ctx: NextPageContext) => {
    if (!ctx.res) {
      throw new Error('Response is not available');
    }

    // Parste the cookies.
    const nextContext: any = ctx;
    const cookies = parseCookies(nextContext);
    
    // Get the params from the querystring.
    const params = {
      code: ctx.query['code'],
      state: ctx.query['state']
    };
    
    // Require that we have a state.
    const state = cookies['oidc:state'];
    if (!state) {
      throw new Error('Invalid request, an initial state could not be found');
    }

    // Execute the code exchange
    const client = await clientProvider();
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
    setCookie(ctx, 'oidc:session', sealed, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    // Redirect to the homepage.
    ctx.res.writeHead(302, {
      Location: '/'
    });      
    ctx.res.end();
  }
}
