import styled from '@emotion/styled'
import { Skeleton, Typography } from '@mui/material'
import theme from '../../utilities/theme'

const StyledPageTitle = styled(Typography)`
  color: ${theme.color.pageTitle};
`

const PageTitle = () => {
  const loaded = true
  return (
    loaded ?
    <StyledPageTitle variant="h4">
      App de Hoteles
    </StyledPageTitle>
    :
    <Skeleton variant="rounded" width={250} height={24} />
  )
}

export default PageTitle