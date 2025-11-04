<template>
  <a :class="combinedClassName" v-bind="$attrs">
    <slot />
  </a>
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

const baseClasses = 'text-decoration-none font-semibold cursor-pointer hover:text-accent-900 transition-colors duration-200'

const variantClasses = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  teritiary: 'text-text-secondary' // Note: keeping typo from original if it was intentional
}

const combinedClassName = computed(() => {
  return `${baseClasses} ${variantClasses[props.variant]} ${props.className}`.trim()
})
</script>

