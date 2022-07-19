import styled from 'styled-components';
import { theme } from '../styles/theme';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Total } from './TotalDataExample';

type DailyData = {
  imp: number;
  click: number;
  cost: number;
  conv: number;
  convValue: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
  roas: number;
  date: string;
};

type WeekArr = DailyData[];

type singleDataCard = { name: string; value: string; change: string };

type WeeklyTotalData = singleDataCard[];

type StartAndEndDate = { startDate: Date; endDate: Date }; //한운기 추가
type TotalAdStatusProps = { selectedPeriod: StartAndEndDate }; //한운기 추가

export default function TotalAdStatus({ selectedPeriod }: TotalAdStatusProps) {
  const newTotal = Total.map((data) => {
    const date = new Date(data.date);
    const dateString = `${date.getMonth() + 1}월 ${date.getDate()}일`;
    return { ...data, dateformat: dateString };
  });

  const getWeeklyTotalData = (weekArr: WeekArr): WeeklyTotalData => {
    const roas = parseInt(`${weekArr.reduce((a, b) => a + b.roas, 0) / 7}`);
    const cost = weekArr.reduce((a, b) => a + b.cost, 0).toLocaleString();
    const imp = weekArr.reduce((a, b) => a + b.imp, 0).toLocaleString();
    const click = weekArr.reduce((a, b) => a + b.click, 0).toLocaleString();
    const conv = weekArr.reduce((a, b) => a + b.conv, 0).toLocaleString();
    const convValue = weekArr.reduce((a, b) => a + b.convValue, 0).toLocaleString();
    const weeklyData = [
      { name: 'ROAS', value: `${roas}%`, change: '▲18%' },
      { name: '광고비', value: `${cost}원`, change: '▲18%' },
      { name: '노출수', value: `${imp}회`, change: '▲18%' },
      { name: '클릭수', value: `${click}회`, change: '▲18%' },
      { name: '전환수', value: `${conv}회`, change: '▲18%' },
      { name: '매출', value: `${convValue}원`, change: '▲18%' },
    ];
    return weeklyData;
  };
  const weeklyTotalData = getWeeklyTotalData(Total);

  return (
    <Container>
      <h3>통합 광고 현황</h3>
      <Wrap>
        <CardContainer>
          {weeklyTotalData.map((data: singleDataCard) => (
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
