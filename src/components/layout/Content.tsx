import styled from '@emotion/styled'
import { Grid, Skeleton } from '@mui/material'
import { FC } from 'react'

const StyledContent = styled.div`
`

const Content: FC<Props> = (props) => {
  const loaded = true
  return (
    <StyledContent>
      {
        loaded ? 
        <>
          {props.children}
        </>
        :
        <>
          <Grid container spacing={8}>
            {[...Array(6)].map((item, index) => (
              <Grid item key={index} md={4}>
                <Skeleton variant="rounded" width="100%" height="200px">
                </Skeleton>
              </Grid>
            ))}
          </Grid>
        </>
      }
    </StyledContent>
  )
}

interface Props {
  children?: React.ReactNode | string
}

export default Content