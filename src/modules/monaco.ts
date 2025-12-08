import { loader } from '@guolao/vue-monaco-editor'
import * as monaco from 'monaco-editor'
import type { UserModule } from '~/types'

// Use local monaco-editor instead of CDN
loader.config({ monaco })

export const install: UserModule = () => {
  // Monaco is configured via loader.config above
}
