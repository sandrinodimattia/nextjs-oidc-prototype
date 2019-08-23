import { NextPageContext } from 'next';
import { parseCookies, destroyCookie } from 'nookies';

import IOidcSettings from './oidc-settings';

// Todo: Needs to come from the end session endpoint.
function createLogoutUrl(settings: IOidcSettings) {
  return `https://${settings.domain}/v2/logout?`
    + `client_id=${settings.clientId}`
    + `&returnTo=${settings.postLogooutRedirectUri}`;
}

export default function logout(settings: IOidcSettings) {
  return (ctx: NextPageContext) => {
    if (!ctx.res) {
      throw new Error('Response is not available');
    }

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
  };
}
