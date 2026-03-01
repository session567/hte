import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const modules = import.meta.glob<{ default: ModuleMetadata }>('@/entrypoints/content/modules/*/metadata.ts', {
  eager: true,
})
const allMetadata = Object.values(modules).map((mod) => mod.default)

const moduleList = document.getElementById('moduleList')

if (moduleList) {
  moduleList.innerHTML = allMetadata
    .filter(({ excludeFromPopup }) => !excludeFromPopup)
    .map(
      ({ id, name, description }) => `
        <div class="module">
          <input type="checkbox" id="module-${id}" checked>
          <label for="module-${id}">
            <div class="name">${name}</div>
            <div class="description">${description}</div>
          </label>
        </div>`,
    )
    .join('')
}
