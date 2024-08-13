<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useTaskStore } from '@/store/task'
import Status from './Status.vue'

const isVisible = ref(false)
const taskStore = useTaskStore()
const handleAddFilter = (status: 'pending' | 'inProgress' | 'completed') => {
  taskStore.toggleStatusFilter(status)
}
</script>

<template>
  <div class="filters-container">
    <template v-if="isVisible">
      <span class="filters-label">Filter by status:</span>
      <Status
        status="pending"
        class="filter"
        :class="{'inactive-filter': !taskStore.filters.includes('pending')}"
        @click="handleAddFilter('pending')"
      />
      <Status
        status="inProgress"
        class="filter"
        :class="{'inactive-filter': !taskStore.filters.includes('inProgress')}"
        @click="handleAddFilter('inProgress')"
      />
      <Status
        status="completed"
        class="filter"
        :class="{'inactive-filter': !taskStore.filters.includes('completed')}"
        @click="handleAddFilter('completed')"
      />
    </template>
    <Icon @click="isVisible = !isVisible" icon="mage:filter" width="24" class="icon" />
  </div>
</template>

<style scoped>
.filters-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.filter {
  cursor: pointer;
}
.filters-label {
  font-weight: bold;
}
.icon {
  cursor: pointer;
}
.inactive-filter {
  border: 1px solid grey;
  background-color: #fff;
  color: grey;
}
</style>
