import styled from 'styled-components';
import useAdvertisingManagement from '../hook/useAdvertisingManagement';
import useTotalAdStatus from '../hook/useTotalAdStatus';
import useMediaStatus from '../hook/useMediaStatus';
import { theme } from '../styles/theme';

export default function Test() {
  const {
    loading: mediaLoading,
    mediaStatus,
    getMediaStatus,
  } = useMediaStatus({
    gte: new Date('2022-02-04'),
    lte: new Date('2022-02-05'),
  });

  const { loading, totalAdStatus, getTotalAdStatus } = useTotalAdStatus({
    gte: new Date('2022-02-04'),
    lte: new Date('2022-02-05'),
  });

  const { managementState, createAdvertising, modifyAdversising, deleteAdversising } = useAdvertisingManagement();

  const invokeGetMediaStatus = async () => {
    getMediaStatus({ gte: new Date('2022-02-06'), lte: new Date('2022-02-07') });
  };

  const invokeCreateAdvertising = () =>
    createAdvertising({
      adType: 'web',
      budget: 121809324,
      startDate: new Date(),
      title: '테스트 광고 생성',
      status: 'active',
    });

  const invokeModifyAdvertising = () =>
    modifyAdversising({
      id: 5,
      adType: 'web',
      budget: 500,
      title: '테스트 광고 수정',
      status: 'active',
    });

  const invokeDeleteAdvertising = () => deleteAdversising(6);

  return (
    <Container>
      <div>
        <button onClick={invokeGetMediaStatus}>매체현황 다른 날짜 부르기</button>
        <button onClick={invokeCreateAdvertising}>광고 생성</button>
        <button onClick={invokeModifyAdvertising}>광고 수정</button>
        <button onClick={invokeDeleteAdvertising}>광고 제거</button>
      </div>
      {mediaLoading
        ? 'loading'
        : mediaStatus?.map((report, idx) => (
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
