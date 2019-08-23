export interface OidcSettings {
  domain: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  postLogooutRedirectUri: string;
  scope: string;
  audience?: string;
}
