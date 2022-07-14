import styled from 'styled-components';
import { theme } from '../theme';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Total } from './TotalDataExample';

const newTotal = Total.map((data) => {
  const date = new Date(data.date);
  const dateString = `${date.getMonth() + 1}월 ${date.getDate()}일`;
  return { ...data, dateformat: dateString };
});

export default function TotalAdStatus() {
  return (
    <Container>
      <CardContainer>
        <Card>
          <dt>ROAS</dt>
          <div>
            <dd className="value">600%</dd>
            <dd className="change">▲18%</dd>
          </div>
        </Card>
        <Card>
          <dt>ROAS</dt>
          <div>
            <dd className="value">600%</dd>
            <dd className="change">▲18%</dd>
          </div>
        </Card>
        <Card>
          <dt>ROAS</dt>
          <div>
            <dd className="value">600%</dd>
            <dd className="change">▲18%</dd>
          </div>
        </Card>
        <Card>
          <dt>ROAS</dt>
          <div>
            <dd className="value">600%</dd>
            <dd className="change">▲18%</dd>
          </div>
        </Card>
        <Card>
          <dt>ROAS</dt>
          <div>
            <dd className="value">600%</dd>
            <dd className="change">▲18%</dd>
          </div>
        </Card>
        <Card>
          <dt>ROAS</dt>
          <div>
            <dd className="value">600%</dd>
            <dd className="change">▲18%</dd>
          </div>
        </Card>
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
          <Line type="monotone" dataKey="roas" stroke="#8884d8" activeDot={{ r: 8 }} />
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
  width: 28%;
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
      font-size: 1.4rem;
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
