import React from 'react'
import fetch from 'isomorphic-unfetch'

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState

const fetchUser = async () => {
  const res = await fetch('/api/me')

  if (res.ok) {
    return { session: await res.json() }
  }
  return null
}

export const User = React.createContext({ user: null, loading: false })

export const useUser = () => React.useContext(User)

export const useFetchUser = () => {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined
  })

  React.useEffect(() => {
    if (userState !== undefined) return

    let isMounted = true

    fetchUser().then(user => {
      userState = user

      // Only set the user if the component is still mounted
      if (isMounted) {
        setUser({ user, loading: false })
      }
    })

    return () => {
      isMounted = false
    }
  }, [userState])

  return data
}
