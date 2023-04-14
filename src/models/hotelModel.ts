import { IHabitacion } from './habitacionModel'

export interface IHotel {
  id: number | null
  nombre: string
  direccion: string
  ciudad: number
  nit: string
  habitaciones: number
  idHabitaciones: IHabitacion[]
}