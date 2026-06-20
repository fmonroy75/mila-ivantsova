import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

export default defineConfig(({ command }) => ({
  base: command === 'serve'
    ? '/'
    : '/mila-ivantsova/',
  plugins: [
    vue(),
    {
      name: 'generate-sitemap-and-robots',
      apply: 'build',
      async closeBundle() {
        //const baseUrl = 'https://milaivantsova.com'
        const isGithub = command === 'build'

        const baseUrl =
        process.env.VITE_SITE_URL ||
        'https://fmonroy75.github.io/mila-ivantsova'


        const siteUrl =
        process.env.VITE_SITE_URL ||
        'https://fmonroy75.github.io/mila-ivantsova'

        // Leer los libros desde el archivo fuente
        const booksPath = path.resolve(__dirname, 'src/data/books.js')
        let books = []
        
        try {
          // Importar dinámicamente en build time
          const booksModule = await import(booksPath + '?t=' + Date.now())
          books = booksModule.books || []
        } catch(e) {
          console.log('No se pudieron cargar los libros para el sitemap:', e.message)
          // Libros de respaldo en caso de error
          books = []
        }
        
        const urls = [
          { url: '/', priority: '1.0', changefreq: 'weekly' },
          ...books.map(book => ({ 
            url: `/book/${book.id}`, 
            priority: '0.8', 
            changefreq: 'monthly' 
          }))
        ]
        
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${baseUrl}${u.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`
        
        // Asegurar que la carpeta dist existe
        if (!fs.existsSync('dist')) {
          fs.mkdirSync('dist', { recursive: true })
        }
        
        fs.writeFileSync('dist/sitemap.xml', sitemap)
        fs.writeFileSync('dist/robots.txt', `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`)
        console.log('✅ Sitemap y robots.txt generados correctamente')
      }
    }
  ]
}))