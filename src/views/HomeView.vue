<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import MovieCard from '@/components/MovieCard.vue'
import { useMovieStore } from '@/stores/useMovieStore'
import { ref } from 'vue'

const store = useMovieStore()
const showFavorites = ref(false)
</script>

<template>
  <main class="min-h-screen bg-gray-50 px-4 py-10">
    <div class="mx-auto max-w-5xl">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900">MovieWise</h1>
        <p class="mt-2 text-gray-500">Busque e favorite seus filmes</p>
      </div>

      <div class="mb-6 flex justify-center gap-4">
        <SearchBar />
        <button
          class="rounded-xl border border-gray-300 px-4 py-3 text-base shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          :class="
            showFavorites
              ? 'bg-red-500 text-white shadow-md hover:bg-red-600'
              : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'
          "
          @click="showFavorites = !showFavorites"
        >
          Favoritos ({{ store.favorites.length }})
        </button>
      </div>
    </div>

    <div class="mb-8 flex justify-center">
      <p v-if="store.error && !showFavorites" class="mb-6 text-center text-sm text-red-500">
        {{ store.error }}
      </p>

      <div v-if="showFavorites">
        <div
          v-if="store.favorites.length"
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <MovieCard v-for="movie in store.favorites" :key="movie.imdbID" :movie="movie" />
        </div>

        <p v-else class="mt-20 text-center text-gray-400">Você ainda não favoritou nenhum filme</p>
      </div>

      <div v-else>
        <div
          v-if="store.movies.length"
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <MovieCard v-for="movie in store.movies" :key="movie.imdbID" :movie="movie" />
        </div>

        <p
          v-if="!store.movies.length && !store.isLoading && !store.error"
          class="mt-20 text-center text-gray-400"
        >
          Digite o nome de um filme para começar a busca
        </p>
      </div>
    </div>
  </main>
</template>
