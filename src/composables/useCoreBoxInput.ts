import { onCoreBoxInputChange } from '@talex-touch/utils/plugin/sdk'

/**
 * 从 CoreBox SDK 事件中提取文本内容
 */
function extractText(data: any): string {
  const payload = data?.data ?? data

  // 优先级: query.text > input > inputs 数组
  if (payload?.query?.text) {
    return payload.query.text
  }
  if (payload?.input) {
    return payload.input
  }
  if (Array.isArray(payload?.inputs) && payload.inputs.length > 0) {
    return payload.inputs
      .map((item: any) => item?.text || '')
      .filter(Boolean)
      .join('\n')
  }
  if (Array.isArray(payload?.query?.inputs) && payload.query.inputs.length > 0) {
    return payload.query.inputs
      .map((item: any) => item?.text || '')
      .filter(Boolean)
      .join('\n')
  }
  return ''
}

/**
 * 监听 CoreBox 输入变化的 composable
 */
export function useCoreBoxInput(onInput: (text: string) => void) {
  onCoreBoxInputChange((data: any) => {
    try {
      const text = extractText(data)
      if (text) {
        onInput(text)
      }
    }
    catch (e) {
      console.error('[useCoreBoxInput] Error:', e)
    }
  })
}
