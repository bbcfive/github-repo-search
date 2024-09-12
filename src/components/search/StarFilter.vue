<script setup>
import { ref, watch } from 'vue';
import { useSearchStore } from '@/stores/search-store';
import { ElSlider } from 'element-plus';

const searchStore = useSearchStore();
const minStars = ref(100);

watch(minStars, (newValue) => {
  searchStore.setMinStars(newValue);
});
</script>

<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      Minimum Stars: {{ minStars }}
    </label>
    <ElSlider
      v-model="minStars"
      :min="0"
      :max="10000"
      :step="100"
      show-input
    />
  </div>
</template>