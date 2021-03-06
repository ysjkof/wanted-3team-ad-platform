import styled from 'styled-components';
import AdForm from '../components/AdForm';

export default function CreateAd() {
  return (
    <Container>
      <h1>광고 만들기</h1>
      <AdForm mode="create" />
    </Container>
  );
}

const Container = styled.div`
  height: 95vh;
  padding: 1.5rem;
`;
