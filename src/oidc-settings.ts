export default interface IOidcSettings {
  domain: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  postLogooutRedirectUri: string;
  scope: string;
  audience?: string;
  session: IOidcSessionSettings;
}

export interface IOidcSessionSettings {
  cookieSecret: string;
}
