import { ref, watch } from 'vue'
import { searchMovies } from '@/services/movieService'
import { useMovieStore } from '@/stores/useMovieStore'

const errorMessages: Record<string, string> = {
  'Movie not found!': 'Nenhum filme encontrado para essa busca.',
  'Too many results.': 'Muitos resultados. Tente ser mais específico.',
  'Incorrect IMDb ID.': 'ID do filme inválido.',
}

function getErrorMessage(apiError?: string): string {
  if (!apiError) return 'Nenhum filme encontrado.'
  return errorMessages[apiError] ?? 'Ocorreu um erro inesperado.'
}

export function useMovies() {
  const store = useMovieStore()
  const searchTerm = ref('')

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  const getMovies = async (title: string) => {
    if (!title.trim()) {
      store.movies = []
      return
    }

    store.isLoading = true
    store.error = null

    try {
      const response = await searchMovies(title)

      if (response.data.Response === 'True') {
        store.movies = response.data.Search
      } else {
        store.movies = []
        store.error = getErrorMessage(response.data.Error)
      }
    } catch (err) {
      console.error('[useMovies] Erro na busca:', err)
      store.error = 'Falha na conexão com o servidor. Tente novamente.'
    } finally {
      store.isLoading = false
    }
  }

  watch(searchTerm, (newValue) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      getMovies(newValue)
    }, 400)
  })

  return {
    searchTerm,
    getMovies,
  }
}
