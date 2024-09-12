<script setup>
import { computed } from 'vue';
import { useSearchStore } from '../../stores/search-store';
import RepositoryItem from './RepositoryItem.vue';

const searchStore = useSearchStore();

const repositories = computed(() => searchStore.state.repositories);
const isLoading = computed(() => searchStore.state.isLoading);
const error = computed(() => searchStore.state.error);
</script>

<template>
  <div v-if="isLoading" class="text-center py-8">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    <p class="mt-4 text-gray-600">Loading repositories...</p>
  </div>
  <div v-else-if="error" class="text-center py-8 text-red-600">
    {{ error }}
  </div>
  <div v-else class="space-y-8">
    <div v-for="(repos, language) in repositories" :key="language" class="space-y-4">
      <h2 class="text-2xl font-bold">{{ language }}</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RepositoryItem v-for="repo in repos" :key="repo.id" :repo="repo" />
      </div>
    </div>
  </div>
</template>