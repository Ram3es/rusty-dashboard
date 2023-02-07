import io from 'socket.io-client'
import { API_URLS } from '../constants'

const socket = io(API_URLS.API_URL, {
  transports: ['websocket', 'polling'],
  upgrade: true
})

export default socket
