<template>
  <Card variant="primary" :class="['flex flex-col gap-4', className]">
    <div class="flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-2">
        <IconWrapper bgColor="bg-grayscale-150" :customSize="16" :icon="icon" />
        <p class="text-text-primary text-large-p">{{ title }}</p>
      </div>
      <div v-if="topRightContent || $slots.topRight" class="flex-shrink-0">
        <slot name="topRight" />
        <component :is="() => topRightContent" v-if="typeof topRightContent === 'function'" />
        <div v-else-if="topRightContent">{{ topRightContent }}</div>
      </div>
    </div>
    <div class="flex-1 min-h-0">
      <slot />
    </div>
  </Card>
</template>

<script setup>
import Card from './Card.vue'
import IconWrapper from '../Utility/IconWrapper.vue'

defineProps({
  icon: {
    type: [Object, Function],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  topRightContent: {
    type: [String, Object, Function],
    default: null
  }
})
</script>

