import Login from './pages/login';
import { OidcSettings } from './oidc-settings';

export default function (settings: OidcSettings) {
  return {
    Login: Login(settings)
  }
}
