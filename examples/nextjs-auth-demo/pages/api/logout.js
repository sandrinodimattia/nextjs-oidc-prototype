import oidc from '../../utils/oidc';

export default async function logout(req, res) {
  try {
    await oidc.handleLogout(req, res);
  } catch(error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
