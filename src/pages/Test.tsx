import styled from 'styled-components';
import useAdvertisingManagementQuery from '../hook/useAdvertisingManagementQuery';
import useIntegrationStatusQuery from '../hook/useIntergrationQuery';
import useMediaQuery from '../hook/useMediaQuery';
import { theme } from '../theme';

export default function Test() {
  const {
    loading: mediaLoading,
    mediaReports,
    dateOfData: mediaDateOfData,
    queryMediaReports,
  } = useMediaQuery({
    property: 'date',
    gte: new Date('2022-02-04'),
    lte: new Date('2022-02-05'),
  });

  const { loading, integrationReports, dateOfData, queryIntegrationStatus } = useIntegrationStatusQuery({
    property: 'date',
    gte: new Date('2022-02-04'),
    lte: new Date('2022-02-05'),
  });

  const { managementState, createAdvertising } = useAdvertisingManagementQuery();

  const onClick = async () => {
    queryMediaReports({ property: 'date', gte: new Date('2022-02-06'), lte: new Date('2022-02-07') });
  };

  const invokeCreateAdvertising = () => {
    createAdvertising({
      adType: 'web',
      budget: 121809324,
      startDate: new Date(),
      title: '테스트 광고 생성',
      status: 'active',
    });
  };

  // console.log('integrationReports', integrationReports?.report.daily);
  // console.log('mediaReports', mediaReports);
  // console.log('managementState', managementState);

  return (
    <Container>
      <button onClick={onClick}>TEST BTN</button>
      <button onClick={invokeCreateAdvertising}>TEST 광고 생성</button>
      {mediaLoading ? 'loading' : mediaReports?.map((report, idx) => <p key={idx}>{report.date}</p>)}
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  background-color: ${theme.mainBackgroundColor};
`;
