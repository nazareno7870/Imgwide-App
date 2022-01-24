export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://imgwide.herokuapp.com/api'
  : 'http://192.168.4.15:3001/api'