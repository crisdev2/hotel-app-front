import styled from '@emotion/styled'
import { FC, Fragment } from 'react'
import { Alert, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import { FieldArray, Form, FormikErrors, FormikProvider, useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { IHotel } from '../../../models/hotelModel'
import { listaAcomodacion, listaCiudades, listaTipoHabitacion } from '../../../utilities/listas'
import { useHotelContext } from '../../../context/hotelContext'

const StyledHotelForm = styled.div`
`

const HotelForm: FC<Props> = ({ hotel, onSubmit }) => {
  const { handleSuccess, handleError } = useHotelContext()
  const handlePersist = async (path: string, values: IHotel) => {
    let response: any;
    try {
      if (!values.id) {
        response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/${path}`, values)
      } else {
        response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/${path}/${values.id}`, values)
      }
      if (response?.data?.message) handleSuccess(response.data.message)
    } catch (error: any) {
      if (error?.response?.data?.message) handleError(error.response.data.message)
      else handleError('Error inesperado en la comunicación con el back-end')
      console.log(error)
    }
    return response
  }
  
  const handleDelete = async (path: string) => {
    const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/${path}/${hotel?.id}`)
    if (response?.data?.message) handleSuccess(response.data.message)
    if (onSubmit) onSubmit()
    return response
  }

  const formik = useFormik({
    initialValues: {
      id: hotel?.id || null,
      nombre: hotel?.nombre || '',
      direccion: hotel?.direccion || '',
      ciudad: hotel?.ciudad || '',
      nit: hotel?.nit || '',
      habitaciones: hotel?.habitaciones || 0,
      idHabitaciones: hotel?.idHabitaciones || [],
    },
    validationSchema: yup.object({
      nombre: yup
        .string()
        .required('Este campo es obligatorio'),
      direccion: yup
        .string()
        .required('Este campo es obligatorio'),
      ciudad: yup
        .number()
        .required('Este campo es obligatorio'),
      nit: yup
        .string()
        .required('Este campo es obligatorio'),
      habitaciones: yup
        .number()
        .required('Este campo es obligatorio')
        .min(1, 'Debe ingresar al menos una habitación'),
      idHabitaciones: yup.array().of(
        yup.object({
          cantidad: yup
            .number()
            .required('Este campo es obligatorio')
            .min(1, 'Debe ingresar al meno uno'),
          tipo: yup
            .number()
            .required('Este campo es obligatorio'),
          acomodacion: yup
            .number()
            .required('Este campo es obligatorio'),
        })
      ),
    }),
    validate: async (values) => {
      const errors: FormikErrors<IHotel> = {};
      const totalHabitaciones = values.idHabitaciones.reduce((a, b) => a + b.cantidad, 0)
      if (totalHabitaciones > values.habitaciones) {
        values.idHabitaciones.map((item, index) => {
          errors.habitaciones = 'La cantidad supera el número de habitaciones'
        })
      }
      return errors
    },
    onSubmit: async (values) => {
      await handlePersist('api/hotel', values as IHotel)
      if (onSubmit) onSubmit()
    },
  })
  return (
    <StyledHotelForm>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item sm={6}>
              <FormControl>
                <TextField
                  fullWidth
                  id="nombre"
                  name="nombre"
                  label="Nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                  helperText={formik.touched.nombre && formik.errors.nombre}
                />
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <FormControl>
                <TextField
                  fullWidth
                  id="direccion"
                  name="direccion"
                  label="Dirección"
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                  helperText={formik.touched.direccion && formik.errors.direccion}
                />
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <FormControl>
                <InputLabel id="ciudad-label" error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}>
                  Ciudad
                </InputLabel>
                <Select
                  fullWidth
                  label="ciudad-label"
                  id="ciudad"
                  name="ciudad"
                  value={formik.values.ciudad}
                  onChange={formik.handleChange}
                  error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
                >
                  {listaCiudades.map((row) => (
                    <MenuItem value={Number(row.id)} key={row.id}>{row.nombre}</MenuItem>
                  ))}
                </Select>
                {formik.touched.ciudad && Boolean(formik.errors.ciudad) &&
                  <FormHelperText error>{formik.touched.direccion && formik.errors.direccion}</FormHelperText>
                }
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <FormControl>
                <TextField
                  fullWidth
                  id="nit"
                  name="nit"
                  label="NIT"
                  value={formik.values.nit}
                  onChange={formik.handleChange}
                  error={formik.touched.nit && Boolean(formik.errors.nit)}
                  helperText={formik.touched.nit && formik.errors.nit}
                />
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <FormControl>
                <TextField
                  fullWidth
                  id="habitaciones"
                  name="habitaciones"
                  label="Número de habitaciones"
                  value={formik.values.habitaciones}
                  onChange={formik.handleChange}
                  error={formik.touched.habitaciones && Boolean(formik.errors.habitaciones)}
                  helperText={formik.touched.habitaciones && formik.errors.habitaciones}
                  type="number"
                />
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FieldArray
                name="idHabitaciones"
                render={arrayHelpers => (
                  <Grid container spacing={4}>
                    {formik.values.idHabitaciones && formik.values.idHabitaciones.length > 0 ? (
                      formik.values.idHabitaciones.map((item, index) => (
                        <Fragment key={index}>
                          <Grid item sm={4}>
                            <FormControl>
                              <TextField
                                fullWidth
                                id={`idHabitaciones-${index}-cantidad`}
                                name={`idHabitaciones.${index}.cantidad`}
                                label="Cantidad"
                                value={formik.values.idHabitaciones[index].cantidad}
                                onChange={formik.handleChange}
                                error={Boolean(formik.touched.idHabitaciones?.[index]?.cantidad) && (formik.errors.idHabitaciones?.[index] as any)?.cantidad}
                                helperText={formik.touched.idHabitaciones?.[index]?.cantidad && (formik.errors.idHabitaciones?.[index] as any)?.cantidad as String}
                                type="number"
                              />
                            </FormControl>
                          </Grid>
                          <Grid item sm={4}>
                            <FormControl>
                              <InputLabel
                                id={`idHabitaciones-${index}-tipo-label`}
                                error={Boolean(formik.touched.idHabitaciones?.[index]?.tipo) && (formik.errors.idHabitaciones?.[index] as any)?.tipo}
                              >
                                Tipo de habitación
                              </InputLabel>
                              <Select
                                fullWidth
                                label={`idHabitaciones-${index}-tipo-label`}
                                id={`idHabitaciones-${index}-tipo`}
                                name={`idHabitaciones.${index}.tipo`}
                                value={formik.values.idHabitaciones[index].tipo || ''}
                                onChange={formik.handleChange}
                                error={Boolean(formik.touched.idHabitaciones?.[index]?.tipo) && (formik.errors.idHabitaciones?.[index] as any)?.tipo}
                              >
                                {listaTipoHabitacion.map((row) => (
                                  <MenuItem value={Number(row.id)} key={row.id}>{row.nombre}</MenuItem>
                                ))}
                              </Select>
                              {Boolean(formik.touched.idHabitaciones?.[index]?.tipo) && (formik.errors.idHabitaciones?.[index] as any)?.tipo &&
                                <FormHelperText error>{(formik.errors.idHabitaciones?.[index] as any)?.tipo as String}</FormHelperText>
                              }
                            </FormControl>
                          </Grid>
                          <Grid item sm={4}>
                            <FormControl>
                              <InputLabel
                                id={`idHabitaciones-${index}-acomodacion-label`}
                                error={Boolean(formik.touched.idHabitaciones?.[index]?.acomodacion) && (formik.errors.idHabitaciones?.[index] as any)?.acomodacion}
                              >
                                Acomodación
                              </InputLabel>
                              <Select
                                fullWidth
                                label={`idHabitaciones-${index}-acomodacion-label`}
                                id={`idHabitaciones-${index}-acomodacion`}
                                name={`idHabitaciones.${index}.acomodacion`}
                                value={formik.values.idHabitaciones[index].acomodacion || ''}
                                onChange={formik.handleChange}
                                error={Boolean(formik.touched.idHabitaciones?.[index]?.acomodacion) && (formik.errors.idHabitaciones?.[index] as any)?.acomodacion}
                              >
                                {listaAcomodacion.map((row) => (
                                  listaTipoHabitacion.find(item => item.id === formik.values.idHabitaciones[index].tipo)?.acomodacion.includes(row.id) &&
                                  (!formik.values.idHabitaciones.find((item, i) => i !== index && item.acomodacion === row.id)) &&
                                  <MenuItem value={Number(row.id)} key={row.id}>{row.nombre}</MenuItem>
                                ))}
                              </Select>
                              {Boolean(formik.touched.idHabitaciones?.[index]?.acomodacion) && (formik.errors.idHabitaciones?.[index] as any)?.acomodacion &&
                                <FormHelperText error>{(formik.errors.idHabitaciones?.[index] as any)?.acomodacion as String}</FormHelperText>
                              }
                            </FormControl>
                          </Grid>
                        </Fragment>
                      ))
                    ) : (
                      <Grid item sm={12}>
                        <Alert severity="info">Agregue los tipos de habitación</Alert>
                      </Grid>
                    )}
                    <Grid item sm={6}>
                      <Button
                        fullWidth
                        color="success"
                        variant="outlined"
                        size="small"
                        onClick={() => arrayHelpers.insert(formik.values.idHabitaciones.length, {
                          cantidad: 0,
                          tipo: '',
                          acomodacion: '',
                        })}
                      >
                        Agregar
                      </Button>
                    </Grid>
                    <Grid item sm={6}>
                      <Button
                        fullWidth
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={() => arrayHelpers.remove(formik.values.idHabitaciones.length - 1)}
                      >
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <Button color="primary" variant="contained" fullWidth type="submit">
                {hotel ? 'Guardar' : 'Crear'}
              </Button>
            </Grid>
            {!!hotel &&
              <Grid item sm={12}>
                <Button color="error" variant="contained" fullWidth onClick={() => handleDelete('api/hotel')}>
                  Eliminar Hotel
                </Button>
              </Grid>
            }
          </Grid>
        </Form>
      </FormikProvider>
    </StyledHotelForm>
  )
}

interface Props {
  hotel: IHotel | null
  onSubmit: () => void
}

export default HotelForm