import Login from './pages/login';
import Logout from './pages/logout';
import { OidcSettings } from './oidc-settings';

export default function (settings: OidcSettings) {
  return {
    Login: Login(settings),
    Logout: Logout(settings)
  }
}
