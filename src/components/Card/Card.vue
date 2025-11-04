<template>
  <div :class="[baseClasses, combinedClasses]" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const variants = {
  primary: {
    bgColor: 'bg-background-primary',
    textColor: 'text-text-primary',
    borderRadius: 'rounded-xl',
    padding: 'p-4',
    hover: 'hover:scale-[1.02] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.07)] transition-all duration-300'
  },
  secondary: {
    bgColor: 'bg-background-secondary',
    textColor: 'text-text-secondary',
    borderRadius: 'rounded-xl',
    padding: 'p-4',
    hover: 'hover:scale-[1.02] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.07)] transition-all duration-300'
  },
  tertiary: {
    bgColor: 'bg-background-tertiary',
    textColor: 'text-text-tertiary',
    borderRadius: 'rounded-xl',
    padding: 'p-4',
    hover: 'hover:scale-[1.02] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.07)] transition-all duration-300'
  }
}

const props = defineProps({
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
  textColor: {
    type: String,
    default: null
  },
  hover: {
    type: String,
    default: null
  }
})

const baseClasses = 'rounded-xl overflow-hidden'

const variantConfig = variants[props.variant] || variants.primary

const finalBgColor = props.bgColor || variantConfig.bgColor
const finalTextColor = props.textColor || variantConfig.textColor
const finalBorderRadius = props.borderRadius || variantConfig.borderRadius
const finalPadding = props.padding || variantConfig.padding
const finalHover = props.hover || variantConfig.hover

const combinedClasses = computed(() => {
  return [
    finalPadding,
    finalBgColor,
    finalTextColor,
    finalBorderRadius,
    finalHover,
    props.className
  ].filter(Boolean).join(' ')
})
</script>

