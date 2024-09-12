import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchMostStarredRepos } from '@/services/github-api';

export const useSearchStore = defineStore('search', () => {
  const state = ref({
    selectedLanguages: [],
    dateRange: { start: null, end: null },
    minStars: 100,
    repositories: {},
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  });

  const addLanguage = (language) => {
    if (!state.value.selectedLanguages.includes(language)) {
      state.value.selectedLanguages.push(language);
    }
  };

  const removeLanguage = (language) => {
    state.value.selectedLanguages = state.value.selectedLanguages.filter(lang => lang !== language);
  };

  const setDateRange = (start, end) => {
    state.value.dateRange = { start, end };
  };

  const setMinStars = (stars) => {
    state.value.minStars = stars;
  };

  const searchParams = computed(() => ({
    language: state.value.selectedLanguages.join(','),
    dateRange: state.value.dateRange,
    minStars: state.value.minStars,
  }));

  async function performSearch(page = 1) {
    state.value.isLoading = true;
    state.value.error = null;
    state.value.currentPage = page;

    try {
      const results = await fetchMostStarredRepos({
        ...searchParams.value,
        page: state.value.currentPage,
      });

      if (Array.isArray(results)) {
        // Multi-language query results
        state.value.repositories = results.reduce((acc, result) => {
          acc[result.language] = result.repos;
          return acc;
        }, {});
      } else {
        // Single language query results
        state.value.repositories = {
          [state.value.selectedLanguages[0]]: results.repos
        };
        state.value.totalPages = Math.ceil(results.totalCount / 20); // 假设每页20条
      }
    } catch (error) {
      state.value.error = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      state.value.isLoading = false;
    }
  }

  function nextPage() {
    if (state.value.currentPage < state.value.totalPages) {
      performSearch(state.value.currentPage + 1);
    }
  }

  function previousPage() {
    if (state.value.currentPage > 1) {
      performSearch(state.value.currentPage - 1);
    }
  }

  return {
    state,
    addLanguage,
    removeLanguage,
    setDateRange,
    setMinStars,
    performSearch,
    nextPage,
    previousPage,
  };
});