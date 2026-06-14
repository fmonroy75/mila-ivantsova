<template>
  <div v-if="book" class="min-h-screen py-20">
    <JsonLd :book="book" />
    <v-container>
      <v-btn
        variant="text"
        class="mb-6"
        @click="$router.push('/')"
        prepend-icon="mdi-arrow-left"
      >
        {{ t('book.backToCatalog') }}
      </v-btn>
      
      <v-row>
        <v-col cols="12" md="5">
          <!-- Imagen de portada o placeholder -->
          <div class="aspect-[2/3] rounded-xl overflow-hidden bg-gradient-to-br from-premium-ukraine/20 to-premium-steel/20">
            <img 
              v-if="book.cover" 
              :src="book.cover.startsWith('/') ? book.cover : '/' + book.cover" 
              :alt="book.title"
              class="w-full h-full object-cover"
            >
            <div v-else class="w-full h-full flex items-center justify-center">
              <v-icon size="80" color="premium-steel">mdi-book-open-variant</v-icon>
            </div>
          </div>
        </v-col>
        
        <v-col cols="12" md="7">
          <h1 class="text-4xl md:text-5xl font-serif font-bold mb-4">{{ book.title }}</h1>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <v-chip v-for="genre in book.genres" :key="genre">{{ genre }}</v-chip>
          </div>
          
          <v-divider class="my-4"></v-divider>
          
          <p class="text-premium-steel mb-2">
            <strong>📅 {{ t('book.published') }}:</strong> {{ book.year }}
          </p>
          <p class="mb-2">
            <strong>🏢 {{ t('book.publisher') }}:</strong> {{ book.publisher }} ({{ book.city }})
          </p>
          <p class="mb-4">
            <strong>📄 {{ t('book.pages') }}:</strong> {{ book.pages }}
          </p>
          
          <div v-if="book.authors.length > 1" class="mb-4">
            <strong>{{ t('book.authors') }}:</strong>
            <p class="text-gray-600 dark:text-gray-400">{{ book.authors.join(', ') }}</p>
          </div>
          
          <v-btn
            :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Добрий день! Хочу придбати книгу «${book.title}» (${book.year})`)}`"
            target="_blank"
            color="success"
            size="large"
            prepend-icon="mdi-whatsapp"
            class="mt-4"
          >
            {{ t('book.buyWhatsapp') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { books } from '../data/books.js'
import { useLanguage } from '../composables/useLanguage.js'
import JsonLd from './JsonLd.vue'

const route = useRoute()
const props = defineProps(['whatsappNumber'])
const { t, translateBook } = useLanguage()
const bookRaw = ref(null)

const book = computed(() => {
  return translateBook(bookRaw.value)
})

const loadBook = () => {
  const id = parseInt(route.params.id)
  bookRaw.value = books.find(b => b.id === id)
}

onMounted(loadBook)
watch(() => route.params.id, loadBook)

watch([book, t], () => {
  if (book.value) {
    document.title = `${book.value.title} | Міла Іванцова`
  }
}, { immediate: true })
</script>