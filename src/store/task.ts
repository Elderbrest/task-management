import { defineStore } from 'pinia'
import { computed } from 'vue'
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

  const addTask = (task: Task) => {
    const id = Math.floor(Math.random() * 1000000)
    tasks.value.push({ ...task, id })
  }

  const removeTask = (id: number) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  const updateTask = (payload: Task) => {
    const index = tasks.value.findIndex(task => task.id === payload.id)

    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...payload }
    }
  }

  const inProgressTasks = computed(() => {
    return tasks.value.filter(task => task.status === 'inProgress')
  })

  const pendingTasks = computed(() => {
    return tasks.value.filter(task => task.status === 'pending')
  })

  const completedTasks = computed(() => {
    return tasks.value.filter(task => task.status === 'completed')
  })

  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
    inProgressTasks,
    pendingTasks,
    completedTasks
  }
})
