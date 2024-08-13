<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { statusLabelMap } from '@/utils/status'
import { Task, useTaskStore } from '@/store/task'
import Modal from './Modal.vue'
import TaskForm from './TaskForm.vue'
import Card from '@/components/Card.vue'

interface Props {
  status: 'pending' | 'inProgress' | 'completed';
}

const props = defineProps<Props>()
const isOpenModal = ref(false)
const taskForm = ref(null)
const sort = ref<string | null>(null)
const taskStore = useTaskStore()

const openModal = () => {
  isOpenModal.value = true
}
const closeModal = () => {
  isOpenModal.value = false
}
const handleSubmit = (data: Task) => {
  const payload = { ...data, status: 'pending' }
  taskStore.addTask(payload)
  closeModal()
}
const handleDragStart = (event: DragEvent, taskId: string) => {
  event.dataTransfer!.dropEffect = 'move'
  event.dataTransfer!.effectAllowed = 'move'
  event.dataTransfer!.setData('taskId', taskId)
}
const handleDrop = (event: DragEvent) => {
  const taskId = event.dataTransfer!.getData('taskId')

  if (taskId) {
    taskStore.updateTask({ id: Number(taskId), status: props.status })
  }
}

const statusLabel = computed(() => statusLabelMap[props.status])
const tasks = computed(() => taskStore.getTasksByStatus(props.status)?.value)
const sortedTasks = computed(() => {
  return [...tasks.value].sort((a, b) => {
    const dateA = new Date(a.dueDate)
    const dateB = new Date(b.dueDate)

    if (sort.value === 'asc') {
      return dateA.getTime() - dateB.getTime()
    } else if (sort.value === 'desc') {
      return dateB.getTime() - dateA.getTime()
    } else {
      return 0
    }
  })
})
</script>

<template>
  <div class="list-container">
    <div class="list-header">
      <div class="title-container">
        <h3 class="list-title">{{ statusLabel }}</h3>
        <Icon v-if="sort == 'asc'" @click="sort='desc'" class="sort-icon" icon="mdi:sort-clock-ascending-outline" width="24" />
        <Icon v-else-if="sort == 'desc'" @click="sort=null" class="sort-icon" icon="mdi:sort-clock-descending-outline" width="24" />
        <Icon v-else @click="sort='asc'" class="sort-icon" icon="pepicons-pop:sort" width="24" />
      </div>
      <Icon icon="mdi:add-circle-outline" width="24" class="add-icon" @click="openModal" />
    </div>
    <div class="list-content" @dragover.prevent @dragenter.prevent @drop="handleDrop">
      <div v-if="!tasks.length" class="empty-content">
        <p>Oops, looks like there are no tasks</p>
        <Icon icon="emojione-monotone:sad-but-relieved-face" width="36" />
      </div>
      <Card
        v-else
        v-for="task in sortedTasks"
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :description="task.description"
        :due-date="task.dueDate"
        :status="task.status"
        :onDragStart="handleDragStart"
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
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  min-width: 320px;
  border: 1px dashed rgba(0, 0, 0, 0.1);

}
.list-header {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px 8px 16px;
  user-select: none;
}
.title-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.sort-icon {
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.3s;
}
.sort-icon:hover {
  opacity: 1;
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
  flex: 1;
  gap: 1rem;
  padding: 1rem;
}
.empty-content {
  margin: auto;
}
</style>
