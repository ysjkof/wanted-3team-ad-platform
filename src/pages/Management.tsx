import { useState } from 'react';
import { theme } from '../styles/theme';
import styled from 'styled-components';
import { AdvertisingStatus } from '../interfaces/database';
import useAdvertisingManagementQuery from '../hook/useAdvertisingManagement';
import AdCardList from '../components/AdCardList';
import { useNavigate } from 'react-router-dom';

type SelectedStatus = 'all' | AdvertisingStatus;
export type HandleDeleteClick = (id: number) => void;

export default function Management() {
  const [selectedStatus, setSelectedStatus] = useState<SelectedStatus>('all');

  const { managementState, deleteAdversising, getManagementState } = useAdvertisingManagementQuery();

  const navigate = useNavigate();

  const filteredAds = managementState.ads.filter((ad) =>
    selectedStatus !== 'all' ? ad.status === selectedStatus : ad,
  );

  const handleSelectedStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SelectedStatus;
    setSelectedStatus(value);
  };

  const navigateToCreateAd = () => {
    navigate('/create');
  };

  const handleDeleteClick = async (id: number) => {
    if (confirm('정말로 삭제 하시겠습니까?')) {
      await deleteAdversising(id);
      await getManagementState();
    }
  };

  return (
    <Container>
      <h1>광고관리</h1>
      <Contents>
        <FlexBetween>
          <DropDown value={selectedStatus} onChange={handleSelectedStatusChange}>
            <option value="all">전체 광고</option>
            <option value="active">현재 진행중</option>
            <option value="ended">종료</option>
          </DropDown>
          <div>
            <Button onClick={navigateToCreateAd}>광고 만들기</Button>
          </div>
        </FlexBetween>
        <AdCardListWrapper>
          <AdCardList ads={filteredAds} handleDeleteClick={handleDeleteClick} />
        </AdCardListWrapper>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  height: 90%;
  padding: 1.5rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Contents = styled.div`
  height: 90%;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: white;
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DropDown = styled.select`
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid ${theme.primaryColor};
  background-color: ${theme.primaryColor};
  color: white;
  cursor: pointer;
`;

const AdCardListWrapper = styled.div`
  height: 77vh;
  overflow: auto;
`;
