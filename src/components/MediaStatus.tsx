import styled from "styled-components"
import {media} from './mediaDataExample'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";

interface I_MediaData {
  channel: String, // 채널
  date: String, // 날짜
  imp: Number, // 노출횟수
  click: Number, // 클릭수
  cost: Number, // 광고비용 / 비용
  convValue: Number,
  ctr: Number, // 광고 노출 대비 클릭 수
  cvr: Number, // 전환 / 구매 전환율
  cpc: Number, // 클릭당 비용
  cpa: Number, // 가입까지 든 비용
  roas: Number // 매출 / 광고수익
}
interface I_reduceData {
  click:Number,
  cost:Number,
  cvr:Number,
  imp:Number,
  roas:Number,
}
export default function MediaStatus(){
  const beforeDate = "2022-02-01";
  const afterDate = "2022-02-07"
  const mediaReduce = (arrData:I_MediaData[],before:string,after:string) => {
    const startMonth = Number(before.split("-")[1]);
    const startDate = Number(before.split("-")[2]);
    const endDate = Number(after.split("-")[2]);
    let count = Number(startDate);
      return arrData?.reduce((obj:any,val:any) => {
        if(Number(val.date.split("-")[1]) === startMonth && Number(val.date.split("-")[2]) === count){
            obj[val.channel] = {
              cost: obj[val.channel]?.cost === undefined ? val?.cost : obj[val.channel]?.cost + val.cost,
              roas: obj[val.channel]?.roas === undefined ? val?.roas : obj[val.channel]?.roas + val.roas,
              imp: obj[val.channel]?.imp === undefined ? val?.imp : obj[val.channel]?.imp + val.imp,
              click: obj[val.channel]?.click === undefined ? val?.click : obj[val.channel]?.click + val.click,
              cvr: obj[val.channel]?.cvr === undefined ? val?.cvr : obj[val.channel]?.cvr + val.cvr,
            } 
            if(count !== endDate) count = count + 1;
          }
          return obj
      },[])
   }
  const mediaData = mediaReduce(media,beforeDate,afterDate);
  console.log("데이터",mediaData);
  
  return (
  <div>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
          data={mediaData}>
        <CartesianGrid />
        <XAxis dataKey="channel" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="roas" stackId="a" fill="#8884d8" />
        <Bar dataKey="cost" stackId="a" fill="green" />
        <Bar dataKey="click"  fill="blue" />
      </BarChart>
    </ResponsiveContainer>
  </div>
  )
}

const Chart = styled.div`

`;