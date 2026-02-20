import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MovieSearchResult } from '@/types/movie'

export const useMovieStore = defineStore('movies', () => {
  const movies = ref<MovieSearchResult[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const favorites = ref<MovieSearchResult[]>(
    JSON.parse(localStorage.getItem('moviewise-favorites') ?? '[]'),
  )

  const favoriteIds = computed(() => new Set(favorites.value.map((movie) => movie.imdbID)))

  function isFavorite(imdbID: string): boolean {
    return favoriteIds.value.has(imdbID)
  }

  function toggleFavorite(movie: MovieSearchResult) {
    const index = favorites.value.findIndex((f) => f.imdbID === movie.imdbID)
    if (index !== -1) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(movie)
    }
    localStorage.setItem('moviewise-favorites', JSON.stringify(favorites.value))
  }

  return {
    movies,
    isLoading,
    error,
    favorites,
    favoriteIds,
    isFavorite,
    toggleFavorite,
  }
})
