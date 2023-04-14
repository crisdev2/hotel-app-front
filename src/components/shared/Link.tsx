import { LinkProps, Link as MuiLink } from '@mui/material'
import { Link as ReactRouterLink } from 'react-router-dom'
import { FC } from 'react'
import styled from '@emotion/styled'

const StyledLink = styled(ReactRouterLink)`
  &:hover {
    color: ${p => p.theme.palette?.primary.dark};
  }
`

const Link: FC<LinkProps> = (props) => {
  return (
    <MuiLink {...props} component={StyledLink} to={props.href ?? '#'} color={props.color ?? 'primary'} />
  )
}

export default Link