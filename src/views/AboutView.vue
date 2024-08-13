<script setup lang="ts">
import List from '@/components/List.vue'

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <section class="content">
      <List status="pending" />
      <List status="inProgress" />
      <List status="completed" />
    </section>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3rem;
}
</style>