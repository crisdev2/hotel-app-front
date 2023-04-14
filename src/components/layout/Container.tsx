import styled from '@emotion/styled'
import { Container as MuiContainer } from '@mui/system'
import Breadcrumb from './Breadcrumb'
import Content from './Content'
import PageTitle from './PageTitle'
import { FC } from 'react'

const StyledContainer = styled(MuiContainer)`
`

const PageTitleBox = styled.div`
  display: flex;
  height: 75px;
  align-items: center;
  justify-content: space-between;
`

const Container: FC<Props> = (props) => {
  return (
    <StyledContainer maxWidth={false}>
      <PageTitleBox>
        <PageTitle />
        <Breadcrumb />
      </PageTitleBox>
      <Content>{props.children}</Content>
    </StyledContainer>
  )
}

interface Props {
  children?: React.ReactNode | string
}

export default Container