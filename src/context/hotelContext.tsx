import { AlertColor } from '@mui/material'
import { createContext, FC, ReactNode, useContext, useState } from 'react'
import axios from 'axios'
import { IHotel } from '../models/hotelModel'

const HotelContext = createContext<IHotelContext | undefined>(undefined)

interface IMsg {
  show: boolean
  type: AlertColor
  msg: string
}

interface IHotelContext {
  msg: IMsg
  handleHiddeMsg: () => void
  persistData: (values: IHotel) => Promise<void>
  handleError: (msg: string) => void
  handleSuccess: (msg: string) => void
}

export const HotelProvider: FC<Props> = ({ children }) => {

  const [msg, setMsg] = useState<IMsg>({
    show: false,
    type: 'info',
    msg: '',
  })

  /**
   * Disparar mensaje de error
   * @param msg Mensaje a mostrar
   */
  const handleError = (msg: string) => {
    setMsg({
      show: true,
      type: 'error',
      msg,
    })
  }

  /**
   * Disparar mensaje de éxito
   * @param msg Mensaje a mostrar
   */
  const handleSuccess = (msg: string) => {
    setMsg({
      show: true,
      type: 'success',
      msg,
    })
  }

  /**
   * Ocultar mensaje
   */
  const handleHiddeMsg = () => {
    setMsg({
      ...msg,
      show: false,
    })
  }

  /**
   * Persistir datos en la Base de datos
   * @param values Valores a almacenar
   */
  const persistData = async (values: IHotel) => {
    try {
      await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/hotel`, values)
      handleSuccess('Registro guardado correctamente')
    } catch (error) {
      console.log('API ERROR', error)
      handleError('Error en la comunicación con el back-end')
    }
  }

  /**
   * Agregar Litros
   * @param value Valor a adicionar
   */
  // const addLTS = (value: number) => {
  //   const CM3 = value * 1000
  //   const nuevoUsado = CM3 + tanque.usado
  //   if (nuevoUsado > tanque.capacidadTotal) {
  //     handleError(`El tanque no tiene la suficiente capacidad para agregar ${value} LTS (${CM3} CM3).`)
  //   } else {
  //     setTanque({
  //       ...tanque,
  //       usado: nuevoUsado,
  //       disponible: tanque.capacidadTotal - nuevoUsado,
  //     })
  //     handleSuccess(`Se han agregado ${value} LTS (${CM3} CM3) correctamente.`)
  //     persistData({
  //       id: null,
  //       accion: `Agregar LTS: ${value}`,
  //       valorAnterior: `usado: ${tanque.usado} CM3`,
  //       valorNuevo: `usado: ${nuevoUsado} CM3`,
  //     })
  //   }
  // }

  /**
   * Agregar Milímetros cúbicos
   * @param value Valor a adicionar
   */
  // const addMLTS = (value: number) => {
  //   const CM3 = value * 0.001
  //   const nuevoUsado = CM3 + tanque.usado
  //   if (nuevoUsado > tanque.capacidadTotal) {
  //     handleError(`El tanque no tiene la suficiente capacidad para agregar ${value} MLTS (${CM3} CM3).`)
  //   } else {
  //     setTanque({
  //       ...tanque,
  //       usado: nuevoUsado,
  //       disponible: tanque.capacidadTotal - nuevoUsado,
  //     })
  //     handleSuccess(`Se han agregado ${value} MLTS (${CM3} CM3) correctamente.`)
  //     persistData({
  //       id: null,
  //       accion: `Agregar MLTS: ${value}`,
  //       valorAnterior: `usado: ${tanque.usado} CM3`,
  //       valorNuevo: `usado: ${nuevoUsado} CM3`,
  //     })
  //   }
  // }

  return (
    <HotelContext.Provider
      value={{
        msg,
        handleHiddeMsg,
        persistData,
        handleSuccess,
        handleError,
      }}
    >
      {children}
    </HotelContext.Provider>
  )
}

interface Props {
  children?: ReactNode
}

export const useHotelContext = () => {
  const context = useContext(HotelContext)
  if (context === undefined) {
    throw new Error('useHotelContext must be used within a HotelProvider')
  }
  return context
}