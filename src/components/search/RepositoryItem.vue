<script setup>
defineProps({
  repo: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-white p-4 rounded-md shadow-md">
    <h3 class="text-xl font-semibold mb-2">
      <a :href="repo.html_url" target="_blank" class="text-blue-600 hover:underline">{{ repo.name }}</a>
    </h3>
    <p class="text-gray-600 mb-2">{{ repo.description }}</p>
    <div class="flex items-center text-sm text-gray-500">
      <span class="mr-4">⭐ {{ repo.stargazers_count }}</span>
      <span>🍴 {{ repo.forks_count }}</span>
    </div>
  </div>
</template>