import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import styled from 'styled-components';

const PERIOD = {
  byMonthly: 30,
  byWeekly: 7,
};

const datesList = [
  '2022-02-01',
  '2022-02-02',
  '2022-02-03',
  '2022-02-04',
  '2022-02-05',
  '2022-02-06',
  '2022-02-07',
  '2022-02-08',
  '2022-02-09',
  '2022-02-10',
  '2022-02-11',
  '2022-02-12',
  '2022-02-13',
  '2022-02-14',
  '2022-02-15',
  '2022-02-16',
  '2022-02-17',
  '2022-02-18',
  '2022-02-19',
  '2022-02-20',
  '2022-02-21',
  '2022-02-22',
  '2022-02-23',
  '2022-02-24',
  '2022-02-25',
  '2022-02-26',
  '2022-02-27',
  '2022-02-28',
  '2022-03-01',
  '2022-03-02',
  '2022-03-03',
  '2022-03-04',
  '2022-03-05',
  '2022-03-06',
  '2022-03-07',
  '2022-03-08',
  '2022-03-09',
  '2022-03-10',
  '2022-03-11',
  '2022-03-12',
  '2022-03-13',
  '2022-03-14',
  '2022-03-15',
  '2022-03-16',
  '2022-03-17',
  '2022-03-18',
  '2022-03-19',
  '2022-03-20',
  '2022-03-21',
  '2022-03-22',
  '2022-03-23',
  '2022-03-24',
  '2022-03-25',
  '2022-03-26',
  '2022-03-27',
  '2022-03-28',
  '2022-03-29',
  '2022-03-30',
  '2022-03-31',
];

export default function StatusControlDropdown() {
  const [dataPeriodType, setDataPeriodType] = useState<number>(PERIOD.byWeekly);
  const [periodsText, setPeriodsText] = useState<Array<string>>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const getPeriodsText = () => {
    const getWeeklyPeriodText = (prev: string[], curr: string, currIndex: number, array: string[]) => {
      if (currIndex % dataPeriodType === 0) {
        return [...prev, curr + ' ~ ' + array[Math.min(currIndex + dataPeriodType - 1, array.length - 1)]];
      }
      return prev;
    };
    const getMonthlyPeriodText = (producedTexts: string[], curr: string, currIndex: number, array: string[]) => {
      const month = curr.slice(5, 7);
      if (producedTexts[producedTexts.length - 1].month != month) return;
    };
    setPeriodsText(datesList.reduce<string[]>(getWeeklyPeriodText, []) || []);
  };

  const handlePeriodTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDataPeriodType(Object.values(PERIOD).find((value) => value === Number(event.target.value)) || dataPeriodType);
  };
  const handleSelectedPeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
  };

  useEffect(() => {
    getPeriodsText();
  }, [datesList, dataPeriodType]);

  return (
    <Container>
      <Picker>
        <select name="period_type" onChange={handlePeriodTypeChange}>
          <option selected value={PERIOD.byWeekly}>
            주간
          </option>
          <option value={PERIOD.byMonthly}>월간</option>
        </select>
      </Picker>
      <Picker>
        <select name="periods" onChange={handleSelectedPeriodChange}>
          {periodsText.map((period, index) => (
            <option key={index} value={index}>
              {period}
            </option>
          ))}
        </select>
      </Picker>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const Picker = styled.div``;
