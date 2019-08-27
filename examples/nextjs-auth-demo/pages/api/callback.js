import oidc from '../../utils/oidc';

export default async function callback(req, res) {
  try {
    await oidc.handleCallback(req, res, { redirectTo: '/' });
  } catch(error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
