import delay from 'delay';
import oidc from '../../utils/oidc';

export default async function handle(req, res) {
  // We are introducing a 2.5 sec delay to show the client side rendering
  await delay(2500);

  const session = await oidc.getSession(req);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' })
    return;
  }

  res.json(session);
}
