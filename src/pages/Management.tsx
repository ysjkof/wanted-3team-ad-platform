import styled from 'styled-components';
import AdCardList from '../components/AdCardList';

export default function Management() {
  return (
    <Container>
      <h1>광고관리</h1>
      <AdCardList />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 1.5rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;
