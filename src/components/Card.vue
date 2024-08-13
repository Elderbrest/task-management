<script setup lang="ts">
import { withDefaults, defineProps, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Status from './Status.vue'
import Modal from '@/components/Modal.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useTaskStore } from '@/store/task'

interface Props {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'inProgress' | 'completed';
}

const props = withDefaults(defineProps<Props>(), {
  status: 'pending'
})

const taskStore = useTaskStore()
const isOpenDeleteModal = ref(false)

const closeDeleteModal = () => {
  isOpenDeleteModal.value = false
}
const openDeleteModal = () => {
  isOpenDeleteModal.value = true
}
const handleRemoveTask = () => {
  taskStore.removeTask(props.id)
  closeDeleteModal()
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h4 class="title">{{ title }}</h4>
      <Status :status="status" />
    </div>
    <p class="description">{{ description }}</p>
    <div class="footer">
      <small class="due-date">Due: {{ dueDate }}</small>
      <Icon icon="ic:baseline-delete" class="delete-icon" @click="openDeleteModal" />
    </div>
  </div>

  <Modal :is-open="isOpenDeleteModal" :modal-close="closeDeleteModal">
    <template #header>Are you sure you want to delete "{{ title }}" task?</template>
    <template #content>
      <div class="actions">
        <BaseButton @click="closeDeleteModal" variant="outlined">Cancel</BaseButton>
        <BaseButton @click="handleRemoveTask" color="error">Delete</BaseButton>
      </div>
    </template>
  </Modal>
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
  align-items: flex-start;
}
.title {
  margin: 0;
}
.description {
  padding: 1rem 0;
  text-align: left;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.due-date {
  font-weight: bold;
}
.delete-icon {
  cursor: pointer;
  color: #dc3545;
}
.actions {
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
