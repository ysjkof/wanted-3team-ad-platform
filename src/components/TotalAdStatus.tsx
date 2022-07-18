import styled from 'styled-components';
import { theme } from '../theme';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DailyIntegrationReport } from '../databaseTypes';
import useIntegrationStatusQuery from '../hook/useIntergrationQuery';
import { useState, useEffect } from 'react';

interface WeeklyIntegrationReport {
  roas: number;
  cost: number;
  imp: number;
  click: number;
  conv: number;
  convValue: number;
}

type WeekArr = DailyIntegrationReport[];

type singleDataCard = { name: string; value: string; change: string };

type WeeklyTotalData = singleDataCard[];

type StartAndEndDate = { startDate: Date; endDate: Date };
type TotalAdStatusProps = { selectedPeriod: StartAndEndDate };

export default function TotalAdStatus({ selectedPeriod }: TotalAdStatusProps) {
  // ** prps 받은 후 활성화 할 코드
  // selectedPeriod.startDate.setDate(selectedPeriod.startDate.getDate()-7);
  // const { loading, integrationReports, getIntegrationStatus } = useIntegrationStatusQuery({
  //   gte: selectedPeriod.startDate,
  //   lte: selectedPeriod.endDate,
  // });

  //props 받기 전 임의로 날짜 넣은 코드
  const { loading, integrationReports, getIntegrationStatus } = useIntegrationStatusQuery({
    gte: new Date('2022-03-01'),
    lte: new Date('2022-03-14'),
  });
  const [prevWeek, setPrevWeek] = useState<WeekArr>();
  const [currWeek, setCurrWeek] = useState<WeekArr>();

  useEffect(() => {
    const prev = integrationReports?.slice(0, 7);
    const curr = integrationReports?.slice(7, 14);
    setPrevWeek(prev);
    setCurrWeek(curr);
  }, [integrationReports]);

  const newTotal = prevWeek?.map((data) => {
    const date = new Date(data.date);
    const dateString = `${date.getMonth() + 1}월 ${date.getDate()}일`;
    return { ...data, dateformat: dateString };
  });

  const getWeekTotalData = (weekData: WeekArr): WeeklyIntegrationReport => {
    const WeekTotalData = weekData.reduce(
      (prev, cur) => {
        for (const key in prev) {
          prev[key as keyof typeof prev] = prev[key as keyof typeof prev] + cur[key as keyof typeof prev];
        }
        return prev;
      },
      {
        roas: 0,
        cost: 0,
        imp: 0,
        click: 0,
        conv: 0,
        convValue: 0,
      },
    );
    WeekTotalData.roas = Math.round(WeekTotalData.roas / 7);
    return WeekTotalData;
  };

  const getWeeklyChange = (prev: WeeklyIntegrationReport, curr: WeeklyIntegrationReport): WeeklyIntegrationReport => {
    let result: WeeklyIntegrationReport = prev;
    for (const key in prev) {
      result[key as keyof typeof prev] = curr[key as keyof typeof prev] - prev[key as keyof typeof prev];
    }
    return result;
  };

  const currWeekTotalData = currWeek && getWeekTotalData(currWeek);
  const prevWeekTotalData = prevWeek && getWeekTotalData(prevWeek);
  const changeOfWeekTotalData =
    prevWeekTotalData && currWeekTotalData && getWeeklyChange(prevWeekTotalData, currWeekTotalData);

  const weeklyData: WeeklyTotalData = [
    {
      name: 'ROAS',
      value: `${currWeekTotalData?.roas}%`,
      change: `${changeOfWeekTotalData?.roas}%`,
    },
    {
      name: '광고비',
      value: `${Math.round(currWeekTotalData?.cost / 10000).toLocaleString()}만원`,
      change: `${Math.round(changeOfWeekTotalData?.cost / 10000).toLocaleString()}만원`,
    },
    {
      name: '노출수',
      value: `${Math.round(currWeekTotalData?.imp / 10000).toLocaleString()}만회`,
      change: `${Math.round(changeOfWeekTotalData?.imp / 10000).toLocaleString()}만회`,
    },
    {
      name: '클릭수',
      value: `${currWeekTotalData?.click.toLocaleString()}회`,
      change: `${changeOfWeekTotalData?.click.toLocaleString()}회`,
    },
    {
      name: '전환수',
      value: `${currWeekTotalData?.conv.toLocaleString()}회`,
      change: `${changeOfWeekTotalData?.conv.toLocaleString()}회`,
    },
    {
      name: '매출',
      value: `${Math.round(currWeekTotalData?.convValue / 10000).toLocaleString()}만원`,
      change: `${Math.round(changeOfWeekTotalData?.convValue / 10000).toLocaleString()}만원`,
    },
  ];

  return (
    <Container>
      <h3>통합 광고 현황</h3>
      <Wrap>
        <CardContainer>
          {changeOfWeekTotalData &&
            weeklyData.map((data: singleDataCard) => (
              <Card>
                <dt>{data.name}</dt>
                <div>
                  <dd className="value">{data.value}</dd>
                  <dd className="change">{data.change}</dd>
                </div>
              </Card>
            ))}
        </CardContainer>
        <ButtonContainer>
          <button>roas</button>
          <button>click</button>
        </ButtonContainer>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={newTotal}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dateformat" />
              <YAxis domain={[0, 1500]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="roas" stroke="#8884d8" />
              <Line type="monotone" dataKey="click" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Wrap>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
`;
const Wrap = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
`;

const CardContainer = styled.dl`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

const Card = styled.div`
  width: 30%;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border: 2px solid ${theme.borderColor};
  border-radius: 1rem;
  dt {
    font-size: 0.8rem;
    font-weight: 700;
    color: ${theme.lightFontColor};
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .value {
      font-size: 1.2rem;
      font-weight: 700;
      color: ${theme.darkFontColor};
    }
    .change {
      font-size: 0.8rem;
      font-weight: 600;
      color: ${theme.lightFontColor};
    }
  }
  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 0.2rem;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
  button {
    padding: 0.4rem 0.8rem;
    margin-right: 0.4rem;
    background: transparent;
    border: 2px solid ${theme.borderColor};
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 15rem;
`;
