import delay from 'delay';

import { getSession } from '../../utils/oidc';

export default async function handle(req, res) {
  // We are introducing a 2.5 sec delay to show the client side rendering
  await delay(2500);

  const session = await getSession(req);
  res.json(session);
}
