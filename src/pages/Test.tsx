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

  const { loading, totalAdStatus, getTotalAdStatus } = useTotalAdStatus();

  const { managementState, createAdvertising, modifyAdversising, deleteAdversising } = useAdvertisingManagement();

  const invokeGetMediaStatus = async () => {
    getMediaStatus({ gte: new Date('2022-02-06'), lte: new Date('2022-02-07') });
  };
  const invokeGetTotalAdStatus = async () => {
    getTotalAdStatus({ gte: new Date('2022-03-01'), lte: new Date('2022-03-28') });
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
        <button onClick={invokeGetMediaStatus}>매체현황 부르기</button>
        <button onClick={invokeGetTotalAdStatus}>광고현황 부르기</button>
        <button onClick={invokeCreateAdvertising}>광고 생성</button>
        <button onClick={invokeModifyAdvertising}>광고 수정</button>
        <button onClick={invokeDeleteAdvertising}>광고 제거</button>
      </div>
      <div>
        <div>매체현황</div>
        {mediaLoading
          ? 'loading'
          : mediaStatus?.map((report, idx) => (
              <p key={idx}>
                날짜 : {report.date}
                <br />
                ROAS : {report.roas}
              </p>
            ))}
      </div>
      <div>
        <div>광고현황</div>
        {loading ? (
          'loading'
        ) : (
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
              <div>전 기간: </div>
              {totalAdStatus?.prev?.map((report, idx) => (
                <p key={idx}>
                  날짜 : {report.date}
                  <br />
                  ROAS : {report.roas}
                </p>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
              <div>이번 기간: </div>
              {totalAdStatus?.curr?.map((report, idx) => (
                <p key={idx}>
                  날짜 : {report.date}
                  <br />
                  ROAS : {report.roas}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${theme.mainBackgroundColor};
`;
