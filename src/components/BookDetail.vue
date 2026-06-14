<template>
  <div class="min-h-screen py-20">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <div class="aspect-[2/3] bg-gradient-to-br from-premium-ukraine/20 to-premium-steel/20 rounded-xl flex items-center justify-center">
            <v-icon size="120" color="premium-steel">mdi-book-open-variant</v-icon>
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
          <p class="mb-2">
            <strong>📄 {{ t('book.pages') }}:</strong> {{ book.pages }}
          </p>
          
          <div class="mt-6">
            <v-btn
              :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Добрий день! Хочу придбати книгу «${book.title}» (${book.year})`)}`"
              target="_blank"
              color="success"
              size="large"
              prepend-icon="mdi-whatsapp"
            >
              {{ t('book.buyWhatsapp') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { books } from '../data/books.js'

const route = useRoute()
const book = ref(null)
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER

onMounted(() => {
  const id = parseInt(route.params.id)
  book.value = books.find(b => b.id === id)
})
</script>