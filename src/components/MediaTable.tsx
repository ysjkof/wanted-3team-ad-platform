import styled from "styled-components"
import { DailyMediaStatus } from "../interfaces/database";
import { mediaTableReduce } from "./MediaUtils";
interface I_Props {
  mediaStatus:DailyMediaStatus
}
export default function MediaTable({mediaStatus}:I_Props) {
  const mediaTableData = mediaTableReduce(mediaStatus);
  return(
      <Table>
        <Wrap>
          <Channel>
            <Ul style={{flexDirection:"column"}}>
              <Li></Li>
              <Li>페이스북</Li>
              <Li>네이버</Li>
              <Li>구글</Li>
              <Li>카카오</Li>
              <Li style={{borderBottom:"1px solid #F5F6F7" , color:"#8190F7"}}>총계</Li>
            </Ul>
          </Channel>
          {mediaTableData?.map((data:any,index:number)=>{
            const dataKey:string = Object.keys(data).find(key => key)!;
            const itemKey:object = Object.keys(data[dataKey])
            return(
              <Item id="1234" key={`${data}-${index}`} >
                <Name dataName={data.name}>{data.name}</Name>
                {itemKey.map((item:string,itemIndex:number)=>{
                  return <Value key={`${item}+${itemIndex}`}>{Math.floor(data[dataKey][item]).toLocaleString('ko-KR')}</Value>
                })}
                <Value style={{borderBottom:"1px solid #F5F6F7" , color:"#8190F7"}}>{Math.floor(data.total).toLocaleString('ko-KR')}</Value>
              </Item>
            )
          })}
            <Gradient className="GRADIENT" />
        </Wrap>
      </Table>
  )
}

const Table = styled.div`
  width: 92%;
  height: 17rem;
  font-size: 12px;
  margin: 4rem 0 2.5rem 2rem;
  position: relative;
  @media (max-width: 480px) {
    margin: 2rem auto;
  }
`;
const Wrap = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 80%;
    height: 10px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #d1d8db;
    border-radius: 6px;
  }
  padding-right: 2rem;
`;
const Item = styled.div`
  text-align: right;
  font-weight: bold;
  border-top: 1px solid #f5f6f7;
  @media (max-width: 480px) {
    margin-right: 1.5rem;
  }
`;
const Name = styled.div<{ dataName: string }>`
  display: flex;
  width: ${(props) => (props.dataName.length > 6 ? '6rem' : '5rem')};
  height: 2.2rem;
  margin-left: 3rem;
  align-items: center;
  justify-content: right;
  color: #bcc4cc;
  @media (max-width: 480px) {
    width: 2rem;
    text-align: center;
  }
`;
const Value = styled.div`
  display: flex;
  height: 2.2rem;
  align-items: center;
  justify-content: right;
  border-top: 1px solid #f5f6f7;
`;
const Channel = styled.div`
  display: table;
  margin-bottom: 1rem;
`;

const Ul = styled.ul`
  display: flex;
`;
const Li = styled.li`
  border-top: 1px solid #f5f6f7;
  display: flex;
  width: 3rem;
  font-size: 12px;
  font-weight: bold;
  height: 2.2rem;
  align-items: center;
  text-align: left;
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  right: -10px;
  width: 3rem;
  height: 80%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 25%,
    rgba(255, 255, 255, 1) 78%
  );
`;
