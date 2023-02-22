import { useState } from 'react'

export default function useToken () {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token')
    const userToken = tokenString ? JSON.parse(tokenString) : undefined
    return userToken?.token || undefined
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken: { token: string }) => {
    sessionStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken.token)
  }

  return {
    setToken: saveToken,
    token
  }
}
