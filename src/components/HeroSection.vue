<template>
  <section data-section="home" class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- Animated background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-premium-ukraine/10 via-transparent to-premium-steel/10 animate-pulse"></div>
    
    <v-container class="text-center relative z-10 py-20">
      <h1 data-aos="zoom-in" class="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-6 text-balance">
        Міла Іванцова
      </h1>
      
      <p data-aos="fade-up" data-aos-delay="200" class="text-xl md:text-2xl lg:text-3xl text-premium-steel dark:text-gray-400 italic mb-8 font-serif">
        «{{ t('hero.epigraph') }}»
      </p>
      
      <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        {{ t('hero.subtitle') }}
      </p>
      
      <v-btn data-aos="fade-up" data-aos-delay="400"
        size="large"
        color="primary"
        variant="flat"
        class="px-8 py-6 text-lg"
        @click="scrollToBooks"
      >
        {{ t('hero.cta') }}
        <v-icon end class="ml-2">mdi-arrow-right</v-icon>
      </v-btn>
    </v-container>
  </section>
</template>

<script setup>
const props = defineProps(['t'])

const scrollToBooks = () => {
  const booksSection = document.getElementById('books')
  if (booksSection) {
    booksSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>