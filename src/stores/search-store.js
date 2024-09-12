import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { searchRepositories } from '@/services/github-api';

export const useSearchStore = defineStore('search', () => {
  const state = ref({
    selectedLanguages: [],
    dateRange: { start: null, end: null },
    minStars: 100,
    repositories: {},
    isLoading: false,
    error: null,
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

  async function performSearch() {
    state.value.isLoading = true;
    state.value.error = null;

    try {
      const results = await searchRepositories(searchParams.value);
      state.value.repositories = results.reduce((acc, repo) => {
        const lang = repo.language || 'Other';
        if (!acc[lang]) acc[lang] = [];
        acc[lang].push(repo);
        return acc;
      }, {});
    } catch (error) {
      state.value.error = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      state.value.isLoading = false;
    }
  }

  return {
    state,
    addLanguage,
    removeLanguage,
    setDateRange,
    setMinStars,
    performSearch,
  };
});