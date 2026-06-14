<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <!-- Navigation Bar -->
    <v-app-bar flat color="transparent" class="border-b border-gray-200 dark:border-gray-800">
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <router-link to="/" class="text-decoration-none">
            <v-app-bar-title class="font-serif text-xl font-semibold tracking-wide">
              <span class="text-premium-ukraine">Міла</span> Іванцова
            </v-app-bar-title>
          </router-link>
        </div>
        
        <div class="d-flex align-center gap-4">
          <router-link to="/" class="text-decoration-none">
            <v-btn variant="text">{{ t('nav.home') }}</v-btn>
          </router-link>
          <a href="#books-section" class="text-decoration-none" @click.prevent="scrollToBooks">
            <v-btn variant="text">{{ t('nav.books') }}</v-btn>
          </a>
          <a href="#author-section" class="text-decoration-none" @click.prevent="scrollToAuthor">
            <v-btn variant="text">{{ t('nav.author') }}</v-btn>
          </a>
          
          <v-divider vertical class="mx-2"></v-divider>
          
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content with Router -->
    <v-main>
      <router-view :t="t" :whatsappNumber="whatsappNumber" />
    </v-main>

    <!-- Footer Premium con marca IngeniumBright -->
<!-- Footer con imagen real -->
<!-- Footer Premium con marca IngeniumBright (estilo mejorado) -->
    <v-footer class="footer-premium mt-16 py-8">
      <v-container>
        <v-row align="center" justify="space-between">
          <!-- Columna izquierda: Copyright -->
          <v-col cols="12" md="auto" class="text-center text-md-start">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {{ t('footer.rights') }} &copy; {{ new Date().getFullYear() }} Міла Іванцова
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500">
              {{ t('footer.originalDesign') }}
            </p>
          </v-col>
          
          <!-- Columna derecha: Tarjeta IngeniumBright Premium -->
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
import { useTheme } from './composables/useTheme.js'
import { useLanguage } from './composables/useLanguage.js'
import ThemeToggle from './components/ThemeToggle.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const { isDark } = useTheme()
const { t } = useLanguage()
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '380000000000'

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
</script>

<style scoped>
.gap-4 {
  gap: 1rem;
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

/* Modo oscuro */
.dark .brand-ingenium {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Hover effects */
.brand-ingenium:hover {
  border-color: rgba(245, 166, 35, 0.4);
  background: rgba(245, 166, 35, 0.05);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.dark .brand-ingenium:hover {
  background: rgba(245, 166, 35, 0.08);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* Logo con gradiente */
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

/* En modo oscuro el logo tiene otro gradiente */
.dark .brand-logo {
  background: linear-gradient(135deg, #5B7A9B, #7B9AB5);
}

/* Hover del logo */
.brand-ingenium:hover .brand-logo {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(91, 122, 155, 0.5);
}

/* Imagen del logo */
.logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Texto de la marca */
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
</style>