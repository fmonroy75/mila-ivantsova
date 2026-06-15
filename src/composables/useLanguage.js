import { ref } from 'vue'
import { translations } from '../data/translations.js'

const currentLanguage = ref(localStorage.getItem('language') || 'uk')

export function useLanguage() {
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[currentLanguage.value]
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }
    return value || key
  }
  
  const translateBook = (book) => {
    if (!book) return null
    // Si el idioma es ucraniano, devolver el libro original sin cambios
    if (currentLanguage.value === 'uk') return { ...book }
    
    // Traducir al inglés usando la estructura correcta de booksData
    const booksData = translations.en.booksData || {}
    const translated = { ...book }
    
    // Traducir título
    if (booksData.titles && booksData.titles[book.title]) {
      translated.title = booksData.titles[book.title]
    }
    
    // Traducir ciudad
    if (booksData.cities && booksData.cities[book.city]) {
      translated.city = booksData.cities[book.city]
    }
    
    // Traducir editorial
    if (booksData.publishers && booksData.publishers[book.publisher]) {
      translated.publisher = booksData.publishers[book.publisher]
    }
    
    // Traducir géneros
    if (book.genres && booksData.genres) {
      translated.genres = book.genres.map(genre => {
        return booksData.genres[genre] || genre
      })
    }
    
    // Traducir autores
    if (book.authors && booksData.authors) {
      translated.authors = book.authors.map(author => {
        return booksData.authors[author] || author
      })
    }
    
    return translated
  }
  
  const getWhatsAppMessage = (bookTitle, year) => {
    const messageTemplate = t('book.whatsappMessage')
    if (!messageTemplate || messageTemplate === 'book.whatsappMessage') {
      // Fallback si no existe la traducción
      return currentLanguage.value === 'uk' 
        ? `Добрий день! Хочу придбати книгу «${bookTitle}» (${year})`
        : `Hello! I would like to purchase the book "${bookTitle}" (${year})`
    }
    return messageTemplate
      .replace('{title}', bookTitle)
      .replace('{year}', year)
  }
  
  const setLanguage = (lang) => {
    if (translations[lang]) {
      currentLanguage.value = lang
      localStorage.setItem('language', lang)
    }
  }
  
  return { currentLanguage, t, translateBook, getWhatsAppMessage, setLanguage }
}