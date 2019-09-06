import delay from 'delay';
import oidc from '../../utils/oidc';

export default async function me(req, res) {
  // Introduces a 2.5 sec delay to show client side rendering
  // await delay(2500);

  const session = await oidc.getSession(req);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' })
    return;
  }

  res.json(session);
}
