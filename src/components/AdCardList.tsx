import { useState } from 'react';
import styled from 'styled-components';
import AdCard from './AdCard';

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

const ads: Ads = {
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

export default function AdCardList() {
  const [selectedStatus, setSelectedStatus] = useState<SelectedStatus>('all');

  const handleSelectedStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SelectedStatus;
    setSelectedStatus(value);
  };

  const filteredAds = ads.ads.filter((ad) => (selectedStatus !== 'all' ? ad.status === selectedStatus : ad));

  return (
    <>
      <select value={selectedStatus} onChange={handleSelectedStatusChange}>
        <option value="all">전체 광고</option>
        <option value="active">현재 진행중</option>
        <option value="ended">종료</option>
      </select>
      <Container>
        {filteredAds.map((ad) => {
          return <AdCard key={ad.id} Content={ad} />;
        })}
      </Container>
    </>
  );
}

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 10px;
  background-color: white;

  list-style: none;
`;
