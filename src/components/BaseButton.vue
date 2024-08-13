<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue'

interface Props {
  color?: 'primary' | 'success' | 'warning' | 'error';
  variant?: 'primary' | 'outlined';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'primary'
})

const buttonStyleMap = {
  primary: {
    primary: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: '1px solid #007bff'
    },
    outlined: {
      backgroundColor: 'transparent',
      color: '#007bff',
      border: '1px solid #007bff'
    }
  },
  success: {
    primary: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: '1px solid #28a745'
    },
    outlined: {
      backgroundColor: 'transparent',
      color: '#28a745',
      border: '1px solid #28a745'
    }
  },
  warning: {
    primary: {
      backgroundColor: '#ffc107',
      color: '#fff',
      border: '1px solid #ffc107'
    },
    outlined: {
      backgroundColor: 'transparent',
      color: '#ffc107',
      border: '1px solid #ffc107'
    }
  },
  error: {
    primary: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: '1px solid #dc3545'
    },
    outlined: {
      backgroundColor: 'transparent',
      color: '#dc3545',
      border: '1px solid #dc3545'
    }
  }
}

const buttonStyle = computed(() => {
  return buttonStyleMap[props.color][props.variant]
})
</script>

<template>
  <button class="button" :style="buttonStyle">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  cursor: pointer;
  border-radius: 4px;
  font-weight: 500;
  min-width: 80px;
  transition: background-color 0.3s, color 0.3s, border 0.3s;
}
.button:hover {
  opacity: 0.9;
}
</style>
