<template>
  <div :class="badgeClasses">
    {{ text }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'info'
  },
  text: {
    type: String,
    default: 'Badge'
  },
  bgColor: {
    type: String,
    default: ''
  },
  paddingX: {
    type: String,
    default: 'px-2'
  },
  paddingY: {
    type: String,
    default: 'py-1'
  },
  className: {
    type: String,
    default: ''
  },
  borderRadius: {
    type: String,
    default: 'rounded-full'
  }
})

const getVariantStyles = (variant) => {
  switch (variant) {
    case 'info':
      return {
        border: 'border-info-900',
        background: 'bg-info-800',
        text: 'text-text-primary'
      }
    case 'error':
      return {
        border: 'border-error-900',
        background: 'bg-error-800',
        text: 'text-text-primary'
      }
    case 'alert':
      return {
        border: 'border-alert-900',
        background: 'bg-alert-800',
        text: 'text-text-primary'
      }
    case 'success':
      return {
        border: 'border-success-900',
        background: 'bg-success-800',
        text: 'text-text-primary'
      }
    default:
      return {
        border: 'border-info-900',
        background: 'bg-info-800',
        text: 'text-text-primary'
      }
  }
}

const variantStyles = computed(() => getVariantStyles(props.variant))

const badgeClasses = computed(() => {
  return [
    'border',
    'w-fit',
    'leading-[0.85]',
    'h-6',
    props.paddingX,
    props.paddingY,
    props.borderRadius,
    variantStyles.value.border,
    props.bgColor || variantStyles.value.background,
    variantStyles.value.text,
    props.className
  ].filter(Boolean).join(' ')
})
</script>

