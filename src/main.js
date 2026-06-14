import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#3B4A6B',
          secondary: '#6B7280',
          background: '#F5F3EF',
          surface: '#FFFFFF',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#5B7A9B',
          secondary: '#9CA3AF',
          background: '#0A0A0A',
          surface: '#1A1A1A',
        }
      }
    }
  }
})

const head = createHead()
const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(head)

app.mount('#app')