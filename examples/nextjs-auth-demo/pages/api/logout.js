import { handleLogout } from '../../utils/oidc';

export default async function handle(req, res) {
  await handleLogout(req, res);
}
