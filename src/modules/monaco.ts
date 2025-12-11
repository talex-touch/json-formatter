import type { UserModule } from '~/types'

const MONACO_VERSION = '0.55.1'
const DEFAULT_MONACO_VS_CDN = `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min/vs`

function resolveMonacoVsPath() {
  const customPath = (import.meta.env as { VITE_MONACO_VS_PATH?: string }).VITE_MONACO_VS_PATH

  if (customPath && customPath.trim().length > 0)
    return customPath.replace(/\/$/, '')

  return DEFAULT_MONACO_VS_CDN
}

async function configureMonaco() {
  const [{ loader }] = await Promise.all([
    import('@guolao/vue-monaco-editor'),
  ])

  loader.config({
    paths: {
      vs: resolveMonacoVsPath(),
    },
  })
}

export const install: UserModule = () => {
  if (import.meta.env.SSR)
    return
  void configureMonaco()
}
