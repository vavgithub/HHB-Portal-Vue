<template>
  <div class="flex items-center w-fit gap-1">
    <div :class="[color || 'bg-accent-900', 'w-2 h-2 rounded-sm']"></div>
    <span class="text-small-p">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: null
  },
  label: {
    type: String,
    required: true
  }
})
</script>

