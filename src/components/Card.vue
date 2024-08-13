<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits } from 'vue'
import { Icon } from '@iconify/vue'
import Status from './Status.vue'
import Modal from '@/components/Modal.vue'
import BaseButton from '@/components/BaseButton.vue'
import TaskForm from '@/components/TaskForm.vue'
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
const isOpenEditModal = ref(false)

const emit = defineEmits(['dragStart'])
const closeDeleteModal = () => {
  isOpenDeleteModal.value = false
}
const openDeleteModal = () => {
  isOpenDeleteModal.value = true
}
const closeEditModal = () => {
  isOpenEditModal.value = false
}
const openEditModal = () => {
  isOpenEditModal.value = true
}
const handleRemoveTask = () => {
  taskStore.removeTask(props.id)
  closeDeleteModal()
}
const handleDragStart = (event: DragEvent) => {
  emit('dragStart', event, props.id)
}
</script>

<template>
  <div class="container" draggable="true" @dragstart="handleDragStart">
    <div class="header">
      <div class="title-container">
        <Icon class="drag-icon" icon="icon-park-outline:drag" width="16" />
        <h4 class="title">{{ title }}</h4>
      </div>
      <Status :status="status" />
    </div>
    <p class="description">{{ description }}</p>
    <div class="footer">
      <small class="due-date">Due: {{ dueDate }}</small>
      <div class="icons-container">
        <Icon icon="raphael:edit" class="edit-icon" width="24" @click="openEditModal" />
        <Icon icon="ic:baseline-delete" class="delete-icon" width="24" @click="openDeleteModal" />
      </div>
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

  <Modal :is-open="isOpenEditModal" :modal-close="closeEditModal">
    <template #header>Update task</template>
    <template #content>
      <TaskForm @submit="handleUpdateTask" :onClose="closeEditModal" :initial-data="props" />
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
.title-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
.edit-icon {
  cursor: pointer;
}
.icons-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.actions {
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.drag-icon {
  cursor: grab;
  flex-shrink: 0;
}
.drag-icon:active {
  cursor: grabbing;
}
</style>
