import { getConfig, setConfig } from '@/common/config'
import type { ModuleMetadata } from '@/entrypoints/content/common/types/module'

const modules = import.meta.glob<{ default: ModuleMetadata }>('@/entrypoints/content/modules/*/metadata.ts', {
  eager: true,
})
const allMetadata = Object.values(modules).map((mod) => mod.default)

const moduleList = document.getElementById('moduleList')

if (moduleList) {
  let config = await getConfig()
  const visibleModules = allMetadata.filter(({ excludeFromPopup }) => !excludeFromPopup)

  moduleList.innerHTML = visibleModules
    .map(
      ({ id, name, description }) => `
        <div class="module">
          <input type="checkbox" id="module-enabled-${id}" ${!config.disabledModules.includes(id) ? 'checked' : ''}>
          <label for="module-enabled-${id}">
            <div class="name">${name}</div>
            <div class="description">${description}</div>
          </label>
        </div>`,
    )
    .join('')

  visibleModules.forEach(({ id }) => {
    const checkbox = document.getElementById(`module-enabled-${id}`) as HTMLInputElement

    checkbox.addEventListener('change', () => {
      const disabledModules = checkbox.checked
        ? config.disabledModules.filter((m) => m !== id)
        : [...config.disabledModules, id]
      config = { ...config, disabledModules }

      void setConfig(config)
    })
  })
}
