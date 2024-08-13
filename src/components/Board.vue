<script setup lang="ts">
import List from './List.vue'
</script>

<template>
  <div class="board-container">
    <h1 class="board-title">Tasks board</h1>
    <section class="content">
      <List status="pending" />
      <List status="inProgress" />
      <List status="completed" />
    </section>
  </div>
</template>

<style scoped>
.board-container {
  display: inline-flex;
  flex-direction: column;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
}
.board-title {
  text-align: left;
}
.content {
  display: flex;
  gap: 2rem;
}
</style>
