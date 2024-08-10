import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

type Status = 'pending' | 'inProgress' | 'completed'

export type Task = {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  status: Status;
}

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])

  const addTask = (task: Task) => {
    tasks.value.push(task)
  }

  const removeTask = (id: number) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
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
    inProgressTasks,
    pendingTasks,
    completedTasks
  }
})
