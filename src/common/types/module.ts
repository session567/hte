export interface Module {
  name: string
  paths: string[]
  run: () => void
}
