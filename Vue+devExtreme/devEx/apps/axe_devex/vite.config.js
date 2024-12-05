import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'
import frappeui from 'frappe-ui/vite'

export default defineConfig({
  plugins: [
    frappeui(),
    vue({
      script: {
        propsDestructure: true,
      },
    }),
    {
      name: 'transform-index.html',
      transformIndexHtml(html, context) {
        if (!context.server) {
          return html.replace(
            /<\/body>/,
            `
            <script>
                {% for key in boot %}
                window["{{ key }}"] = {{ boot[key] | tojson }};
                {% endfor %}
            </script>
            </body>
            `
          )
        }
        return html
      },
    },
  ],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, 'src'),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  extensions: ['.js', '.ts', '.vue', '.json'], 
  },
  build: {
    outDir: '../axe_core/public/frontend',
    emptyOutDir: true,
    commonjsOptions: {
      include: [/node_modules/],
    },
    sourcemap: true,
  },
  optimizeDeps: {
    include: [
      'feather-icons',
      'showdown',
      'tailwind.config.js',
      'engine.io-client',
      'prosemirror-state',
       'dayjs', 'dayjs/plugin/advancedFormat'
    ],
  },
})