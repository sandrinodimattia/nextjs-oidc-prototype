import Iron from '@hapi/iron';
import { NextApiRequest } from 'next'
import { parseCookies } from './cookies';
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
    getSession: async (req: NextApiRequest) => {
      if (!req) {
        throw new Error('A request is required');
      }

      const cookies = parseCookies(req);

      if (!cookies['oidc:session']) {
        return null;
      }

      const unsealed = await Iron.unseal(req.cookies['oidc:session'], settings.session.cookieSecret, Iron.defaults);
      return unsealed;
    }
  }
}
