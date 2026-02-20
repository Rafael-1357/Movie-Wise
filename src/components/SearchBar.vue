<script setup lang="ts">
import { useMovies } from '@/composables/useMovies'
import { useMovieStore } from '@/stores/useMovieStore'

const { searchTerm } = useMovies()
const store = useMovieStore()
</script>

<template>
  <div class="relative w-full max-w-xl">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Buscar filmes..."
      class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
    />
    <span
      v-if="store.isLoading"
      class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 animate-pulse"
    >
      Buscando...
    </span>
  </div>
</template>
