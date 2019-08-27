import { serialize } from 'cookie'
import { IncomingMessage, ServerResponse } from 'http';

import IOidcSettings from './oidc-settings';

// Todo: Needs to come from the end session endpoint.
function createLogoutUrl(settings: IOidcSettings) {
  return `https://${settings.domain}/v2/logout?`
    + `client_id=${settings.clientId}`
    + `&returnTo=${settings.postLogoutRedirectUri}`;
}

export default function logout(settings: IOidcSettings) {
  return async (_req: IncomingMessage, res: ServerResponse) => {
    if (!res) {
      throw new Error('Response is not available');
    }

    // Remove the cookies
    res.setHeader('Set-Cookie', [
      serialize('oidc:state', '', { maxAge: -1, path: '/' }),
      serialize('oidc:session', '', { maxAge: -1, path: '/' })
    ])

    // Redirect to the authorize endpoint.
    res.writeHead(302, {
      Location: createLogoutUrl(settings)
    });
    res.end();
  };
}
