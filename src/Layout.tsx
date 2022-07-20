import styled from 'styled-components';
import MenuBar from './components/MenuBar';
import Main from './pages/Main';

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
  width: 64rem;
  border: rgb(246, 248, 248) solid 1px;
  margin: auto;
  display: flex;
  justify-content: right;
  * {
    box-sizing: border-box;
  }
  @media (max-width: 480px) {
    width: 100vw;
  }
`;
