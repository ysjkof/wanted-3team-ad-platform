import styled from 'styled-components';
import { theme } from '../theme';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { prevWeekExample, currWeekExample } from './TotalDataExample';
import { WeeklyIntegrationReport, WeekArr, singleDataCard, WeeklyTotalData } from '../database/dbTypes';

export default function TotalAdStatus() {
  const newTotal = prevWeekExample.map((data) => {
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

  const currWeekTotalData = getWeekTotalData(currWeekExample);
  const prevWeekTotalData = getWeekTotalData(prevWeekExample);
  const changeOfWeekTotalData = getWeeklyChange(prevWeekTotalData, currWeekTotalData);

  const weeklyData: WeeklyTotalData = [
    {
      name: 'ROAS',
      value: `${currWeekTotalData.roas}%`,
      change: `${changeOfWeekTotalData.roas}%`,
    },
    {
      name: '광고비',
      value: `${Math.round(currWeekTotalData.cost / 10000)}만원`,
      change: `${Math.round(changeOfWeekTotalData.cost / 10000)}만원`,
    },
    {
      name: '노출수',
      value: `${Math.round(currWeekTotalData.imp / 10000)}만회`,
      change: `${Math.round(changeOfWeekTotalData.imp / 10000)}만회`,
    },
    {
      name: '클릭수',
      value: `${currWeekTotalData.click.toLocaleString()}회`,
      change: `${changeOfWeekTotalData.click}회`,
    },
    {
      name: '전환수',
      value: `${currWeekTotalData.conv.toLocaleString()}회`,
      change: `${changeOfWeekTotalData.conv}회`,
    },
    {
      name: '매출',
      value: `${Math.round(currWeekTotalData.convValue / 10000)}만원`,
      change: `${Math.round(changeOfWeekTotalData.convValue / 10000)}만원`,
    },
  ];

  return (
    <Container>
      <CardContainer>
        {weeklyData.map((data: singleDataCard) => (
          <Card>
            <dt>{data.name}</dt>
            <div>
              <dd className="value">{data.value}</dd>
              <dd className="change">{data.change}</dd>
            </div>
          </Card>
        ))}
      </CardContainer>
      <div>
        <button>roas</button>
        <button>click</button>
      </div>
      <ResponsiveContainer width="100%" height="60%">
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
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="roas" stroke="#8884d8" />
          <Line type="monotone" dataKey="click" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  height: 30rem;
  padding: 2rem;
  background-color: white;
  border-radius: 2rem;
`;

const CardContainer = styled.dl`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
const Card = styled.div`
  width: 12rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid rgb(235, 235, 235);
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
`;
