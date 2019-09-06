import { fetchUser } from '../lib/user'
import Layout from '../components/layout'

const Profile = ({ user }) => (
  <Layout user={user}>
    <h1>Auth0 example</h1>

    <div>
      <h3>Profile (server rendered)</h3>
      <pre>{JSON.stringify(user.session, null, 2)}</pre>
    </div>
  </Layout>
)

Profile.getInitialProps = async ({ req, res }) => {
  if (typeof window === 'undefined') {
    const oidc = require('../utils/oidc').default
    const session = await oidc.getSession(req);

    if (!session) {
      res.writeHead(302, {
        Location: '/api/login'
      });
      res.end();
      return;
    }

    return { user: { session } }
  }

  const user = await fetchUser()
  return { user }
}

export default Profile
