import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import MediaTable from './MediaTable';
import { barColors, barKeys, CustomToolTip, mediaChartReduce, renderLegend, yAxisTickFormatter } from './MediaUtils';
import useMediaStatus from '../hook/useMediaStatus';

interface I_customToolTip {
  show: boolean;
  position: {
    x: number;
    y: number;
  };
  content: any;
}
type PeriodDate = { prev: Date; curr: Date };
type StartAndEndDate = { startDate: Date; endDate: Date }; //한운기 추가
type MediaStatusProps = { selectedPeriod: StartAndEndDate }; //한운기 추가

export default function MediaStatus({ selectedPeriod }: MediaStatusProps) {
  const [period, setPeriod] = useState<PeriodDate>({});
  const [tooltip, setToolTip] = useState<I_customToolTip>();
  const { loading, mediaStatus, getMediaStatus } = useMediaStatus();

  useEffect(() => {
    getMediaStatus({
      gte: selectedPeriod?.startDate,
      lte: selectedPeriod?.endDate,
    });
  }, [selectedPeriod]);

  const showTooltip = (data: any) => {
    const name: string = data.tooltipPayload[0].dataKey;
    const value = data.tooltipPayload[0].payload[name.split('.')[0]][name.split('.')[1]];

    setToolTip({
      show: true,
      position: { x: data.tooltipPosition.x - 56, y: data.background.y },
      content: { name: data.tooltipPayload[0].dataKey, value: Number.isInteger(value) ? value : value.toFixed(2) },
    });
  };
  const leaveTooltip = () => {
    setToolTip({
      show: false,
      position: { x: 0, y: 0 },
      content: { name: '', value: '' },
    });
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <Container>
      <Title>매체 현황</Title>
      <Wrap>
        <Chart>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={700}
              stackOffset="expand"
              data={mediaStatus && mediaChartReduce(mediaStatus)}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={28}
            >
              <Legend content={renderLegend} />
              <CartesianGrid horizontal={true} vertical={false} dx={-200} stroke="#E6E7E8" />
              <XAxis
                dataKey="name"
                stroke="#E6E7E8"
                dy={10}
                tick={{ fontSize: '12px', stroke: '#c5cace', fontFamily: 'Nanum Gothic' }}
                tickLine={false}
                interval={0}
              />
              <YAxis
                tick={{ dy: 10, dx: 32, fontSize: '12px' }}
                tickLine={{ stroke: '#E6E7E8' }}
                style={{ textAlign: 'left' }}
                tickSize={40}
                tickCount={6}
                tickFormatter={yAxisTickFormatter}
                axisLine={false}
              />
              {barKeys[0].map((key: any) => {
                const bars = [];
                bars.push(
                  <Bar
                    dataKey={key}
                    stackId="key"
                    fill={barColors[key.split('.')[1]]}
                    radius={key.split('.')[1] === 'facebook' ? [5, 5, 0, 0] : null}
                    onMouseOver={showTooltip}
                  />,
                );
                return bars;
              })}
              {barKeys[1].map((key) => {
                const bars = [];
                bars.push(
                  <Bar
                    dataKey={key}
                    stackId="key"
                    fill={barColors[key.split('.')[1]]}
                    radius={key.split('.')[1] === 'facebook' ? [5, 5, 0, 0] : null}
                    onMouseOver={showTooltip}
                  />,
                );
                return bars;
              })}
              {barKeys[2].map((key) => {
                const bars = [];
                bars.push(
                  <Bar
                    dataKey={key}
                    stackId="key"
                    fill={barColors[key.split('.')[1]]}
                    radius={key.split('.')[1] === 'facebook' ? [5, 5, 0, 0] : null}
                    onMouseOver={showTooltip}
                  />,
                );
                return bars;
              })}
              {barKeys[3].map((key) => {
                const bars = [];
                bars.push(
                  <Bar
                    dataKey={key}
                    stackId="key"
                    fill={barColors[key.split('.')[1]]}
                    radius={key.split('.')[1] === 'facebook' ? [5, 5, 0, 0] : null}
                    onMouseOver={showTooltip}
                  />,
                );
                return bars;
              })}
              {barKeys[4].map((key) => {
                const bars = [];
                bars.push(
                  <Bar
                    dataKey={key}
                    stackId="key"
                    fill={barColors[key.split('.')[1]]}
                    radius={key.split('.')[1] === 'facebook' && [5, 5, 0, 0]}
                    onMouseOver={showTooltip}
                  />,
                );
                return bars;
              })}
            </BarChart>
          </ResponsiveContainer>
        </Chart>
        {mediaStatus && <MediaTable mediaStatus={mediaStatus} />}
        {tooltip?.show && <CustomToolTip {...tooltip} />}
      </Wrap>
    </Container>
  );
}
const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 1.2rem;
`;
const Container = styled.div`
  padding-top: 4.5rem;
  width: 100%;
  height: 100%;
  @media (max-width: 480px) {
  }
  tspan {
    font-size: 0.6rem;
  }
`;
const Wrap = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: white;
  border-radius: 15px;
`;
const Chart = styled.div`
  width: 100%;
  height: 26rem;
  padding-top: 4rem;
`;
