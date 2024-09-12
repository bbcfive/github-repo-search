<script setup>
import { ref, computed } from 'vue';
import { useSearchStore } from './stores/search-store';
import LanguageFilter from './components/search/LanguageFilter.vue';
import DateRangeFilter from './components/search/DateRangeFilter.vue';
import StarFilter from './components/search/StarFilter.vue';
import RepositoryList from './components/search/RepositoryList.vue';

const searchStore = useSearchStore();

function handleSearch() {
  searchStore.performSearch();
}

const selectedLanguages = ref([]);
const dateRange = ref({ start: '', end: '' });
const minStars = ref(100);

const showDateRange = computed(() => dateRange.value.start && dateRange.value.end);
</script>

<template>
  <div class="flex h-screen">
    <!-- Left Panel -->
    <aside class="w-1/4 p-4 bg-gray-100 overflow-y-auto">
      <h2 class="text-xl font-bold mb-4">Filters</h2>
      <LanguageFilter v-model="selectedLanguages" />
      <DateRangeFilter class="my-4" v-model="dateRange" />
      <StarFilter v-model="minStars" />
      <button
        @click="handleSearch"
        class="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Search selected filters
      </button>
    </aside>

    <!-- Right Panel -->
    <main class="w-3/4 p-4 overflow-y-auto">
      <h1 class="text-2xl font-bold mb-4">
        GitHub repositories
        <template v-if="showDateRange">
          between {{ dateRange.start }} and {{ dateRange.end }}
        </template>
        with at least {{ minStars }} stars
      </h1>
      <RepositoryList />
    </main>
  </div>
</template>

<style scoped>
</style>