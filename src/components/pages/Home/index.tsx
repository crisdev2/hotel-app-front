import styled from '@emotion/styled'
import { Alert, Button, Dialog, DialogTitle, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FC, useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import Icon from '../../shared/Icon'
import BasicModal from '../../shared/BasicModal'
import { IHotel } from '../../../models/hotelModel'
import HotelForm from './HotelForm'
import { useHotelContext } from '../../../context/hotelContext'
import { listaCiudades } from '../../../utilities/listas'

const StyledHome = styled.div`
`

const StyledButton = styled(Button)`
  margin-bottom: 15px;
`

const StyledAlert = styled(Alert)`
  margin-bottom: 20px;
`

const Home: FC<Props> = () => {
  const [show, setShow] = useState<boolean>(false)
  const [record, setRecord] = useState<IHotel|null>(null)
  const { loaded, error, handleReload, ...fetch } = useFetch('api/hotel')
  const { msg, handleHiddeMsg } = useHotelContext()
  const data: IHotel[] = fetch.data?.records || []
  return (
    <StyledHome>
      {show && 
        <BasicModal title={record ? "Edit" : "Create"} open={show} handleClose={() => setShow(false)}>
          <HotelForm hotel={record} onSubmit={() => {setShow(false); handleReload()}} />
        </BasicModal>
      }
      <StyledButton color="success" variant="contained" onClick={() => {setShow(true); setRecord(null)}}>
        <Icon>add</Icon>&nbsp;Agregar hotel
      </StyledButton>
      {msg.show &&
        <StyledAlert severity={msg.type} onClose={handleHiddeMsg} variant="filled">{msg.msg}</StyledAlert>
      }
      {data.length ?
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>NIT</TableCell>
                <TableCell>Habitaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    <Link component="button" onClick={() => {setShow(true); setRecord(row)}}>
                      {row.nombre}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {row.direccion}
                  </TableCell>
                  <TableCell>
                    {listaCiudades.find(item => item.id === row.ciudad)?.nombre}
                  </TableCell>
                  <TableCell>
                    {row.nit}
                  </TableCell>
                  <TableCell>
                    {row.habitaciones}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      :
        <Alert severity="info" variant="outlined">No existen hoteles en la base de datos.</Alert>
      }
    </StyledHome>
  )
}

interface Props {
}

export default Home