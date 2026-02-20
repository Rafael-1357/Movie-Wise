<script setup lang="ts">
import type { MovieSearchResult } from '@/types/movie'
import { useMovieStore } from '@/stores/useMovieStore'

const props = defineProps<{
  movie: MovieSearchResult
}>()

const store = useMovieStore()
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <button
      class="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 hover:scale-110 cursor-pointer  "
      :class="
        store.isFavorite(props.movie.imdbID) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
      "
      :title="
        store.isFavorite(props.movie.imdbID) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
      "
      @click="store.toggleFavorite(props.movie)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="h-5 w-5"
        :fill="store.isFavorite(props.movie.imdbID) ? 'currentColor' : 'none'"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>

    <img
      :src="
        movie.Poster !== 'N/A'
          ? movie.Poster
          : 'https://via.placeholder.com/300x450?text=Sem+Poster'
      "
      :alt="movie.Title"
      class="h-72 w-full object-cover"
    />
    <div class="p-4">
      <h3 class="truncate text-lg font-semibold text-gray-900">
        {{ movie.Title }}
      </h3>
      <p class="text-sm text-gray-500">{{ movie.Year }}</p>
    </div>
  </div>
</template>
