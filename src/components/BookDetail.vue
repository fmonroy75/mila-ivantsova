<template>
  <div v-if="translatedBook" class="min-h-screen py-20">
    <JsonLd :book="translatedBook" />
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
          <div class="aspect-[2/3] rounded-xl overflow-hidden bg-gradient-to-br from-premium-ukraine/20 to-premium-steel/20">
            <img 
  v-if="translatedBook.cover && imageExists" 
  :src="getCoverUrl(translatedBook.cover)"
  :alt="translatedBook.title"
  class="w-full h-full object-cover"
  @error="imageExists = false"
>
            <div v-else class="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <v-icon size="64" color="premium-steel" class="mb-4">mdi-book-open-variant</v-icon>
              <p class="text-sm text-premium-steel font-serif">{{ translatedBook.title }}</p>
              <p class="text-xs text-gray-400 mt-2">{{ translatedBook.year }}</p>
            </div>
          </div>
        </v-col>
        
        <v-col cols="12" md="7">
          <h1 class="text-4xl md:text-5xl font-serif font-bold mb-4">{{ translatedBook.title }}</h1>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <v-chip v-for="genre in translatedBook.genres" :key="genre">{{ genre }}</v-chip>
          </div>
          
          <v-divider class="my-4"></v-divider>
          
          <p class="text-premium-steel mb-2">
            <strong>📅 {{ t('book.published') }}:</strong> {{ translatedBook.year }}
          </p>
          <p class="mb-2">
            <strong>🏢 {{ t('book.publisher') }}:</strong> {{ translatedBook.publisher }} ({{ translatedBook.city }})
          </p>
          <p class="mb-4">
            <strong>📄 {{ t('book.pages') }}:</strong> {{ translatedBook.pages }}
          </p>
          
          <div v-if="translatedBook.authors && translatedBook.authors.length > 1" class="mb-4">
            <strong>{{ t('book.authors') }}:</strong>
            <p class="text-gray-600 dark:text-gray-400">{{ translatedBook.authors.join(', ') }}</p>
          </div>
          
          <v-btn
            :href="whatsappLink"
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
const props = defineProps(['t', 'whatsappNumber'])
const { currentLanguage, translateBook, getWhatsAppMessage } = useLanguage()
const originalBook = ref(null)
const translatedBook = ref(null)
const imageExists = ref(true)

/*funcion para traer la ruta de las imagenes*/
const getCoverUrl = (cover) => {
  if (!cover) return null
  return import.meta.env.BASE_URL + cover
}
/*--*/

const whatsappLink = computed(() => {
  if (!translatedBook.value) return '#'
  const message = getWhatsAppMessage(translatedBook.value.title, translatedBook.value.year)
  return `https://wa.me/${props.whatsappNumber}?text=${encodeURIComponent(message)}`
})

const loadBook = () => {
  const id = parseInt(route.params.id)
  originalBook.value = books.find(b => b.id === id)
  
  if (originalBook.value) {
    translatedBook.value = translateBook(originalBook.value)
    document.title = `${translatedBook.value.title} | Міла Іванцова`
  }
  
  imageExists.value = true
}

watch(currentLanguage, () => {
  if (originalBook.value) {
    translatedBook.value = translateBook(originalBook.value)
    document.title = `${translatedBook.value.title} | Міла Іванцова`
  }
})

onMounted(loadBook)
watch(() => route.params.id, loadBook)
</script>