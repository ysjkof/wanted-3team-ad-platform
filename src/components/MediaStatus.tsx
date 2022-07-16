import styled from "styled-components"
import {media} from './mediaDataExample'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { useState } from "react";
// import CustomToolTip from "./ToolTip";

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
interface I_customToolTip {
  show:boolean,
  position:{
    x:number,
    y:number
  },
  content:any
}
export default function MediaStatus(){
  const beforeDate = "2022-02-01";
  const afterDate = "2022-02-07"
    const [tooltip, setToolTip] = useState<I_customToolTip>();
  
  const mediaReduce = (arrData:I_MediaData[],before:string,after:string) => {
    const startMonth = Number(before.split("-")[1]);
    const startDate = Number(before.split("-")[2]);
    const endDate = Number(after.split("-")[2]);
    let count = Number(startDate);
    let channelCount:number = 0;
    let currentChannelName:string;
      return arrData?.reduce((obj:any,val:any) => {
        if(Number(val.date.split("-")[1]) === startMonth && Number(val.date.split("-")[2]) === count){
            obj[channelCount] = {
              channel: val?.channel,
              cost: obj[val.channel]?.cost === undefined ? val?.cost : obj[val.channel]?.cost + val.cost,
              roas: obj[val.channel]?.roas === undefined ? val?.roas : obj[val.channel]?.roas + val.roas,
              imp: obj[val.channel]?.imp === undefined ? val?.imp : obj[val.channel]?.imp + val.imp,
              click: obj[val.channel]?.click === undefined ? val?.click : obj[val.channel]?.click + val.click,
              cvr: obj[val.channel]?.cvr === undefined ? val?.cvr : obj[val.channel]?.cvr + val.cvr,
            } 
            if(count !== endDate) count = count + 1;
            if(currentChannelName !== val.channel){
              currentChannelName = val.channel
              channelCount++;
            }
          }
          return obj
      },[])
   }
   
  const mediaData = mediaReduce(media,beforeDate,afterDate);
  interface I_reduceChart {
    channel:string,
    click:number,
    roas:number,
    cvr:number,
    imp:number,
    cost:number,
  }
  const chartReduce = mediaData.reduce((obj:any,val:I_reduceChart,i:number)=>{
      console.log(obj[0]?.total , val.cost , obj[0]?.total === undefined ),
    
      obj[0] = {
        element:"cost",
        [val.channel]: val.cost ,
        ...obj[0],
        total: obj[0]?.total === undefined ? val.cost : obj[0]?.total + val.cost,
      },
      
      obj[1] = {
        element:"roas",
        [val.channel]: val.roas ,
        ...obj[1],
        total: obj[1]?.total === undefined ? val.roas : obj[1]?.total+val.roas,
      },
      obj[2] = {
        element:"imp",
        [val.channel]: val.imp ,
        ...obj[2],
        total: obj[2]?.total === undefined ? val.imp : obj[2]?.total+val.imp,
      },
      obj[3] = {
        element:"click",
        [val.channel]: val.click ,
        ...obj[3],
        total: obj[3]?.total === undefined ? val.click : obj[3]?.total+val.click,
      },
      obj[4] = {
        element:"cvr",
        [val.channel]: val.cvr ,
        ...obj[4],
        total: obj[4]?.total === undefined ? val.cvr : obj[4]?.total+val.cvr,
      }
    
    return obj
   },[]);
  const chartData = chartReduce;
  const domain = [0,100]
  // const domain = ["0","100"]
  // const ticks = ["20" , "40" , "60", "80","100"] 
  const ticks = [20,40,60,80,100] 
  const BarWithBorder = (borderHeight: number, borderColor: string) => {
  return (props: any) => {
    const { fill, x, y, width, height } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke="none"
          fill={fill}
        />
        <rect
          x={x}
          y={y}
          width={width}
          height={borderHeight}
          stroke="none"
          fill={borderColor}
        />
      </g>
    );
  };
};
const Content = ({name , value}:any) => {
  return(
    <div>
      <span>{name}</span>
      <br />
      <span>{value}</span>
    </div>
  )
}
const showTooltip = (data:any , i:any , event:any) => {
  const value = data[data.tooltipPayload[0].dataKey]
  setToolTip({
    show:true,
    position: {x:event.clientX,y:event.clientY},
    content: <Content name={data.tooltipPayload[0].dataKey} value={value} />
  })
  
}

const leaveTooltip = () => {
    setToolTip({
    show:false,
    position: {x:0,y:0},
    content: "hi"
  })
}
type T_Position = {x:number,y:number}
const CustomToolTip = ({position,content}:any) => {
  const {x,y} = position || {};
  return(
    <div
    style={{ left:x+5 , top: y+5 }}
    >
      {content}
    </div>
  )
}
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
          <XAxis dataKey="element"/>
          {/* <YAxis domain={domain} tick={{ticks}} /> */}
          <YAxis domain={domain} ticks={ticks} tickFormatter={(ticks) => { return `${ticks}%`}} />
          <Legend />
          <Bar dataKey="kakao" stackId="aStack" fill="#f9e000" barSize={40} shape={BarWithBorder(1, "#ffffff")} onMouseOver={showTooltip} onMouseLeave={leaveTooltip}/>
          <Bar dataKey="google" stackId="aStack" fill="#AC8AF8" shape={BarWithBorder(1, "#ffffff")}  onMouseOver={showTooltip} onMouseLeave={leaveTooltip}/>
          <Bar dataKey="naver" stackId="aStack" fill="#85DA47" shape={BarWithBorder(1, "#ffffff")} onMouseOver={showTooltip} onMouseLeave={leaveTooltip}/>
          <Bar dataKey="facebook" stackId="aStack" fill="#4FADF7" radius={[5,5,0,0]} onMouseOver={showTooltip} onMouseLeave={leaveTooltip}/>
          
        </BarChart>
      </ResponsiveContainer>
          {tooltip?.show && (
    <CustomToolTip {...tooltip} />
  )}
  

  </Chart>
)
        }

const Chart = styled.div`
  width: 50rem;
  height: 30rem;
`;