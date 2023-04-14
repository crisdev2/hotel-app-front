import styled from '@emotion/styled'
import { Breadcrumbs, Skeleton } from '@mui/material'
import theme from '../../utilities/theme'
import Icon from '../shared/Icon'
import Link from '../shared/Link'
import { IBreadcrumb } from '../../models/breadcrumbModel'

const StyledBreadcrumb = styled(Breadcrumbs)`
`

const StyledIcon = styled(Icon)`
  color: ${theme.breadcrumb.icon};
`

const Item = styled.span`
  color: ${theme.breadcrumb.item};
`

const Breadcrumb = () => {
  const breadcrumb: IBreadcrumb[] = [
    {
      title: "Inicio",
      path: "/dashboard",
      enabled: true
    },
    {
      title: "Hoteles",
      path: "/dashboard/hotel",
      enabled: true
    },
    {
      title: "Gestionar Hoteles",
      path: "/dashboard/hotel/manage",
      enabled: false
    },
  ]
  return (
    <StyledBreadcrumb separator={<StyledIcon fontSize="small">navigate_next</StyledIcon>} aria-label="breadcrumb">
      {breadcrumb.map((item, index) => (
        item.enabled ?
          <Link underline="none" href={item.path} key={index}>{item.title}</Link>
          :
          <Item key={index}>{item.title}</Item>
      ))}
    </StyledBreadcrumb>
  )
}

export default Breadcrumb