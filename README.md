<p align="center">
  <a href="https://github.com/talex-touch/tuff" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://avatars.githubusercontent.com/u/172330535?s=200&v=4" alt="tuff logo">
  </a>
</p>

<h1 align='center'>tuff plugin template</h1>

<p align='center'>
<b>English</b> | <a href="./README.zh-CN.md">简体中文</a>
</p>

<br>

## Features

- ⚡️ Based on vitesse.
- 🦾 TypeScript, of course.
- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest).
- ☁️ Deploy on pnpm, zero-config.

<br>

## Try it now!

> Requires Node >=22

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/talex-touch/tuff-plugin-template/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit talex-touch/tuff-plugin-template my-tuff-plugin
cd my-tuff-plugin
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the author name in `package.json`
- [ ] Change the project name in `package.json`
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

## Usage

### Development

Just run and visit http://localhost:3333

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.
