<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="taskName">Title</label>
      <input
          id="taskName"
          type="text"
          v-model="formData.taskName"
          required
      />
    </div>

    <div class="form-group">
      <label for="taskDescription">Description</label>
      <textarea
          id="taskDescription"
          v-model="formData.taskDescription"
          rows="5"
          required
      ></textarea>
    </div>

    <div class="form-group">
      <label for="dueDate">Due Date</label>
      <input
          id="dueDate"
          type="date"
          v-model="formData.dueDate"
          required
      />
    </div>
  </form>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      taskName: '',
      taskDescription: '',
      dueDate: '',
    }),
  },
});

const emit = defineEmits(['submit']);

const formData = reactive({ ...props.initialData });

const handleSubmit = () => {
  emit('submit', { ...formData });
};
</script>

<style scoped>
.form-group {
  margin-top: 1rem;
  text-align: left;
}

label {
  font-size: 12px;
  margin-bottom: 8px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
