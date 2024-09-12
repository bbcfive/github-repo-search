<script setup>
import { ref, computed } from 'vue';
import { useSearchStore } from '@/stores/search-store';

const searchStore = useSearchStore();
const searchTerm = ref('');

const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust'];

const filteredLanguages = computed(() => {
  return languages.filter(lang => 
    lang.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
    !searchStore.state.selectedLanguages.includes(lang)
  );
});

function selectLanguage(lang) {
  searchStore.addLanguage(lang);
  searchTerm.value = '';
}

function removeLanguage(lang) {
  searchStore.removeLanguage(lang);
}
</script>

<template>
  <div class="space-y-2">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search language..."
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div class="flex flex-wrap gap-2">
      <button
        v-for="lang in filteredLanguages"
        :key="lang"
        @click="selectLanguage(lang)"
        class="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {{ lang }}
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <div
        v-for="lang in searchStore.state.selectedLanguages"
        :key="lang"
        class="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-full"
      >
        {{ lang }}
        <button
          @click="removeLanguage(lang)"
          class="ml-2 focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>