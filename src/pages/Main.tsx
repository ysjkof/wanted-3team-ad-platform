import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { theme } from '../theme';

export default function Main() {
  return (
    <Container>
      <Header />
      <Content className="content">
        <Outlet />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  background-color: ${theme.mainBackgroundColor};
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Content = styled.div`
  @media (max-width: 480px) {
    position: relative;
    top: 15vw;
    z-index: 0;
  }
`;
