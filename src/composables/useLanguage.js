import { ref, reactive, computed } from 'vue'
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
    if (currentLanguage.value === 'uk') return book
    
    const translated = { ...book }
    
    if (translations.en.booksData) {
      if (translations.en.booksData[book.title]) {
        translated.title = translations.en.booksData[book.title]
      }
      if (translations.en.booksData[book.city]) {
        translated.city = translations.en.booksData[book.city]
      }
      if (translations.en.booksData[book.publisher]) {
        translated.publisher = translations.en.booksData[book.publisher]
      }
      if (book.genres) {
        translated.genres = book.genres.map(genre => {
          return translations.en.booksData[genre] || genre
        })
      }
      if (book.authors) {
        translated.authors = book.authors.map(author => {
          return translations.en.booksData[author] || author
        })
      }
    }
    
    return translated
  }
  
  const setLanguage = (lang) => {
    if (translations[lang]) {
      currentLanguage.value = lang
      localStorage.setItem('language', lang)
    }
  }
  
  return { currentLanguage, t, translateBook, setLanguage }
}