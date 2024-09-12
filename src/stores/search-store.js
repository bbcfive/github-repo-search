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
    currentPage: 0,
    totalPages: 1,
    lastSearchParams: null,
    hasMoreData: false,
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
    state.value.lastSearchParams = { ...searchParams.value };

    try {
      const results = await fetchMostStarredRepos({
        ...searchParams.value,
        page: state.value.currentPage,
      });

      if (Array.isArray(results)) {
        // Multi-language query results
        if (page === 1) {
          state.value.repositories = results.reduce((acc, result) => {
            acc[result.language] = result.repos;
            return acc;
          }, {});
        } else {
          const newRepositories = { ...state.value.repositories };
          results.forEach(result => {
            if (newRepositories[result.language]) {
              newRepositories[result.language] = [
                ...newRepositories[result.language],
                ...result.repos
              ];
            } else {
              newRepositories[result.language] = result.repos;
            }
          });
          state.value.repositories = newRepositories;
        }
      } else {
        // Single language query results
        const language = state.value.selectedLanguages[0];
        if (page === 1) {
          state.value.repositories = {
            [language]: results.repos
          };
        } else {
          const newRepositories = { ...state.value.repositories };
          newRepositories[language] = [
            ...(newRepositories[language] || []),
            ...results.repos
          ];
          state.value.repositories = newRepositories;
        }
        state.value.totalPages = Math.ceil(results.totalCount / 20); // 假设每页20条
      }
      state.value.hasMoreData = state.value.currentPage < state.value.totalPages;
    } catch (error) {
      state.value.error = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      state.value.isLoading = false;
    }
  }

  async function loadMoreRepositories() {
    if (state.value.currentPage >= state.value.totalPages) return;
    
    await performSearch(state.value.currentPage + 1);
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
    loadMoreRepositories,
  };
});