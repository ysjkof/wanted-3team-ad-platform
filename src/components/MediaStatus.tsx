import styled from 'styled-components';
import { media } from './mediaDataExample';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useState } from 'react';
import { DailyMediaReport } from '../databaseTypes';
import MediaTable from './MediaTable';
import { barColors, barKeys, mediaChartReduce, renderLegend, toPercent } from './MediaUtils';
// import CustomToolTip from "./ToolTip";

interface I_customToolTip {
  show: boolean;
  position: {
    x: number;
    y: number;
  };
  content: any;
}

type StartAndEndDate = { startDate: Date; endDate: Date }; //한운기 추가
type MediaStatusProps = { selectedPeriod: StartAndEndDate }; //한운기 추가

export default function MediaStatus({ selectedPeriod }: MediaStatusProps) {
  console.log('페리오드', selectedPeriod);
  const beforeDate = '2022-02-01';
  const afterDate = '2022-02-07';
  const [tooltip, setToolTip] = useState<I_customToolTip>();
  const mediaData = mediaChartReduce(media, beforeDate, afterDate);

  console.log('데이터', mediaData);

  const BarWithBorder = (borderHeight: number, borderColor: string) => {
    return (props: any) => {
      const { fill, x, y, width, height } = props;
      return (
        <g>
          <rect x={x} y={y} width={width} height={height} stroke="none" fill={fill} />
          <rect x={x} y={y} width={width} height={borderHeight} stroke="none" fill={borderColor} />
        </g>
      );
    };
  };
  const Content = ({ name, value }: any) => {
    return (
      <div>
        <span>{name}</span>
        <br />
        <span>{value}</span>
      </div>
    );
  };
  const showTooltip = (data: any, i: any, event: any) => {
    const value = data[data.tooltipPayload[0].dataKey];
    setToolTip({
      show: true,
      position: { x: event.clientX, y: event.clientY },
      content: <Content name={data.tooltipPayload[0].dataKey} value={value} />,
    });
  };
  const leaveTooltip = () => {
    setToolTip({
      show: false,
      position: { x: 0, y: 0 },
      content: 'hi',
    });
  };
  type T_Position = { x: number; y: number };
  const CustomToolTip = ({ position, content }: any) => {
    const { x, y } = position || {};
    console.log('포지션', content);

    return (
      <div style={{ left: 'x', top: 'y', width: '50px', height: '50px', backgroundColor: 'blueviolet' }}>{content}</div>
    );
  };
  // const CustomToolTip = ({ active, payload, label }) => {
  //   // console.log("액티브",active);
  //   // console.log("페이로드",payload);
  //   // console.log("라벨",label);
  // }

  return (
    <Container>
      <Title>매체 현황</Title>
      <Wrap>
        <Chart>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              stackOffset="expand"
              data={mediaData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={30}
            >
              <Legend content={renderLegend} />
              <CartesianGrid horizontal={true} vertical={false} dx={-200} stroke="#E6E7E8" />
              <XAxis
                dataKey="name"
                stroke="#E6E7E8"
                tick={{ dy: 10, fontSize: '12px', stroke: '#c5cace', fontWeight: '0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ dy: 10, dx: 35, fontSize: '14px' }}
                tickLine={{ stroke: '#E6E7E8' }}
                style={{ textAlign: 'left' }}
                tickSize={40}
                tickCount={6}
                tickFormatter={toPercent}
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
        {/* {tooltip?.show && (
                <CustomToolTip {...tooltip} />
              )} */}
        <MediaTable mediaData={mediaData} barColors={barColors} />
      </Wrap>
      {tooltip?.show && <CustomToolTip {...tooltip} />}
    </Container>
  );
}
const Title = styled.h2`
  font-size: 16px;
  margin-bottom: 1.2rem;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Wrap = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: white;
  border-radius: 15px;
  > * {
    margin-bottom: 1.2rem;
    margin: auto;
  }
`;
const Chart = styled.div`
  width: 100%;
  height: 20rem;
  padding-top: 4rem;
`;
