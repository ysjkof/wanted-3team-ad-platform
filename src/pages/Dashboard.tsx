import TotalAdStatus from '../components/TotalAdStatus';
import MediaStatus from '../components/MediaStatus';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { getTotalDataRangeByDate } from '../utils/getProcessedData';
import {
  addDays,
  addMonths,
  differenceInCalendarMonths,
  differenceInDays,
  endOfMonth,
  max,
  min,
  startOfMonth,
  format,
} from 'date-fns';

type StartAndEndDate = { startDate: Date; endDate: Date };
type PeriodOptions = StartAndEndDate[];

enum PeriodType {
  BY_MONTHLY = 'by_monthly',
  BY_WEEKLY = 'by_weekly',
}
const daysInWeek = 7;

export default function Dashboard() {
  const totalDataRangeByDate = useRef<StartAndEndDate>({} as StartAndEndDate);
  const [selectedPeriodType, setSelectedPeriodType] = useState<PeriodType>(PeriodType.BY_WEEKLY);
  const [periodOptions, setPeriodOptions] = useState<PeriodOptions>([]);
  const [selectedPeriodOption, setSelectedPeriodOption] = useState<StartAndEndDate>({} as StartAndEndDate);

  useEffect(() => {
    getTotalDataRangeByDate().then((result) => {
      totalDataRangeByDate.current = result;
      getPeriodOptions();
    });
  }, []);

  useEffect(() => {
    setSelectedPeriodOption(periodOptions[0]);
  }, [periodOptions]);

  useEffect(() => {
    if (totalDataRangeByDate.current.startDate && totalDataRangeByDate.current.endDate) getPeriodOptions();
  }, [selectedPeriodType]);

  const getPeriodOptions = () => {
    const startDate = totalDataRangeByDate.current.startDate;
    const endDate = totalDataRangeByDate.current.endDate;
    if (selectedPeriodType === PeriodType.BY_WEEKLY) {
      setPeriodOptions(
        Array(Math.ceil(differenceInDays(endDate, startDate) / daysInWeek))
          .fill(0)
          .map((_, index) => {
            const _startDate = addDays(startDate, index * daysInWeek);
            const _endDate = min([addDays(_startDate, 6), endDate]);
            return { startDate: _startDate, endDate: _endDate };
          }),
      );
    } else if (selectedPeriodType === PeriodType.BY_MONTHLY) {
      setPeriodOptions(
        Array(differenceInCalendarMonths(endDate, startDate) + 1)
          .fill(0)
          .map((_, index) => {
            const _startDate = max([startDate, startOfMonth(addMonths(startDate, index))]);
            const _endDate = min([endDate, endOfMonth(addMonths(startDate, index))]);
            return { startDate: _startDate, endDate: _endDate };
          }),
      );
    }
  };

  const handlePeriodTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriodType(
      Object.values(PeriodType).find((value) => value === event.target.value) || PeriodType.BY_WEEKLY,
    );
  };
  const handleSelectedPeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriodOption(periodOptions[Number(event.target.value)]);
  };

  return (
    <Container>
      <SubHeader className="sub_header">
        <h1>대시보드</h1>
        <DateSelectorsContainer>
          <select name="period_type" defaultValue={PeriodType.BY_WEEKLY} onChange={handlePeriodTypeChange}>
            <option value={PeriodType.BY_WEEKLY}>주간</option>
            <option value={PeriodType.BY_MONTHLY}>월간</option>
          </select>
          <select name="periods" onChange={handleSelectedPeriodChange} style={{ textAlign: 'right' }}>
            {periodOptions.map((periodOption, index) => (
              <option key={index} value={index}>
                {format(periodOption.startDate, 'yyyy년 MM월 dd일') +
                  ' ~ ' +
                  format(periodOption.endDate, 'yyyy년 MM월 dd일')}
              </option>
            ))}
          </select>
        </DateSelectorsContainer>
      </SubHeader>
      <TotalAdStatus selectedPeriod={selectedPeriodOption} />
      <MediaStatus selectedPeriod={selectedPeriodOption} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 2rem;
  > * {
    margin-bottom: 3rem;
  }
  * {
    border-radius: 0.625rem;
  }
`;

const SubHeader = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 480px) {
    flex-direction: column;
    height: 4rem;
    > * {
      margin-bottom: 1rem;
    }
  }
`;

const DateSelectorsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: inherit;
  * {
    margin-left: 1rem;
    height: 100%;
    border: none;
    padding: 0.25rem;
    font-size: 0.9rem;
    background-color: inherit;
    &:focus {
      outline: none;
    }
  }
  @media (max-width: 480px) {
    width: 100%;
    * {
      font-size: 0.8rem;
      margin-left: 0;
      margin-right: 1rem;
      background-color: white;
    }
  }
`;
