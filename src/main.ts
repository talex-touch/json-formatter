import type { UserModule } from './types'

import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'
import { createMemoryHistory, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'vue-sonner/style.css'

// https://github.com/antfu/vite-ssg
const appBase = import.meta.env.BASE_URL || '/'
const routerBase = appBase.startsWith('.') ? '/' : appBase

const history = import.meta.env.SSR
  ? createMemoryHistory(routerBase)
  : createWebHashHistory(routerBase)

export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: routerBase,
    history,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
  },
)
