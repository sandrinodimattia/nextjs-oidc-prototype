import oidc from '../../utils/oidc';

export default async function login(req, res) {
  try {
    await oidc.handleLogin(req, res);
  } catch(error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
