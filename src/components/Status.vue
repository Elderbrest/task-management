<script setup lang="ts">
import { defineProps, computed } from 'vue'

interface Props {
  status: 'pending' | 'inProgress' | 'completed';
}

const props = defineProps<Props>()

const statusClassMap = {
  pending: 'status-pending',
  inProgress: 'status-in-progress',
  completed: 'status-completed',
}
const statusLabelMap = {
  pending: 'Pending',
  inProgress: 'In progress',
  completed: 'Completed'
}
const statusClass = computed(() => statusClassMap[props.status])
const statusLabel = computed(() => statusLabelMap[props.status])
</script>

<template>
  <span :class="['status', statusClass]">{{ statusLabel }}</span>
</template>

<style scoped>
.status {
  border-radius: 16px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 2px 8px;
}
.status-pending {
  background: grey;
}
.status-in-progress {
  background: orange;
}
.status-completed {
  background: green;
}
</style>