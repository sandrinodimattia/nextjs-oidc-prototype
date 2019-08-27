import React from 'react'
import fetch from 'isomorphic-unfetch'

const User = React.createContext()

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState

const fetchUser = async () => {
  if (!userState) {
    const res = await fetch('/api/me')

    if (res.ok) {
      userState = { session: await res.json() }
      return userState
    }
  }
}

export function UserProvider ({ user, children }) {
  return <User.Provider value={user}>{children}</User.Provider>
}

export const useUser = () => React.useContext(User)

export const useFetchUser = () => {
  const [user, setUser] = React.useState(userState)

  React.useEffect(() => {
    fetchUser().then(data => {
      setUser(data)
    })
  }, [setUser])

  return user
}
