import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { theme } from '../theme';

export default function Main() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  background-color: ${theme.mainBackgroundColor};
`;
