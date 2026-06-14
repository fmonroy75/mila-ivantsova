<template>
  <div>
    <HeroSection :t="t" />
    <div id="books-section">
      <BookGrid :t="t" :books="books" :whatsappNumber="whatsappNumber" />
    </div>
    <div id="author-section">
      <AuthorBio :t="t" />
    </div>
  </div>
</template>

<script setup>
import HeroSection from './HeroSection.vue'
import BookGrid from './BookGrid.vue'
import AuthorBio from './AuthorBio.vue'
import { books } from '../data/books.js'

defineProps(['t', 'whatsappNumber'])
</script>