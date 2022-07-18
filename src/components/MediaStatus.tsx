import styled from "styled-components"
import {media} from './mediaDataExample'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { useState } from "react";
import { DailyMediaReport } from "../database/dbTypes";
import MediaTable from "./MediaTable";
// import CustomToolTip from "./ToolTip";

interface I_customToolTip {
  show:boolean,
  position:{
    x:number,
    y:number
  },
  content:any
}
const channelId = {
  // date: 0,
  cost: 0,
  roas: 1,
  imp: 2,
  click: 3,
  cvr: 4,
  convValue: 5,
  ctr: 6,
  cpc: 7,
  cpa: 8,
 
}
export default function MediaStatus(){
  const beforeDate = "2022-02-01";
  const afterDate = "2022-02-07"
    const [tooltip, setToolTip] = useState<I_customToolTip>();
  const mediaReduce = (arrData:DailyMediaReport[],before:string,after:string) => {
    const startMonth = Number(before.split("-")[1]);
    const startDate = Number(before.split("-")[2]);
    const endDate = Number(after.split("-")[2]);
    let count = Number(startDate);
    return arrData?.reduce((obj:any,val:any,i:number) => {
        if(Number(val.date.split("-")[1]) === startMonth && Number(val.date.split("-")[2]) === count){
            obj[channelId.cost] = {
              cost:{
                [val.channel]:val.cost,
                ...obj[channelId.cost]?.cost,
              },
              name:"광고비",
              total: obj[channelId.cost] === undefined ? val.cost : obj[channelId.cost].total + val.cost,
            },
            obj[channelId.roas] = {
              roas:{
                [val.channel]:val.roas,
                ...obj[channelId.roas]?.roas,
              },
              name:"매출",
              total: obj[channelId.roas] === undefined ? val.roas : obj[channelId.roas].total + val.roas,
            },
            obj[channelId.imp] = {
              imp:{
                [val.channel]:val.imp,
                ...obj[channelId.imp]?.imp,
              },
              name:"노출수",
              total: obj[channelId.imp] === undefined ? val.imp : obj[channelId.imp].total + val.imp,
            },
            obj[channelId.click] = {
              click:{
                [val.channel]:val.click,
                ...obj[channelId.click]?.click,
              },
              name:"클릭 수",
              total: obj[channelId.click] === undefined ? val.click : obj[channelId.click].total + val.click,
            },
            obj[channelId.cvr] = {
              cvr:{
                [val.channel]:val.cvr,
                ...obj[channelId.cvr]?.cvr,
              },
              name:"전환수",
              total: obj[channelId.cvr] === undefined ? val.cvr : obj[channelId.cvr].total + val.cvr,
            }
            if(count !== endDate) count = count + 1;
          }
          return obj
    },[])
  }
  const mediaData = mediaReduce(media,beforeDate,afterDate)
  const toPercent = (tick:number) => {
    const ticks:string[] = [];
    if(tick !== 0){
      ticks.push(`${tick * 100}%`)
    } 
    return ticks;
  }
  console.log("데이터",mediaData);

  const barKeys = [['cost.kakao', 'cost.google', 'cost.naver', 'cost.facebook'],
    ['imp.kakao', 'imp.google', 'imp.naver', 'imp.facebook'],
    ['click.kakao', 'click.google', 'click.naver', 'click.facebook'],
    ['roas.kakao', 'roas.google', 'roas.naver', 'roas.facebook'],
    ['cvr.kakao', 'cvr.google', 'cvr.naver', 'cvr.facebook']
  ];
  interface I_barColors {
    kakao: string,
    google: string,
    naver: string,
    facebook :string
  }
  const barColors:I_barColors = {
    kakao: "#f9E000",
    google: "#AC8AF8",
    naver: "#85DA47",
    facebook :"#4FADF7"
  }
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
  // const value = data[data.tooltipPayload[0].dataKey]
  // setToolTip({
  //   show:true,
  //   position: {x:event.clientX,y:event.clientY},
  //   content: <Content name={data.tooltipPayload[0].dataKey} value={value} />
  // })
}
const leaveTooltip = () => {
    setToolTip({
    show:false,
    position: {x:0,y:0},
    content: "hi"
  })
}
type T_Position = {x:number,y:number}
// const CustomToolTip = ({position,content}:any) => {
//   const {x,y} = position || {};
//   console.log(position);
  
//   return(
//     <div
//     style={{ width:"50px",height:"50px",backgroundColor:"blueviolet" }}
//     >
//       {content}
//     </div>
//   )
// }
const CustomToolTip = ({ active, payload, label }) => {
  console.log("액티브",active);
  console.log("페이로드",payload);
  console.log("라벨",label);
  
  
}
  return (
  <Container>
    <div>매체 현황</div>
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
          <Tooltip cursor={false} wrapperStyle={{ top: -150, left: 200 }} content={<CustomToolTip/>} />
          <CartesianGrid  horizontal={true} vertical={false} dx={-200} stroke="#E6E7E8"/>
          <XAxis dataKey="name" stroke="#E6E7E8" tick={{dy:10,fontSize:"12px" , stroke:"#c5cace" , fontWeight:"0"}}  tickLine={false} />
          {/* <YAxis domain={domain} tick={{ticks}} /> */}
          <YAxis tick={{dy:10 ,dx:35,fontSize:"14px"  }} tickLine={{stroke:"#E6E7E8"}} tickSize={40} tickCount={6} tickFormatter={toPercent} axisLine={false}   />
          {barKeys[0].map((key:any)=>{
            const bars = [];
            bars.push(<Bar dataKey={key} stackId="key" fill={barColors[key.split(".")[1]]}  radius={key.split(".")[1] === "facebook" ? [5,5,0,0] : null} onMouseOver={showTooltip} />)
            return bars;
          })}
          {barKeys[1].map((key)=>{
            const bars = [];
            bars.push(<Bar dataKey={key} stackId="key" fill={barColors[key.split(".")[1]]} radius={key.split(".")[1] === "facebook" ? [5,5,0,0] : null} onMouseOver={showTooltip}/>)
            return bars;
          })}
          {barKeys[2].map((key)=>{
            const bars = [];
            bars.push(<Bar dataKey={key} stackId="key" fill={barColors[key.split(".")[1]]} radius={key.split(".")[1] === "facebook" ? [5,5,0,0] : null} onMouseOver={showTooltip}/>)
            return bars;
          })}
          {barKeys[3].map((key)=>{
            const bars = [];
            bars.push(<Bar dataKey={key} stackId="key" fill={barColors[key.split(".")[1]]} radius={key.split(".")[1] === "facebook" ? [5,5,0,0] : null} onMouseOver={showTooltip}/>)
            return bars;
          })}
          {barKeys[4].map((key)=>{
            const bars = [];
            bars.push(<Bar dataKey={key} stackId="key" fill={barColors[key.split(".")[1]]} radius={key.split(".")[1] === "facebook" && [5,5,0,0]} onMouseOver={showTooltip}/>)
            return bars;
          })}
          {/* <Bar dataKey="kakao" stackId="aStack" fill="#f9e000" barSize={40} shape={BarWithBorder(1, "#ffffff")} onMouseOver={showTooltip} onMouseLeave={leaveTooltip}/>
          <Bar dataKey="google" stackId="aStack" fill="#AC8AF8" shape={BarWithBorder(1, "#ffffff")}  onMouseOver={showTooltip} onMouseLeave={leaveTooltip}/>
          <Bar dataKey="naver" stackId="aStack" fill="#85DA47" shape={BarWithBorder(1, "#ffffff")} onMouseOver={showTooltip} onMouseLeave={leaveTooltip}/>
          <Bar dataKey="facebook" stackId="aStack" fill="#4FADF7" radius={[5,5,0,0]} onMouseOver={showTooltip} onMouseLeave={leaveTooltip}/> */}
          
            </BarChart>
          </ResponsiveContainer>
      </Chart>
      {/* {tooltip?.show && (
                <CustomToolTip {...tooltip} />
              )} */}
      <MediaTable mediaData={mediaData}/>
    </Wrap>
  </Container>
)
        }
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Wrap = styled.div`
  margin: 0 auto;
  width: 45rem;
  background-color: white;
  border-radius: 15px;
  overflow-x: scroll;
`;
const Chart = styled.div`
  width: 100%;
  height: 20rem;
  margin: 0 auto;
  padding-top:4rem;
`;
