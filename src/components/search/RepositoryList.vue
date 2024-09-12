<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useSearchStore } from '../../stores/search-store';
import RepositoryItem from './RepositoryItem.vue';

const searchStore = useSearchStore();

const repositories = computed(() => searchStore.state.repositories);
const isLoading = computed(() => searchStore.state.isLoading);
const error = computed(() => searchStore.state.error);
const hasMoreData = computed(() => searchStore.state.hasMoreData);

const loading = ref(false);
const activeLanguage = ref(null);

const languages = computed(() => Object.keys(repositories.value));

const showLanguageTags = computed(() => languages.value.length > 1);

const activeRepositories = computed(() => {
  if (!showLanguageTags.value) {
    return repositories.value;
  }
  if (activeLanguage.value && repositories.value[activeLanguage.value]) {
    return { [activeLanguage.value]: repositories.value[activeLanguage.value] };
  }
  // If there is no selected language but there are multiple languages, return the repositories for the first language
  if (languages.value.length > 0) {
    const firstLanguage = languages.value[0];
    return { [firstLanguage]: repositories.value[firstLanguage] };
  }
  return {};
});

function setActiveLanguage(language) {
  activeLanguage.value = language;
  // Scroll to the corresponding language section
  const element = document.getElementById(`language-${language}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

async function loadMore() {
  if (loading.value) return;
  loading.value = true;
  await searchStore.loadMoreRepositories();
  loading.value = false;
}

// Listen for changes in languages, ensuring there is always a selected language
watch(languages, (newLanguages) => {
  if (newLanguages.length > 0 && !newLanguages.includes(activeLanguage.value)) {
    setActiveLanguage(newLanguages[0]);
  }
}, { immediate: true });

onMounted(() => {
  // Default select the first tag
  if (languages.value.length > 0) {
    setActiveLanguage(languages.value[0]);
  }
});
</script>

<template>
  <div v-if="isLoading && Object.keys(repositories).length === 0" class="text-center py-8">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    <p class="mt-4 text-gray-600">Loading repositories...</p>
  </div>
  <div v-else-if="error" class="text-center py-8 text-red-600">
    {{ error }}
  </div>
  <div v-else>
    <!-- Language Tags -->
    <div v-if="showLanguageTags" class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="language in languages"
        :key="language"
        @click="setActiveLanguage(language)"
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium',
          activeLanguage === language
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        {{ language }}
      </button>
    </div>

    <!-- Repository List -->
    <div class="space-y-8">
      <div
        v-for="(repos, language) in activeRepositories"
        :key="language"
        :id="`language-${language}`"
        class="space-y-4"
      >
        <h2 v-if="showLanguageTags" class="text-2xl font-bold">{{ language }}</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RepositoryItem v-for="repo in repos" :key="repo.id" :repo="repo" />
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMoreData" class="text-center mt-4">
      <button
        @click="loadMore"
        :disabled="loading"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {{ loading ? 'Loading...' : 'Load More' }}
      </button>
    </div>
  </div>
</template>