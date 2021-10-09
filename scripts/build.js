#!/usr/bin/env node
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

import { parse, walk } from 'svelte/compiler'

const __filename = fileURLToPath(import.meta.url);

const WOKRSPACE = path.dirname(path.dirname(__filename))
const CONFIG = {
  srcDir: path.join(WOKRSPACE, 'lucide/icons'),
  outDir: path.join(WOKRSPACE, 'icons')
}

const toModuleName = (str) => {
  return str.replace(/\.svg$/g, '').replace(/(?:^|-)([a-zA-Z0-9])/g, (matches, $1) => {
    return $1.toUpperCase()
  })
}

/**
 * Svelte component template.
 * 
 * @param {string} svg 
 * @returns 
 */
const svelteTemplate = (svg) => {
  let children = ''
  const ast = parse(svg)

  walk(ast.html, {
    enter(node) {
      if (node.type === "Element" && node.name === 'svg') {
        node.children.forEach(child => {
          children += svg.slice(child.start, child.end)
        })
      }
    }
  })

  return `<script>
  export let size = 24
</script>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  {...$$restProps}
>
  <slot />
  ${children.trim()}
</svg>`
}

/**
 * Typescript definition template.
 * 
 * @param {string} moduleName module name in PascalCase
 * @returns
 */
const tsTemplate = (moduleName) => `/// <reference types="svelte" />
import { SvelteComponentTyped } from 'svelte'

export interface ${moduleName}Props extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["svg"]> {
  xmlns?: 'http://www.w3.org/2000/svg',
  width?: 24,
  height?: 24,
  viewBox?: '0 0 24 24',
  fill?: 'none',
  stroke?: 'currentColor',
  'stroke-width'?: 2,
  'stroke-linecap'?: 'round',
  'stroke-linejoin'?: 'round',

  /**
   * Icon size
   */
  size?: 24
}

export default class ${moduleName} extends SvelteComponentTyped<
  ${moduleName}Props,
  {},
  { default: {} }
> {}
`

try {
  fs.statSync(CONFIG.srcDir)
} catch (err) {
  console.error(err)
  process.exit(1)
}

fs.rmSync(CONFIG.outDir, { recursive: true, force: true })
fs.mkdirSync(CONFIG.outDir)

const files = fs.readdirSync(CONFIG.srcDir)
files.forEach((file, i) => {
  const svg = fs.readFileSync(path.join(CONFIG.srcDir, file), 'utf-8')
  const svelteComponent = svelteTemplate(svg, file)

  fs.writeFileSync(path.join(CONFIG.outDir, `${toModuleName(file)}.svelte`), svelteComponent)
  fs.writeFileSync(path.join(CONFIG.outDir, `${toModuleName(file)}.svelte.d.ts`), tsTemplate(toModuleName(file)))
})

const index = files
  .map(file => `export { default as ${toModuleName(file)} } from './icons/${toModuleName(file)}.svelte';\n`)
  .join('')

fs.writeFileSync(path.join(WOKRSPACE, 'index.js'), index)
fs.writeFileSync(path.join(WOKRSPACE, 'index.d.ts'), index)
