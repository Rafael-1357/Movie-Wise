import { api } from './api'
import type { MovieSearchResponse } from '@/types/movie'

export const searchMovies = (title: string) => {
  return api.get<MovieSearchResponse>('', { params: { s: title } })
};
