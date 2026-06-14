<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-950">
    <v-container>
      <h2 class="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
        {{ t('nav.books') }}
      </h2>
      <p class="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        {{ books.length }} творів сучасної української прози
      </p>
      
      <v-row>
        <v-col
          v-for="book in translatedBooks"
          :key="book.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="premium-card h-full cursor-pointer"
            elevation="2"
            @click="goToBook(book.id)"
          >
            <!-- Imagen de portada o placeholder -->
            <div class="aspect-[2/3] overflow-hidden rounded-t-lg bg-gradient-to-br from-premium-ukraine/20 to-premium-steel/20">
              <img 
                v-if="book.cover" 
                :src="book.cover.startsWith('/') ? book.cover : '/' + book.cover" 
                :alt="book.title"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              >
              <div v-else class="w-full h-full flex items-center justify-center">
                <v-icon size="64" color="premium-steel">mdi-book-open-variant</v-icon>
              </div>
            </div>
            
            <v-card-title class="font-serif font-semibold text-lg pt-4">
              {{ book.title }}
            </v-card-title>
            
            <v-card-subtitle class="text-premium-steel">
              {{ book.year }} • {{ book.publisher }}
            </v-card-subtitle>
            
            <v-card-text>
              <div class="flex flex-wrap gap-1 mt-2">
                <v-chip
                  v-for="genre in book.genres.slice(0, 2)"
                  :key="genre"
                  size="x-small"
                  class="bg-premium-ukraine/10"
                >
                  {{ genre }}
                </v-chip>
                <v-chip v-if="book.genres.length > 2" size="x-small">
                  +{{ book.genres.length - 2 }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'

const props = defineProps(['t', 'books', 'whatsappNumber'])
const router = useRouter()
const { translateBook } = useLanguage()

const translatedBooks = computed(() => {
  return props.books.map(b => translateBook(b))
})

const goToBook = (bookId) => {
  router.push(`/book/${bookId}`)
}
</script>