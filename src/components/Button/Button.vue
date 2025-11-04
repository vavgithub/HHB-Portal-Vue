<template>
  <button :class="combinedClassName" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  className: {
    type: String,
    default: ''
  }
})

const baseClasses = 'h-11 rounded-xl font-semibold text-base cursor-pointer px-4 py-4 flex items-center justify-center'

const variantClasses = {
  primary: 'button-primary',
  secondary: 'button-secondary'
}

const combinedClassName = computed(() => {
  return `${baseClasses} ${variantClasses[props.variant]} ${props.className}`.trim()
})
</script>

