<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <!-- CUSTOM CURSOR PREMIUM -->
    <div class="custom-cursor" :class="{ 'cursor-active': isCursorActive }"></div>
    <div class="custom-cursor-dot"></div>
    <!-- Navigation Bar SUPER PREMIUM -->
    <v-app-bar 
      flat 
      :class="['navbar-premium', { 'navbar-scrolled': isScrolled }]"
      :height="isScrolled ? 64 : 80"
      class="transition-all duration-300"
    >
      <v-container class="d-flex align-center justify-space-between h-100">
        <div class="d-flex align-center">
          <router-link to="/" class="text-decoration-none d-flex align-center gap-3 site-logo">
            <img
              src="/logo-icon.png"
              alt=""
              width="40"
              height="40"
              class="site-logo__icon transition-all duration-300"
              :style="{ width: isScrolled ? '32px' : '40px', height: isScrolled ? '32px' : '40px' }"
              loading="eager"
            />
            <v-app-bar-title class="font-serif font-semibold tracking-wide transition-all duration-300" :class="isScrolled ? 'text-lg' : 'text-xl'">
              <span class="text-premium-ukraine">Міла</span> Іванцова
            </v-app-bar-title>
          </router-link>
        </div>
        
        <div class="d-flex align-center gap-4">
          <router-link to="/" class="text-decoration-none">
            <v-btn variant="text" class="nav-btn">{{ t('nav.home') }}</v-btn>
          </router-link>
          <a href="#books-section" class="text-decoration-none" @click.prevent="scrollToBooks">
            <v-btn variant="text" class="nav-btn">{{ t('nav.books') }}</v-btn>
          </a>
          <a href="#author-section" class="text-decoration-none" @click.prevent="scrollToAuthor">
            <v-btn variant="text" class="nav-btn">{{ t('nav.author') }}</v-btn>
          </a>
          
          <v-divider vertical class="mx-2"></v-divider>
          
          <LanguageSwitcher :isScrolled="isScrolled" />
          <ThemeToggle :isScrolled="isScrolled" />
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content with Router -->
    <v-main :style="{ paddingTop: isScrolled ? '64px' : '80px' }">
      <router-view :t="t" :whatsappNumber="whatsappNumber" />
    </v-main>

    <!-- Footer Premium con marca IngeniumBright -->
    <v-footer class="footer-premium mt-16 py-8">
      <v-container>
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="auto" class="text-center text-md-start">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {{ t('footer.rights') }} &copy; {{ new Date().getFullYear() }} Міла Іванцова
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500">
              {{ t('footer.originalDesign') }}
            </p>
          </v-col>
          
          <v-col cols="12" md="auto" class="text-center text-md-end">
            <a
              href="https://ingeniumbright.com"
              target="_blank"
              rel="noopener noreferrer"
              class="brand-ingenium-link"
            >
              <div class="brand-ingenium">
                <div class="brand-logo">
                  <v-img 
                    src="/ingenium.png" 
                    alt="IngeniumBright" 
                    class="logo-img" 
                    cover
                  />
                </div>
                <div class="brand-text">
                  <p>{{ t('footer.techTagline') }}</p>
                  <h5>IngeniumBright</h5>
                </div>
              </div>
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from './composables/useTheme.js'
import { useLanguage } from './composables/useLanguage.js'
import ThemeToggle from './components/ThemeToggle.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const { isDark } = useTheme()
const { t } = useLanguage()
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '380000000000'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToBooks = () => {
  const booksSection = document.getElementById('books-section')
  if (booksSection) {
    booksSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToAuthor = () => {
  const authorSection = document.getElementById('author-section')
  if (authorSection) {
    authorSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


// Cursor personalizado
const cursorRef = ref(null)
const cursorDotRef = ref(null)
const isCursorActive = ref(false)

const handleMouseMove = (e) => {
  const cursor = document.querySelector('.custom-cursor')
  const cursorDot = document.querySelector('.custom-cursor-dot')
  if (!cursor || !cursorDot) return
  
  cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
  cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
}

const handleMouseOver = () => {
  isCursorActive.value = true
}

const handleMouseLeave = () => {
  isCursorActive.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  
  const interactiveElements = document.querySelectorAll('a, button, .v-btn, .v-card, .premium-card')
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', handleMouseOver)
    el.addEventListener('mouseleave', handleMouseLeave)
  })
})


// Scroll Reveal Animation
const observeElements = () => {
  const elements = document.querySelectorAll('[data-aos]')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0
        setTimeout(() => {
          entry.target.classList.add('aos-animate')
        }, delay)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  
  elements.forEach(el => observer.observe(el))
}


onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})



</script>

<style scoped>
.gap-4 {
  gap: 1rem;
}

.h-100 {
  height: 100%;
}

/* ========================================
   NAVBAR SUPER PREMIUM - GLASSMORPHISM
   ======================================== */

.navbar-premium {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(245, 243, 239, 0.85) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(59, 74, 107, 0.08);
  animation: slideDown 0.5s ease-out;
}

.dark .navbar-premium {
  background-color: rgba(10, 10, 10, 0.85) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* Animación de entrada */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Estado cuando hay scroll */
.navbar-premium.navbar-scrolled {
  background-color: rgba(245, 243, 239, 0.95) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(59, 74, 107, 0.15);
}

.dark .navbar-premium.navbar-scrolled {
  background-color: rgba(10, 10, 10, 0.95) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Botones de navegación con efecto hover premium */
.nav-btn {
  position: relative;
  transition: all 0.3s ease;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.nav-btn::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3B4A6B, #5B7A9B);
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 2px;
}

.nav-btn:hover::after {
  width: 70%;
}

.dark .nav-btn::after {
  background: linear-gradient(90deg, #5B7A9B, #7B9AB5);
}

/* Logo del sitio */
.site-logo {
  transition: opacity 0.2s ease;
}

.site-logo:hover {
  opacity: 0.85;
}

.site-logo__icon {
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ========================================
   FOOTER PREMIUM - ESTILO INGENIUMBRIGHT
   ======================================== */

.footer-premium {
  background-color: transparent;
  border-top: 1px solid rgba(128, 128, 128, 0.1);
}

/* Tarjeta de IngeniumBright - Estilo premium */
.brand-ingenium-link {
  text-decoration: none;
  display: inline-block;
}

.brand-ingenium {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(59, 74, 107, 0.03);
  border: 1px solid rgba(59, 74, 107, 0.1);
  padding: 20px 32px;
  border-radius: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.dark .brand-ingenium {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.brand-ingenium:hover {
  border-color: rgba(245, 166, 35, 0.4);
  background: rgba(245, 166, 35, 0.05);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.brand-logo {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #3B4A6B, #5B7A9B);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;
}

.dark .brand-logo {
  background: linear-gradient(135deg, #5B7A9B, #7B9AB5);
}

.brand-ingenium:hover .brand-logo {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(91, 122, 155, 0.5);
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-text {
  text-align: left;
}

.brand-text h5 {
  color: #1a1a1a;
  margin-bottom: 4px;
  font-size: 1.3rem;
  font-weight: 700;
  transition: color 0.3s ease;
  letter-spacing: -0.3px;
}

.dark .brand-text h5 {
  color: #ffffff;
}

.brand-ingenium:hover .brand-text h5 {
  color: #3B4A6B;
}

.dark .brand-ingenium:hover .brand-text h5 {
  color: #5B7A9B;
}

.brand-text p {
  color: #3B4A6B;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  font-weight: 700;
  margin-bottom: 4px;
}

.dark .brand-text p {
  color: #5B7A9B;
}

/* ========================================
   RESPONSIVE
   ======================================== */

@media (max-width: 960px) {
  .brand-ingenium {
    padding: 16px 24px;
    gap: 16px;
    justify-content: center;
    margin-top: 16px;
  }

  .brand-logo {
    width: 48px;
    height: 48px;
  }

  .brand-text h5 {
    font-size: 1.1rem;
  }
  
  .brand-text p {
    font-size: 0.65rem;
    letter-spacing: 1.5px;
  }
  
  .nav-btn::after {
    display: none;
  }
}

@media (max-width: 600px) {
  .brand-ingenium {
    padding: 12px 20px;
    gap: 12px;
  }

  .brand-logo {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }

  .brand-text h5 {
    font-size: 1rem;
  }

  .brand-text p {
    font-size: 0.6rem;
    letter-spacing: 1.2px;
  }
}

/* CUSTOM CURSOR PREMIUM */
.custom-cursor {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(59, 74, 107, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  backdrop-filter: blur(4px);
  background: rgba(59, 74, 107, 0.05);
}

.dark .custom-cursor {
  border-color: rgba(91, 122, 155, 0.4);
  background: rgba(91, 122, 155, 0.08);
}

.custom-cursor.cursor-active {
  width: 60px;
  height: 60px;
  border-color: rgba(245, 166, 35, 0.6);
  background: rgba(245, 166, 35, 0.1);
  backdrop-filter: blur(6px);
}

.custom-cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #3B4A6B, #5B7A9B);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.1s ease;
}

.dark .custom-cursor-dot {
  background: linear-gradient(135deg, #5B7A9B, #7B9AB5);
}

/* Ocultar cursor personalizado en móviles */
@media (max-width: 768px) {
  .custom-cursor,
  .custom-cursor-dot {
    display: none;
  }
}

/* SCROLL REVEAL PREMIUM */
[data-aos] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

[data-aos="fade-up"] {
  transform: translateY(30px);
}

[data-aos="fade-left"] {
  transform: translateX(-30px);
}

[data-aos="fade-right"] {
  transform: translateX(30px);
}

[data-aos="zoom-in"] {
  transform: scale(0.9);
}

.aos-animate {
  opacity: 1 !important;
  transform: translate(0) scale(1) !important;
}
</style>