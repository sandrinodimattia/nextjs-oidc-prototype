import Head from 'next/head';
import Header from './header';
import { User } from '../lib/user';

const Layout = ({ user, children }) => (
  <User.Provider value={user}>
    <Head>
      <title>With Auth0</title>
    </Head>

    <Header />

    <main>
      <div className="container">{children}</div>
    </main>

    <style jsx>{`
      .container {
        max-width: 42rem;
        margin: 1.5rem auto;
      }
    `}</style>
    <style jsx global>{`
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, 'Segoe UI';
      }
    `}</style>
  </User.Provider>
);

export default Layout;
