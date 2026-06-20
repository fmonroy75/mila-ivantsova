<script setup>
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

const props = defineProps({
  book: {
    type: Object,
    default: null
  },
  isBookPage: {
    type: Boolean,
    default: false
  }
})

const { currentLanguage } = useLanguage()
const baseUrl = 'https://milaivantsova.com'
const currentUrl = computed(() => {
  if (props.isBookPage && props.book) {
    return `${baseUrl}/book/${props.book.id}`
  }
  return baseUrl
})

// ========================================
// 1. SCHEMA: Person (Autora)
// ========================================
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Міла Іванцова',
  alternateName: 'Mila Ivantsova',
  description: 'Сучасна українська письменниця, авторка 34 книг сучасної прози. Київська авторка терапевтичної прози.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Київ',
    addressCountry: 'UA'
  },
  sameAs: [
    'https://facebook.com/mila.ivantsova',
    'https://www.instagram.com/mila.ivantsova/'
  ],
  url: baseUrl,
  mainEntityOfPage: baseUrl,
  worksFor: {
    '@type': 'Organization',
    name: 'IngeniumBright Studio'
  }
}

// ========================================
// 2. SCHEMA: WebSite
// ========================================
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Міла Іванцова | Сучасна українська письменниця',
  alternateName: 'Mila Ivantsova | Contemporary Ukrainian Writer',
  url: baseUrl,
  description: 'Sitio oficial de Mila Ivantsova. Autora de 34 libros de prosa contemporánea ucraniana. Lectura terapéutica.',
  inLanguage: currentLanguage.value === 'uk' ? 'uk' : 'en',
  publisher: {
    '@type': 'Person',
    name: 'Міла Іванцова'
  },
  about: {
    '@type': 'Thing',
    name: 'Literatura ucraniana contemporánea'
  }
}

// ========================================
// 3. SCHEMA: Organization (IngeniumBright)
// ========================================
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'IngeniumBright Studio',
  url: 'https://ingeniumbright.com',
  description: 'Estudio de desarrollo web y tecnología para marcas literarias y culturales.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CL'
  },
  sameAs: [
    'https://ingeniumbright.com',
    'https://github.com/ingeniumbright'
  ]
}

// ========================================
// 4. SCHEMA: Book (si estamos en página de libro)
// ========================================
const bookSchema = computed(() => {
  if (!props.isBookPage || !props.book) return null
  
  const bookTitle = props.book.title || ''
  const bookGenres = props.book.genres || []
  const bookAuthors = props.book.authors || ['Міла Іванцова']
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: bookTitle,
    alternativeHeadline: `${bookTitle} - ${props.book.year}`,
    description: `Libro «${bookTitle}» de ${bookAuthors.join(', ')}. ${bookGenres.join(', ')}. ${props.book.pages} páginas.`,
    author: bookAuthors.map(name => ({
      '@type': 'Person',
      name: name
    })),
    datePublished: props.book.year,
    numberOfPages: props.book.pages,
    publisher: {
      '@type': 'Organization',
      name: props.book.publisher || 'Самостійне видання',
      address: {
        '@type': 'PostalAddress',
        addressLocality: props.book.city || 'Київ',
        addressCountry: 'UA'
      }
    },
    genre: bookGenres.join(', '),
    inLanguage: 'uk',
    mainEntityOfPage: currentUrl.value,
    url: currentUrl.value
  }
})

// ========================================
// 5. SCHEMA: ItemList (Catálogo de libros) - solo en home
// ========================================
const itemListSchema = computed(() => {
  if (props.isBookPage || !props.book) return null
  
  // Esta función se llama desde el componente padre con la lista de libros
  return null // Se genera dinámicamente en HomePage
})

// ========================================
// 6. SCHEMA: BreadcrumbList (Migas de pan)
// ========================================
const breadcrumbSchema = computed(() => {
  if (!props.isBookPage || !props.book) return null
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: currentLanguage.value === 'uk' ? 'Головна' : 'Home',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: props.book.title,
        item: currentUrl.value
      }
    ]
  }
})

// ========================================
// Construir array de schemas
// ========================================
const schemas = computed(() => {
  const result = [personSchema, websiteSchema, organizationSchema]
  
  if (props.isBookPage && props.book) {
    if (bookSchema.value) result.push(bookSchema.value)
    if (breadcrumbSchema.value) result.push(breadcrumbSchema.value)
  }
  
  return result
})

// ========================================
// Inyectar en <head>
// ========================================
useHead({
  script: schemas.value.map(schema => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify(schema)
  }))
})
</script>

<template>
  <!-- Componente sin renderizado visual -->
</template>