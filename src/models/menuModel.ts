export interface IMenu {
  title: string
  path?: string | null
  icon?: string | null
  active: boolean
  child?: IMenu[]
}