import styled from 'styled-components';
import useAdvertisingManagementQuery from '../hook/useAdvertisingManagementQuery';
import useTotalAdStatus from '../hook/useIntergrationQuery';
import useMediaQuery from '../hook/useMediaQuery';
import { theme } from '../theme';

export default function Test() {
  const {
    loading: mediaLoading,
    mediaReports,
    getMediaReports,
  } = useMediaQuery({
    gte: new Date('2022-02-04'),
    lte: new Date('2022-02-05'),
  });

  const { loading, totalAdStatus, getTotalAdStatus } = useTotalAdStatus({
    gte: new Date('2022-02-04'),
    lte: new Date('2022-02-05'),
  });

  const { managementState, createAdvertising, modifyAdversising, deleteAdversising } = useAdvertisingManagementQuery();

  const invokeTestBtn = async () => {
    getMediaReports({ gte: new Date('2022-02-06'), lte: new Date('2022-02-07') });
    // modifyAdversising({
    //   id: 5,
    //   adType: 'web',
    //   // budget: 500,
    //   // title: '테스트 광고 수정',
    //   status: 'active',
    // });
    // deleteAdversising(5);
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

  return (
    <Container>
      <div>
        <button onClick={invokeTestBtn}>테스트 버튼</button>
        <button onClick={invokeCreateAdvertising}>테스트 광고 생성</button>
      </div>
      {mediaLoading
        ? 'loading'
        : mediaReports?.map((report, idx) => (
            <p key={idx}>
              날짜 : {report.date}
              <br />
              ROAS : {report.roas}
            </p>
          ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${theme.mainBackgroundColor};
`;
