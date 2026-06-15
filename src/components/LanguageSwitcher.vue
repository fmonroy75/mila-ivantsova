<template>
  <v-btn
    variant="text"
    @click="toggleLanguage"
    class="text-capitalize language-switcher-btn"
    :style="{ color: textColor }"
  >
    {{ currentLanguage === 'uk' ? 'EN' : 'UA' }}
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

const props = defineProps({
  isScrolled: {
    type: Boolean,
    default: false
  }
})

const { currentLanguage, setLanguage } = useLanguage()

// Cambio de color del texto según scroll y modo oscuro/claro
const textColor = computed(() => {
  if (props.isScrolled) {
    return '#3B4A6B'
  }
  return '#6B7280'
})

const toggleLanguage = () => {
  const newLang = currentLanguage.value === 'uk' ? 'en' : 'uk'
  setLanguage(newLang)
}
</script>

<style scoped>
.language-switcher-btn {
  transition: all 0.3s ease;
  font-weight: 500;
}

.language-switcher-btn:hover {
  opacity: 0.8;
  transform: scale(1.05);
}
</style>