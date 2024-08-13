<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({ isOpen: Boolean })

const emit = defineEmits(['modal-close'])

const target = ref(null)
onClickOutside(target, () => emit('modal-close'))
</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <h4 class="modal-header">
          <slot name="header"></slot>
        </h4>
        <div class="modal-body">
          <slot name="content"> default content </slot>
        </div>
        <div class="modal-footer">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 16px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modal-header {
  text-align: left;
  font-weight: bold;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
  padding-top: 1rem;
}
</style>
