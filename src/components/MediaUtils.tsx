import styled from "styled-components";
const channelId = {
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
export const barKeys = [['cost.kakao', 'cost.google', 'cost.naver', 'cost.facebook'],
  ['imp.kakao', 'imp.google', 'imp.naver', 'imp.facebook'],
  ['click.kakao', 'click.google', 'click.naver', 'click.facebook'],
  ['roas.kakao', 'roas.google', 'roas.naver', 'roas.facebook'],
  ['cvr.kakao', 'cvr.google', 'cvr.naver', 'cvr.facebook']
];
export interface I_barColors {
    kakao: string,
    google: string,
    naver: string,
    facebook :string
  }
export const barColors:I_barColors = {
    kakao: "#f9E000",
    google: "#AC8AF8",
    naver: "#85DA47",
    facebook :"#4FADF7"
  }
export const channelName = {
  facebook:"페이스북",
  naver:"네이버",
  kakao:"카카오",
  google:"구글"
}
export const mediaReduce = (arrData:DailyMediaReport[],before:string,after:string) => {
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
export const toPercent = (tick:number) => {
    const ticks:string[] = [];
    if(tick !== 0){
      ticks.push(`${tick * 100}%`)
    } 
    return ticks;
  }
interface I_legendPayload {
  color: string,
  dataKey: string,
  inactive: boolean,
  payload: object,
  type: string,
  value: string,
}
export const renderLegend = ({payload}:I_legendPayload) => {
  const result = payload.reduce((obj:any,val:I_legendPayload)=>{
    return obj.includes(val.dataKey.split(".")[1]) ? obj : [...obj,val.dataKey.split(".")[1]]
  },[])
    return (
    <LegendUl>
      {
        result.map((item:string, index:number) => {
          return(
            <LegendLi key={`${item}-${index}`}>
              <LegendCircle style={{backgroundColor:`${barColors[item]}`}}/>
              <LegendValue key={`item-${index}`}>{channelName[item]}</LegendValue>
            </LegendLi>
          )
        })
      }
    </LegendUl>
  );
}

const LegendUl = styled.ul`
  display: flex;
  font-size: 10px;
  float: right;
  margin-top: 2rem;
`;

const LegendLi = styled.li`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-left: 1rem;
`;
const LegendCircle = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 5px;
`;
const LegendValue = styled.div``;