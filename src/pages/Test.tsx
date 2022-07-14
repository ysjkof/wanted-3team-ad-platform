import styled from 'styled-components';
import useAdvertisingManagementQuery from '../hook/useAdvertisingManagementQuery';
import useIntegrationStatusQuery from '../hook/useIntergrationQuery';
import useMediaQuery from '../hook/useMediaQuery';
import { theme } from '../theme';

export default function Test() {
  const {
    loading: mediaLoading,
    mediaReports,
    queryMediaReports,
  } = useMediaQuery({
    property: 'date',
    gte: new Date('2022-02-04'),
    lte: new Date('2022-02-05'),
  });

  const { loading, integrationReports, queryIntegrationStatus } = useIntegrationStatusQuery({
    property: 'date',
    gte: new Date('2022-02-04'),
    lte: new Date('2022-02-05'),
  });

  const onClick = async () => {
    queryMediaReports({ property: 'date', gte: new Date('2022-02-06'), lte: new Date('2022-02-07') });
  };

  const { managementState } = useAdvertisingManagementQuery();

  console.log('integrationReports', integrationReports?.report.daily);
  console.log('mediaReports', mediaReports);
  return (
    <Container>
      <button onClick={onClick}>TEST BTN</button>
      {mediaLoading ? 'loading' : mediaReports?.map((report) => <p>{report.date}</p>)}
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  background-color: ${theme.mainBackgroundColor};
`;
