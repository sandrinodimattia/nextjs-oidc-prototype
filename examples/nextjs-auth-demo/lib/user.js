import React from 'react'
import fetch from 'isomorphic-unfetch'

const User = React.createContext()

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState

const fetchUser = async () => {
  const res = await fetch('/api/me')

  if (res.ok) {
    return { session: await res.json() }
  }
}

export function UserProvider ({ user, children }) {
  return <User.Provider value={user}>{children}</User.Provider>
}

export const useUser = () => React.useContext(User)

export const useFetchUser = () => {
  const [user, setUser] = React.useState(userState || null)

  React.useEffect(() => {
    if (userState !== undefined) return

    let isMounted = true

    fetchUser().then(data => {
      userState = data || null

      // Only set the user if the component is still mounted
      if (isMounted && data) {
        setUser(data)
      }
    })

    return () => {
      isMounted = false
    }
  }, [userState])

  return user
}
