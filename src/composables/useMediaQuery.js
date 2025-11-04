import { ref, watch, onMounted, onUnmounted } from 'vue'

const useMediaQuery = (query) => {
  const matches = ref(false)

  const updateMatches = () => {
    matches.value = window.matchMedia(query).matches
  }

  onMounted(() => {
    updateMatches()
    const media = window.matchMedia(query)
    
      media.addEventListener('change', updateMatches)
  })

  onUnmounted(() => {
    const media = window.matchMedia(query)
      media.removeEventListener('change', updateMatches)

  })

  return matches
}

// Predefined breakpoints
export const useIsLarge = () => useMediaQuery('(max-width: 1440px)')
export const useIsMedium = () => useMediaQuery('(max-width: 1280px)')
export const useIsSmall = () => useMediaQuery('(max-width: 768px)')
export const useIsXSmall = () => useMediaQuery('(max-width: 576px)')

export default useMediaQuery

