<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <v-app-bar flat color="transparent" class="border-b border-gray-200 dark:border-gray-800">
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-app-bar-title class="font-serif text-xl font-semibold tracking-wide">
            <span class="text-premium-ukraine">Міла</span> Іванцова
          </v-app-bar-title>
        </div>
        
        <div class="d-flex align-center gap-4">
          <v-btn variant="text" @click="scrollToSection('home')">{{ t('nav.home') }}</v-btn>
          <v-btn variant="text" @click="scrollToSection('books')">{{ t('nav.books') }}</v-btn>
          <v-btn variant="text" @click="scrollToSection('author')">{{ t('nav.author') }}</v-btn>
          
          <v-divider vertical class="mx-2"></v-divider>
          
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </v-container>
    </v-app-bar>
    
    <v-main>
      <router-view :t="t" :whatsappNumber="whatsappNumber" />
    </v-main>

    <!-- Footer -->
    <v-footer class="border-t border-gray-200 dark:border-gray-800 mt-16 py-8">
      <v-container>
        <div class="text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ t('footer.rights') }} &copy; {{ new Date().getFullYear() }} Міла Іванцова
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {{ t('footer.credit') }}
            <a 
              href="https://ingeniumbright.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hover:text-premium-ukraine transition-colors"
            >
              ingeniumbright.com
            </a>
            <span class="mx-1">•</span>
            {{ t('footer.originalDesign') }}
          </p>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import BookGrid from './components/BookGrid.vue'
import AuthorBio from './components/AuthorBio.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { books } from './data/books.js'
import { useLanguage } from './composables/useLanguage.js'
import { useTheme } from './composables/useTheme.js'

const { t, currentLanguage } = useLanguage()
const { isDark } = useTheme()

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '380000000000'

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Ensure sections have IDs after mount
onMounted(() => {
  if (!document.getElementById('home')) {
    const hero = document.querySelector('[data-section="home"]')
    if (hero) hero.id = 'home'
  }
  if (!document.getElementById('books')) {
    const booksSection = document.querySelector('[data-section="books"]')
    if (booksSection) booksSection.id = 'books'
  }
  if (!document.getElementById('author')) {
    const authorSection = document.querySelector('[data-section="author"]')
    if (authorSection) authorSection.id = 'author'
  }
})
</script>

<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>