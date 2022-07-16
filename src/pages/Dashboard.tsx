import StatusControlDropdown from '../components/StatusControlDropdown';
import TotalAdStatus from '../components/TotalAdStatus';
import MediaStatus from '../components/MediaStatus';
import styled from 'styled-components';
import { theme } from '../theme';

export default function Dashboard() {
  return (
    <Container>
      <SubHeader>
        <h1>대시보드</h1>
        {/* <StatusControlDropdown /> */}
      </SubHeader>
      <TotalAdStatus />
      <MediaStatus />
    </Container>
  );
}

const Container = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 2rem;
  * {
    border-radius: 0.625rem;
  }
`;

const SubHeader = styled.div`
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
`;
