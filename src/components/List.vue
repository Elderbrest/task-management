<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { statusLabelMap } from '@/utils/status'
import { useTaskStore } from '@/store/task'
import Modal from './Modal.vue'
import TaskForm from './TaskForm.vue'
import Card from '@/components/Card.vue'

interface Props {
  status: 'pending' | 'inProgress' | 'completed';
}

const props = defineProps<Props>()
const isOpenModal = ref(false)
const taskForm = ref(null)
const taskStore = useTaskStore()

const openModal = () => isOpenModal.value = true
const closeModal = () => isOpenModal.value = false

const handleSubmit = (data) => {
  const payload = { ...data, status: 'pending' }
  taskStore.addTask(payload)
  closeModal()
}

const statusLabel = computed(() => statusLabelMap[props.status])
</script>

<template>
  <div class="list-container">
    <div class="list-header">
      <h3 class="list-title">{{ statusLabel }}</h3>
      <Icon icon="mdi:add-circle-outline" width="24" class="add-icon" @click="openModal" />
    </div>
    <div class="list-content">
      <Card
        v-for="task in taskStore.tasks"
        :title="task.title"
        :description="task.description"
        :due-date="task.dueDate"
        status="pending"
      />
    </div>
  </div>
  <Modal :is-open="isOpenModal" :modal-close="closeModal">
    <template #header>New task</template>
    <template #content>
      <TaskForm @submit="handleSubmit" :onClose="closeModal" ref="taskForm" />
    </template>
  </Modal>
</template>

<style scoped>
.list-container {
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
