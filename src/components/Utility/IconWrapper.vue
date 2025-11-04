<template>
  <div :class="combinedClasses" class="w-fit h-fit" v-bind="$attrs">
    <component :is="icon" :size="customSize || 16" :strokeWidth="customStrokeWidth || 1" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const variants = {
  primary: {
    bgColor: 'bg-background-primary',
    borderRadius: 'rounded-lg',
    padding: 'p-1'
  },
  secondary: {
    bgColor: 'bg-background-secondary',
    borderRadius: 'rounded-lg',
    padding: 'p-1'
  },
  tertiary: {
    bgColor: 'bg-background-tertiary',
    borderRadius: 'rounded-lg',
    padding: 'p-1'
  }
}

const props = defineProps({
  icon: {
    type: [Object, Function],
    required: true
  },
  variant: {
    type: String,
    default: 'primary'
  },
  className: {
    type: String,
    default: ''
  },
  padding: {
    type: String,
    default: null
  },
  bgColor: {
    type: String,
    default: null
  },
  borderRadius: {
    type: String,
    default: null
  },
  customStrokeWidth: {
    type: Number,
    default: null
  },
  customSize: {
    type: Number,
    default: null
  }
})

const variantConfig = variants[props.variant] || variants.primary

const finalBgColor = props.bgColor || variantConfig.bgColor
const finalBorderRadius = props.borderRadius || variantConfig.borderRadius
const finalPadding = props.padding || variantConfig.padding

const combinedClasses = computed(() => {
  return [
    finalPadding,
    finalBgColor,
    finalBorderRadius,
    props.className
  ].filter(Boolean).join(' ')
})
</script>

