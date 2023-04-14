import styled from '@emotion/styled'
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import theme from '../../utilities/theme'
import Icon from '../shared/Icon'
import { IMenu } from '../../models/menuModel'

const StyledListItemIcon = styled(ListItemIcon)`
  font-size: 20px;
`

const StyledListItemText = styled(ListItemText)`
  &[data-condensed][data-level="1"] {
    margin-left: 16px;
    margin-top: 0;
    margin-bottom: 0;
    height: 20px;
  }
`

const StyledIcon = styled(Icon)`
  transition: transform .15s;
  &.open {
    transform: rotate(90deg);
  }
`

const StyledListItemButton = styled(ListItemButton)`
  &[data-condensed] {
    padding-left: 16px;
    padding-right: 16px;
  }
  &[data-condensed][data-level="1"] {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 25px;
    transition: none;
    &:hover {
      background: ${theme.color.primary};
      color: ${p => p.theme.palette?.primary.contrastText};
    }
  }
  &[data-condensed][data-level="2"] {
    color: ${theme.menu.item};
    background: ${theme.bg.sidebar2};
    &:hover {
      color: ${theme.menu.hover};
    }
  }
`

const StyledSidebarItem = styled.div`
  &[data-condensed][data-level="1"] {
    &:hover {
      width: 260px;
      background: ${theme.color.primary};
      color: ${p => p.theme.palette?.primary.contrastText};
    }
  }
`

const StyledCollapse = styled(Collapse)`
  &[data-condensed][data-level="1"] {
    background: ${theme.bg.sidebar};
    padding-left: 0;
    position: absolute;
    left: 70px;
    width: 190px;
  }
`

const SidebarItem: FC<ISidebarItem> = ({ item, condensed = false, level }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const active = !!item.path && item.path.startsWith(location.pathname)
  const handleClick = () => {
    if (item.child?.length) {
      setOpen(!open)
    }  else if (item.path) {
      navigate(item.path)
    }
  }
  const handleShow = () => {
    setShow(!show)
    if (item.child?.length && condensed) {
      setOpen(!show)
    }
  }
  return (
    <StyledSidebarItem
      onMouseEnter={handleShow}
      onMouseLeave={handleShow}
      data-condensed={condensed ? "": undefined}
      data-level={level}
    >
      <StyledListItemButton
        className={(active || open) ? 'active' : ''}
        onClick={handleClick}
        data-condensed={condensed ? "": undefined}
        data-level={level}
      >
        {!!item.icon &&
          <StyledListItemIcon>
            <Icon fontSize="small" outlined>{item.icon}</Icon>
          </StyledListItemIcon>
        }
        {(!condensed || show || level > 1) &&
          <>
            <StyledListItemText primary={item.title} data-condensed={condensed ? "": undefined} data-level={level} />
            {!!item.child?.length &&
              <StyledIcon fontSize="small" outlined className={open ? 'open' : ''}>navigate_next</StyledIcon>
            }
          </>
        }
      </StyledListItemButton>
      {!!item.child?.length &&
        <StyledCollapse in={open} timeout={condensed ? 0 : 500} unmountOnExit sx={{pl: 8}} data-condensed={condensed ? "": undefined} data-level={level}>
          {item.child?.map((subitem, subindex) => (
            <SidebarItem item={subitem} key={subindex} condensed={condensed} level={level + 1} />
          ))}
        </StyledCollapse>
      }
    </StyledSidebarItem>
  )
}

interface ISidebarItem {
  item: IMenu
  condensed: boolean
  level: number
}

export default SidebarItem