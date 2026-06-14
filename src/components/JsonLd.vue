<script setup>
import { useHead } from '@unhead/vue'

const props = defineProps({
  book: Object
})

if (props.book) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: props.book.title,
    author: {
      '@type': 'Person',
      name: 'Міла Іванцова',
      sameAs: 'https://facebook.com/mila.ivantsova'
    },
    datePublished: props.book.year,
    numberOfPages: props.book.pages,
    publisher: {
      '@type': 'Organization',
      name: props.book.publisher
    },
    genre: props.book.genres.join(', '),
    inLanguage: 'uk',
    isbn: props.book.isbn || undefined
  }
  
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd)
      }
    ]
  })
}
</script>

<template>
  <!-- Este componente no renderiza nada visual -->
</template>