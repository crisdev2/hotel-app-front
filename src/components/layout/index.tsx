import styled from '@emotion/styled'
import { FC, useState } from 'react'
import theme from '../../utilities/theme'
import Container from './Container'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  width: 100%;
  position: relative;
`

const Main = styled.div`
  background: ${theme.bg.body};
  margin-left: 260px;
  overflow: hidden;
  padding: 70px 12px 65px;
  min-height: 100vh;
  box-sizing: border-box;
  transition: all 0.2s;
  &[data-condensed] {
    margin-left: 70px;
  }
`

const UserLayout: FC<Props> = (props) => {
  const [condensed, setCondensed] = useState<boolean>(false);
  const toggleCondensed = () => {
    setCondensed(!condensed)
  }
  return (
    <Wrapper>
      <Sidebar condensed={condensed} />
      <Main data-condensed={condensed ? "": undefined}>
        <Navbar toggleCondensed={toggleCondensed} condensed={condensed} />
        <Container>{props.children}</Container>
      </Main>
    </Wrapper>
  )
}

interface Props {
  children?: React.ReactNode;
}

export default UserLayout