import React from 'react'
import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'

export default function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={{ user, loading }}>
      <h1>Auth0 example</h1>

      {loading && (
        <p>
          Loading login info...
        </p>
      )}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in <i>Profile</i> and{' '}
            <i>Logout</i>
          </p>
        </>
      )}

      {user && (
        <>
          <h4>Rendered user info on the client</h4>
          <p>Subject: {user.session.sub}</p>
          <p>Email: {user.session.email}</p>
          <p>Name: {user.session.name}</p>
          <p>Access Token: {user.session.accessToken}</p>
        </>
      )}
    </Layout>
  )
}
