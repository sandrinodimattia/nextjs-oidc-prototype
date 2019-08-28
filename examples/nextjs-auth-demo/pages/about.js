import React from 'react'
import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'

export default function About() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading}>
      <h1>Auth0 example</h1>
      <p>
        This is the about page, navigations between this page and <i>Home</i> are
        always pretty fast, <i>Profile</i> takes more time because it uses SSR to
        fetch the user first
      </p>
    </Layout>
  )
}
