import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { theme } from '../styles/theme';

export default function Main() {
  return (
    <Container>
      <Header />
      <Wrapper>
        <Content className="content">
          <Outlet />
        </Content>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 80%;
  background-color: ${theme.mainBackgroundColor};
  @media (max-width: 480px) {
    width: 100%;
  }
`;
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Content = styled.div`
  position: relative;
  top: 3rem;
  @media (max-width: 480px) {
    position: relative;
    top: 15vw;
    z-index: 0;
  }
`;
