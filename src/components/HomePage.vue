<template>
  <div>
    <!-- SCHEMA.ORG PARA LA AUTORA Y EL SITIO -->
    <JsonLd :isHomePage="true" />
    
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
import { useHead } from '@unhead/vue'
import HeroSection from './HeroSection.vue'
import BookGrid from './BookGrid.vue'
import AuthorBio from './AuthorBio.vue'
import JsonLd from './JsonLd.vue'
import { books } from '../data/books.js'

const props = defineProps(['t', 'whatsappNumber'])
const baseUrl = 'https://milaivantsova.com'

// Schema.org ItemList para el catálogo (inyectado en <head>)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Libros de Міла Іванцова',
        description: 'Catálogo completo de libros de la escritora ucraniana Міла Іванцова',
        url: baseUrl,
        numberOfItems: books.length,
        itemListElement: books.map((book, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${baseUrl}/book/${book.id}`,
          name: book.title,
          description: `${book.title} - ${book.year}`,
          genre: book.genres.join(', ')
        }))
      }, null, 2)
    }
  ]
})
</script>