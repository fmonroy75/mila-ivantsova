<template>
  <v-btn
    icon
    variant="text"
    @click="toggleTheme"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    class="theme-toggle-btn"
  >
    <v-icon :color="iconColor">{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const props = defineProps({
  isScrolled: {
    type: Boolean,
    default: false
  }
})

const { isDark, toggleTheme } = useTheme()

// Cambio de color del ícono según scroll y modo oscuro/claro
const iconColor = computed(() => {
  if (props.isScrolled) {
    return isDark.value ? '#5B7A9B' : '#3B4A6B'
  }
  return isDark.value ? '#9CA3AF' : '#6B7280'
})
</script>

<style scoped>
.theme-toggle-btn {
  transition: all 0.3s ease;
}

.theme-toggle-btn:hover {
  transform: rotate(15deg);
}
</style>