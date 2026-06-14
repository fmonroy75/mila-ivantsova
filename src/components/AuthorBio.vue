<template>
  <section class="py-20">
    <v-container>
      <v-row class="items-center">
        <v-col cols="12" md="6" class="order-2 order-md-1">
          <h2 class="text-3xl md:text-4xl font-serif font-bold mb-4">
            {{ t('author.title') }}
          </h2>
          
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {{ t('author.bio') }}
          </p>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p class="text-2xl font-bold text-premium-ukraine">{{ t('author.booksCount') }}</p>
              <p class="text-sm">{{ t('author.publishedWorks') }}</p>
            </div>
            <div class="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p class="text-2xl font-bold text-premium-ukraine">{{ t('author.yearsActive') }}</p>
              <p class="text-sm">Активна творчість</p>
            </div>
          </div>
          
          <v-icon icon="mdi-format-quote-open" size="32" color="premium-steel" class="mb-2"></v-icon>
          <p class="text-xl italic text-gray-500 dark:text-gray-400 border-l-4 border-premium-ukraine pl-4">
            {{ t('author.quote') }}
          </p>
        </v-col>
        
        <v-col cols="12" md="6" class="order-1 order-md-2 mb-8 mb-md-0">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-br from-premium-ukraine/20 to-premium-steel/20 rounded-2xl transform rotate-3"></div>
            <div class="relative rounded-2xl aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800">
              <img 
                v-if="authorPhoto" 
                :src="authorPhoto" 
                alt="Міла Іванцова"
                class="w-full h-full object-cover"
              >
              <div v-else class="w-full h-full flex items-center justify-center">
                <v-icon size="80" color="premium-steel">mdi-account-circle</v-icon>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
defineProps(['t'])

// Ruta fija para la foto de autora
const authorPhoto = '/author/mila-ivantsova.jpg'
</script>