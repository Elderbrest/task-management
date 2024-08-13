<script setup lang="ts">
import { defineProps } from 'vue'
import Status from './Status.vue'

interface Props {
  title: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'inProgress' | 'completed';
}

defineProps<Props>()
</script>

<template>
  <div class="container">
    <div class="header">
      <h4 class="title">{{ title }}</h4>
      <Status :status="status" />
    </div>
    <p>{{ description }}</p>
    <small class="due-date">Due: {{ dueDate }}</small>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  max-width: 320px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
}
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.title {
  margin: 0;
}
.due-date {
  font-weight: bold;
}
</style>
