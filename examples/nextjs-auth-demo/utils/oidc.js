import NextOidc from '@auth0/nextjs-oidc';

module.exports = NextOidc({
  // audience: 'foo',
  clientId: 'BP4Pgl2aqs7diQ6ARkiAAH6bAeYjMJv6',
  clientSecret: 'P8WDmH4XyumzkTCxaTtFywaMHjjyRDnn0X5c0mXTdEZFCtxV6TRj8v31in4e6_9r',
  scope: 'openid profile',
  domain: 'sandrino-nextjs.auth0.com',
  redirectUri: 'http://localhost:3000/callback',
  postLogoutRedirectUri: 'http://localhost:3000/',
  session: {
    cookieSecret: 'viloxyf_z2GW6K4CT-KQD_MoLEA2wqv5jWuq4Jd0P7ymgG5GJGMpvMneXZzhK3sL'
  }
});
