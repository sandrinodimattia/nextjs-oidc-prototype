import IOidcSettings from './oidc-settings';

export interface IOidcClientProvider {
  (): Promise<any>;
}

export default function (settings: IOidcSettings): IOidcClientProvider {
  let issuer: any = null;
  let client: any = null;

  return async (): Promise<any> => {
    if (!issuer) {
      const { Issuer } = require('openid-client');
      issuer = await Issuer.discover(`https://${settings.domain}/`);
    }

    if (!client) {
      client = new issuer.Client({
        client_id: settings.clientId,
        client_secret: settings.clientSecret,
        redirect_uris: [settings.redirectUri],
        response_types: ['code'],
      });
    }

    return client;
  };
}
