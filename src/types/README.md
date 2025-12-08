# Tuff 插件类型定义

这个目录包含了 Tuff 插件的类型定义文件，为开发提供完整的类型支持。

## 文件说明

### `plugin.ts`

从 `@talex-touch/utils` 导入并重新导出核心类型：

- `TuffUtil`: 插件工具接口
- `TuffItem`: 插件项目接口
- `TuffItemBuilder`: 项目构建器接口
- `TuffFeature`: 功能配置接口
- `PluginLifecycle`: 插件生命周期接口

### `global.d.ts`

全局类型声明，为 `globalThis` 添加类型支持：

- `$util`: 插件工具对象
- `TuffItemBuilder`: 项目构建器构造函数

## 使用方式

### 在 JavaScript 文件中使用

```javascript
/**
 * @typedef {import('@talex-touch/utils').IPluginUtils} TuffUtil
 * @typedef {import('@talex-touch/utils').IPluginFeature} TuffFeature
 * @typedef {import('@talex-touch/utils').IPluginLifecycle} PluginLifecycle
 */

// 现在可以获得完整的类型提示
const { $util, TuffItemBuilder } = globalThis
```

### 在 TypeScript 文件中使用

```typescript
import type { IPluginFeature, IPluginLifecycle, IPluginUtils } from '@talex-touch/utils'

// 直接使用类型
const util: IPluginUtils = globalThis.$util
```

## 插件生命周期

插件需要导出一个实现 `PluginLifecycle` 接口的对象：

```javascript
/** @type {PluginLifecycle} */
const pluginLifecycle = {
  async onFeatureTriggered(featureId, query, feature, signal) {
    // 处理功能触发
  }
}

module.exports = pluginLifecycle
```

## 类型检查

运行以下命令进行类型检查：

```bash
pnpm typecheck
```
