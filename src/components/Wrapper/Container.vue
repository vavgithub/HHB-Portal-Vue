<template>
  <div :class="finalClassName" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'large'
  },
  className: {
    type: String,
    default: ''
  }
})

const baseClasses = 'w-full mx-auto'

const variants = {
  xtraLarge: 'max-w-[1920px]',
  large: 'max-w-[1440px]',
  medium: 'max-w-[1280px]',
  small: 'max-w-[1024px]',
  xsmall: 'max-w-[768px]',
}

const finalClassName = computed(() => {
  return `${baseClasses} ${variants[props.variant] || variants.large} ${props.className}`.trim()
})
</script>

