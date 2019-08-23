export interface OidcSettings {
  domain: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  audience?: string;
}
