import Iron from '@hapi/iron';
import { parseCookies } from 'nookies';
import { NextPageContext } from 'next';

import Login from './login';
import Logout from './logout';
import Callback from './callback';

import IOidcSettings from './oidc-settings';
import OidcClientProvider from './oidc-client-provider';

export default function (settings: IOidcSettings) {
  if (!settings.session) {
    throw new Error('The session configuration is required');
  }

  const clientProvider = OidcClientProvider(settings);

  return {
    handleLogin: Login(clientProvider, settings),
    handleLogout: Logout(settings),
    handleCallback: Callback(clientProvider, settings),
    getSession: async (ctx: NextPageContext): Promise<any> => {
      const cookies = parseCookies(ctx);
      if (!cookies['oidc:session']) {
        return null;
      }

      const unsealed = await Iron.unseal(cookies['oidc:session'], settings.session.cookieSecret, Iron.defaults);
      return unsealed;
    }
  }
}
