export interface Module {
  name: string
  routes: string[]
  run: () => void
}
