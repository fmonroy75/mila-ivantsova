<template>
  <v-btn
    variant="text"
    @click="toggleLanguage"
    class="text-capitalize"
  >
    {{ currentLanguage === 'uk' ? 'EN' : 'UA' }}
  </v-btn>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'

const { currentLanguage, setLanguage } = useLanguage()

const toggleLanguage = () => {
  const newLang = currentLanguage.value === 'uk' ? 'en' : 'uk'
  setLanguage(newLang)
}
</script>