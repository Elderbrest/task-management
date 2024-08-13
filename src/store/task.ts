import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

type Status = 'pending' | 'inProgress' | 'completed'

export type Task = {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  status: Status;
}

export const useTaskStore = defineStore('task', () => {
  const tasks = useLocalStorage<Task[]>('tasks', [])
  const filters = ref<Status[]>([])

  const addTask = (task: Task) => {
    const id = Math.floor(Math.random() * 1000000)
    tasks.value.push({ ...task, id })
  }

  const removeTask = (id: number) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  const updateTask = (payload: Partial<Task>) => {
    const index = tasks.value.findIndex(task => task.id === payload.id)

    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...payload }
    }
  }

  const getTasksByStatus = (status: Status) => computed(
    () => tasks.value
      .filter((task) => filters.value.length === 0 || filters.value.includes(task.status))
      .filter((task) => task.status === status) ?? []
  )

  const toggleStatusFilter = (value: Status) => {
    if (filters.value.includes(value)) {
      filters.value = filters.value.filter(item => item !== value)
    } else {
      filters.value.push(value)
    }
  }

  return {
    tasks,
    filters,
    addTask,
    removeTask,
    updateTask,
    getTasksByStatus,
    toggleStatusFilter
  }
})
