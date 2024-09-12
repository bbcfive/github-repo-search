<script setup>
import { ref, watch } from 'vue';
import { useSearchStore } from '../../stores/search-store';
import { ElDatePicker } from 'element-plus';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const searchStore = useSearchStore();
const startDate = ref(props.modelValue.start);
const endDate = ref(props.modelValue.end);

watch([startDate, endDate], ([newStart, newEnd]) => {
  const formattedStart = newStart ? newStart.toISOString().split('T')[0] : '';
  const formattedEnd = newEnd ? newEnd.toISOString().split('T')[0] : '';
  
  emit('update:modelValue', { start: formattedStart, end: formattedEnd });
  
  searchStore.setDateRange(formattedStart, formattedEnd);
});
</script>

<template>
  <div class="date-range-filter">
    <h3 class="filter-title">Date Range</h3>
    <div class="date-pickers">
      <ElDatePicker
        v-model="startDate"
        type="date"
        placeholder="Start Date"
        :disabled-date="(time) => endDate && time > endDate"
        class="date-picker"
      />
      <ElDatePicker
        v-model="endDate"
        type="date"
        placeholder="End Date"
        :disabled-date="(time) => startDate && time < startDate"
        class="date-picker"
      />
    </div>
  </div>
</template>

<style scoped>
.date-range-filter {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2c3e50;
}

.date-pickers {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.date-picker {
  width: 100%;
}

.date-picker :deep(.el-input__wrapper) {
  background-color: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: all 0.3s;
}

.date-picker :deep(.el-input__wrapper:hover) {
  border-color: #409eff;
}

.date-picker :deep(.el-input__wrapper.is-focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}
</style>