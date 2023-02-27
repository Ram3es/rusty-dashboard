import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { API_URLS } from '../../constants'
import { useUserContext } from '../../store/UserStore'

export default function Login () {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<{ error: boolean, status: string }>()
  const navigate = useNavigate()
  const [, setUser] = useUserContext()

  async function loginUser (credentials: { username: string, password: string }) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await fetch(`${API_URLS.API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password
      })
    })
      .then(async data => await data.json())
      .catch(e => {
        console.error(e)
        setUser({})
      })
  }

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault()
    const res: any = await loginUser({
      username,
      password
    })
    if (res) {
      if (res.userPayload) {
        const socket = io(API_URLS.API_URL, {
          transports: ['websocket', 'polling'],
          upgrade: true,
          extraHeaders: {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            Authorization: `bearer ${res.token}`
          }
        })
        setUser({ email: res.userPayload.email, tocken: res.token, socket })
        setErrorMessage(undefined)
        navigate('/admin/')
      } else {
        setUser({})
        setErrorMessage({ error: true, status: res.message })
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {errorMessage?.error
          ? <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <div className="text-sm text-red-700">
              {errorMessage.status}
            </div>
          </div>
        </div>
      </div>
          : ''}
        <form className="mt-8 space-y-6" onSubmit={(e) => {
          void (async () => {
            await handleSubmit(e)
          })()
        }}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm"
                placeholder="Email address"
                value={username}
                onChange={e => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-f py-2 px-4 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
