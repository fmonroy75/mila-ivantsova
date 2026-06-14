<template>
  <section data-section="books" id="books" class="py-20 bg-gray-50 dark:bg-gray-950">
    <v-container>
      <h2 class="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
        {{ t('nav.books') }}
      </h2>
      <p class="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        {{ books.length }} творів сучасної української прози
      </p>
      
      <v-row>
        <v-col
          v-for="book in books"
          :key="book.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="premium-card h-full cursor-pointer"
            elevation="2"
            @click="openBookModal(book)"
          >
            <!-- Book cover placeholder -->
            <div class="aspect-[2/3] bg-gradient-to-br from-premium-ukraine/20 to-premium-steel/20 flex items-center justify-center">
              <v-icon size="64" color="premium-steel">mdi-book-open-variant</v-icon>
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
    
    <!-- Book Modal -->
    <v-dialog
      v-model="selectedBook"
      max-width="800px"
      scrollable
    >
      <template v-if="selectedBookData">
        <v-card>
          <v-card-title class="font-serif text-h4 py-4">
            {{ selectedBookData.title }}
            <v-spacer></v-spacer>
            <v-btn icon @click="selectedBook = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          
          <v-divider></v-divider>
          
          <v-card-text class="py-4">
            <v-row>
              <v-col cols="12" md="4">
                <div class="aspect-[2/3] bg-gradient-to-br from-premium-ukraine/20 to-premium-steel/20 flex items-center justify-center rounded-lg">
                  <v-icon size="64" color="premium-steel">mdi-book-open-variant</v-icon>
                </div>
              </v-col>
              
              <v-col cols="12" md="8">
                <p class="text-premium-steel mb-2">
                  {{ t('book.published') }}: {{ selectedBookData.year }} • {{ selectedBookData.pages }} {{ t('book.pages') }}
                </p>
                <p class="mb-2">
                  <strong>{{ t('book.publisher') }}:</strong> {{ selectedBookData.publisher }} ({{ selectedBookData.city }})
                </p>
                <p class="mb-2">
                  <strong>{{ t('book.genres') }}:</strong>
                </p>
                <div class="flex flex-wrap gap-1 mb-3">
                  <v-chip v-for="genre in selectedBookData.genres" :key="genre" size="small">
                    {{ genre }}
                  </v-chip>
                </div>
                <p v-if="selectedBookData.authors.length > 1" class="mb-3">
                  <strong>{{ t('book.authors') }}:</strong> {{ selectedBookData.authors.join(', ') }}
                </p>
                
                <v-btn
                  :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Добрий день! Хочу придбати книгу «${selectedBookData.title}» (${selectedBookData.year})`)}`"
                  target="_blank"
                  color="success"
                  block
                  class="mt-4"
                  prepend-icon="mdi-whatsapp"
                >
                  {{ t('book.buyWhatsapp') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['t', 'books', 'whatsappNumber'])
const selectedBook = ref(false)
const selectedBookData = ref(null)

const openBookModal = (book) => {
  selectedBookData.value = book
  selectedBook.value = true
}
</script>