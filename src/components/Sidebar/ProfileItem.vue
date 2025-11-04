<template>
  <router-link
    :to="to"
    :class="navClasses"
    class="flex items-center gap-2 py-3 h-11 hover-class rounded-xl transition-colors duration-200"
  >
    <IconWrapper
      :icon="User"
      :customStrokeWidth="isActive ? 2 : 1"
      bgColor="bg-grayscale-150"
    />
    <span v-if="!shrink" class="tracking-wider">User</span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { User } from 'lucide-vue-next'
import IconWrapper from '../Utility/IconWrapper.vue'

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  shrink: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()

const isActive = computed(() => {
  return route.path === props.to || route.path.startsWith(props.to + '/')
})

const navClasses = computed(() => {
  return [
    !props.shrink ? 'px-4' : 'justify-center',
    isActive.value ? 'selection-class' : 'text-text-secondary'
  ].filter(Boolean).join(' ')
})
</script>

