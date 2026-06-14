import { ref, reactive, computed } from 'vue'
import { translations } from '../data/translations.js'

export function useLanguage() {
  const currentLanguage = ref(localStorage.getItem('language') || 'uk')
  
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
  
  const setLanguage = (lang) => {
    if (translations[lang]) {
      currentLanguage.value = lang
      localStorage.setItem('language', lang)
    }
  }
  
  return { currentLanguage, t, setLanguage }
}