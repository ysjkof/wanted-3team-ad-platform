import styled from 'styled-components';
import { media } from './mediaDataExample';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { useState } from 'react';

interface I_MediaData {
  channel: String; // 채널
  date: String; // 날짜
  imp: Number; // 노출횟수
  click: Number; // 클릭수
  cost: Number; // 광고비용 / 비용
  convValue: Number;
  ctr: Number; // 광고 노출 대비 클릭 수
  cvr: Number; // 전환 / 구매 전환율
  cpc: Number; // 클릭당 비용
  cpa: Number; // 가입까지 든 비용
  roas: Number; // 매출 / 광고수익
}
interface I_reduceData {
  click: Number;
  cost: Number;
  cvr: Number;
  imp: Number;
  roas: Number;
}

type StartAndEndDate = { startDate: Date; endDate: Date }; //한운기 추가
type TotalAdStatusProps = { selectedPeriod: StartAndEndDate }; //한운기 추가

export default function MediaStatus({ selectedPeriod }: TotalAdStatusProps) {
  const beforeDate = '2022-02-01';
  const afterDate = '2022-02-07';

  const mediaReduce = (arrData: I_MediaData[], before: string, after: string) => {
    const startMonth = Number(before.split('-')[1]);
    const startDate = Number(before.split('-')[2]);
    const endDate = Number(after.split('-')[2]);
    let count = Number(startDate);
    let channelCount: number = 0;
    let currentChannelName: string;
    return arrData?.reduce((obj: any, val: any) => {
      if (Number(val.date.split('-')[1]) === startMonth && Number(val.date.split('-')[2]) === count) {
        console.log('채널카운트', channelCount);
        obj[channelCount] = {
          channel: val?.channel,
          cost: obj[val.channel]?.cost === undefined ? val?.cost : obj[val.channel]?.cost + val.cost,
          roas: obj[val.channel]?.roas === undefined ? val?.roas : obj[val.channel]?.roas + val.roas,
          imp: obj[val.channel]?.imp === undefined ? val?.imp : obj[val.channel]?.imp + val.imp,
          click: obj[val.channel]?.click === undefined ? val?.click : obj[val.channel]?.click + val.click,
          cvr: obj[val.channel]?.cvr === undefined ? val?.cvr : obj[val.channel]?.cvr + val.cvr,
        };

        if (count !== endDate) count = count + 1;
        if (currentChannelName !== val.channel) {
          currentChannelName = val.channel;
          channelCount++;
        }
      }
      return obj;
    }, []);
  };

  const mediaData = mediaReduce(media, beforeDate, afterDate);
  interface I_reduceChart {
    channel: string;
    click: number;
    roas: number;
    cvr: number;
    imp: number;
    cost: number;
  }
  const chartReduce = mediaData.reduce((obj: any, val: I_reduceChart, i: number) => {
    console.log('밸류', val);

    (obj[0] = {
      element: 'cost',
      [val.channel]: val.cost,
      ...obj[0],
    }),
      (obj[1] = {
        element: 'roas',
        [val.channel]: val.cost,
        ...obj[1],
      }),
      (obj[2] = {
        element: 'imp',
        [val.channel]: val.cost,
        ...obj[2],
      }),
      (obj[3] = {
        element: 'click',
        [val.channel]: val.cost,
        ...obj[3],
      }),
      (obj[4] = {
        element: 'cvr',
        [val.channel]: val.cost,
        ...obj[4],
      });

    return obj;
  }, []);
  const chartData = chartReduce;
  // console.log("데이터",media);

  console.log('데이터1', mediaData);
  console.log('데이터2', chartData);

  return (
    <Chart>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="element" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="google" stackId="channel" fill="pupple" />
          <Bar dataKey="naver" stackId="channel" fill="green" />
          <Bar dataKey="facebook" stackId="channel" fill="blue" />
          <Bar dataKey="kakao" stackId="channel" fill="yellow" />
        </BarChart>
      </ResponsiveContainer>
    </Chart>
  );
}

const Chart = styled.div`
  width: 50rem;
  height: 50rem;
`;
