<template>
  <div class="min-h-screen w-full overflow-x-clip bg-background-secondary p-4">
    <Sidebar :sidebarOpen="sidebarOpen" @update:sidebarOpen="setSidebarOpen" />
    <main :class="mainClasses">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Sidebar from '../Sidebar/Sidebar.vue'
import { useIsLarge, useIsXSmall } from '../../composables/useMediaQuery'

const isLarge = useIsLarge()
const isXSmall = useIsXSmall()
const sidebarOpen = ref(true)

watch(isLarge, (newValue) => {
  if (newValue) {
    sidebarOpen.value = false
  } else {
    sidebarOpen.value = true
  }
})

const setSidebarOpen = (value) => {
  sidebarOpen.value = value
}

const mainClasses = computed(() => {
  if (sidebarOpen.value) {
    return 'w-[calc(100%-12.5rem)] ml-[12.5rem]'
  } else if (!isXSmall.value) {
    return 'w-[calc(100%-5rem)] ml-[5rem]'
  } else {
    return 'w-full ml-0 pt-8'
  }
})
</script>

