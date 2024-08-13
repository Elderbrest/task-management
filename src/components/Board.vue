<script setup lang="ts">
import List from './List.vue'
import Filters from './Filters.vue'
</script>

<template>
  <div class="board-container">
    <div class="board-header">
      <h1 class="board-title">Tasks board</h1>
      <Filters />
    </div>
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
.board-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
}
.board-title {
  text-align: left;
}
.content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

@media only screen and (max-width: 1024px) {
  .content {
    justify-content: center;
  }
}
</style>
