import styled from 'styled-components';
import AdForm from '../components/AdForm';

export default function ModifyAd() {
  return (
    <Container>
      <h1>광고 수정</h1>
      <AdForm mode="modify" />
    </Container>
  );
}

const Container = styled.div`
  height: 95vh;
  padding: 1.5rem;
`;
