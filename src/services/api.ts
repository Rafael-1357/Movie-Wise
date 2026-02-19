import axios from 'axios'

const api = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  params: {
    apikey: import.meta.env.VITE_OMDB_API_KEY,
  },
})
