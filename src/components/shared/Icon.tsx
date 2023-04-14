import styled from '@emotion/styled'
import { Icon as MuiIcon, IconProps } from '@mui/material'
import { FC } from 'react'

const StyledMuiIcon = styled(MuiIcon)`
  font-size: inherit;
`

const Icon: FC<Props> = (props) => {
  const classOutlined = props.outlined === false ? "" : "material-icons-outlined"
  const className = props.className ? `${props.className} ${classOutlined}` : classOutlined
  const realProps = {
    ...props,
    outlined: undefined
  }
  return (
    <StyledMuiIcon {...realProps} className={className}>{props.children}</StyledMuiIcon>
  )
}

interface Props extends IconProps {
  outlined?: boolean
}

export default Icon