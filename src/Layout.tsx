import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MenuBar from './components/MenuBar';
import Main from './pages/Main';
import Header from './components/Header';

function Layout() {
  return (
    <Container>
      <MenuBar />
      <Main />
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  width: 1024px;
  border: rgb(246, 248, 248) solid 1px;
  margin: auto;
  display: flex;
  justify-content: right;
  * {
    box-sizing: border-box;
  }
`;
