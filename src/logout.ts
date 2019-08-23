import { parseCookies, destroyCookie } from 'nookies';
import { IncomingMessage, ServerResponse } from 'http';

import IOidcSettings from './oidc-settings';

// Todo: Needs to come from the end session endpoint.
function createLogoutUrl(settings: IOidcSettings) {
  return `https://${settings.domain}/v2/logout?`
    + `client_id=${settings.clientId}`
    + `&returnTo=${settings.postLogooutRedirectUri}`;
}

export default function logout(settings: IOidcSettings) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    if (!res) {
      throw new Error('Response is not available');
    }

    // Set the state in the cookie.
    const nextContext: any = {
      req,
      res
    };
    parseCookies(nextContext);
    destroyCookie(nextContext, 'oidc:state');
    destroyCookie(nextContext, 'oidc:session');

    // Redirect to the authorize endpoint.
    res.writeHead(302, {
      Location: createLogoutUrl(settings)
    });
    res.end();
  };
}
