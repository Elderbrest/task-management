<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Icon } from '@iconify/vue'
import { statusLabelMap } from '@/utils/status'
import Card from './Card.vue'

interface Props {
  status: 'pending' | 'inProgress' | 'completed';
}

const props = defineProps<Props>()

const statusLabel = computed(() => statusLabelMap[props.status])
</script>

<template>
  <div class="list-container">
    <div class="list-header">
      <h3 class="list-title">{{ statusLabel }}</h3>
      <Icon icon="mdi:add-circle-outline" width="24" class="add-icon" />
    </div>
    <div class="list-content">
      <Card title="Title of the card" description="This task is gonna be there wowow" due-date="2024-08-12" :status="status" />
      <Card title="Title of the card" description="This task is gonna be there wowow" due-date="2024-08-12" :status="status" />
      <Card title="Title of the card" description="This task is gonna be there wowow" due-date="2024-08-12" :status="status" />
    </div>
  </div>
</template>

<style scoped>
.list-container {
  padding: 24px;
  border-radius: 16px;
}
.list-header {
  display: flex;
  justify-content: space-between;
  padding: 0 8px 24px 8px;
}
.add-icon {
  color: #75727d;
  cursor: pointer;
}
.list-title {
  margin: 0;
  color: #75727d;
}
.list-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
