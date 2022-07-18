import { useState } from 'react';
import { theme } from '../styles/theme';
import styled from 'styled-components';
import AdCardList from '../components/AdCardList';
import useAdvertisingManagement from '../hook/useAdvertisingManagement';

type AdType = 'web' | 'app';
type Status = 'active' | 'ended';
type SelectedStatus = 'all' | Status;

export interface Ad {
  id: number;
  adType: AdType;
  title: string;
  budget: number;
  status: Status;
  startDate: string;
  endDate: string | null;
  report: {
    cost: number;
    convValue: number;
    roas: number;
  };
}

interface Ads {
  count: number;
  ads: Ad[];
}

const initAds: Ads = {
  count: 4,
  ads: [
    {
      id: 1,
      adType: 'web',
      title: '광고 1234',
      budget: 500000,
      status: 'active',
      startDate: '2020-10-19T00:00:00',
      endDate: null,
      report: {
        cost: 267144117,
        convValue: 1157942685,
        roas: 433,
      },
    },
    {
      id: 2,
      adType: 'web',
      title: '광고 12345',
      budget: 200000,
      status: 'ended',
      startDate: '2021-01-22T00:00:00',
      endDate: '2021-12-21T23:59:59',
      report: {
        cost: 169837362,
        convValue: 745438798,
        roas: 438,
      },
    },
    {
      id: 3,
      adType: 'web',
      title: '원티드 광고 1234',
      budget: 150000,
      status: 'active',
      startDate: '2022-01-01T00:00:00',
      endDate: null,
      report: {
        cost: 699481243,
        convValue: 898716259,
        roas: 1284,
      },
    },
    {
      id: 4,
      adType: 'app',
      title: '광고 9912',
      budget: 240000,
      status: 'active',
      startDate: '2022-02-10T00:00:00',
      endDate: null,
      report: {
        cost: 9300222,
        convValue: 38234789,
        roas: 411,
      },
    },
  ],
};

export default function Management() {
  const [selectedStatus, setSelectedStatus] = useState<SelectedStatus>('all');

  const { managementState } = useAdvertisingManagement();

  const filteredAds = initAds.ads.filter((ad) => (selectedStatus !== 'all' ? ad.status === selectedStatus : ad));

  const handleSelectedStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SelectedStatus;
    setSelectedStatus(value);
  };

  const navigateToCreateAd = () => {};
  console.log('managementState', managementState);

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
          <AdCardList ads={filteredAds} />
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
