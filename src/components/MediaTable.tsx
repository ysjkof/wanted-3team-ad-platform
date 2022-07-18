import styled from "styled-components"
import { I_barColors } from "./MediaStatus";

interface I_props {
  mediaData:object[]
  barColors:I_barColors
}
export default function MediaTable({mediaData,barColors}:I_props) {
  console.log(mediaData);
  // {mediaData.map((data:any)=>{
  //             return <Li>{data.name}</Li>
  //           })}
  return(
      <Table>
        <Channel>
            <Ul style={{flexDirection:"column"}}>
              <Li style={{textAlign:"left"}}></Li>
              <Li style={{textAlign:"left"}}>페이스북</Li>
              <Li style={{textAlign:"left"}}>네이버</Li>
              <Li style={{textAlign:"left"}}>구글</Li>
              <Li style={{textAlign:"left"}}>카카오</Li>
              <Li style={{textAlign:"left" , borderBottom:"1px solid #F5F6F7" , color:"#8190F7"}}>총계</Li>
            </Ul>
        </Channel>
        {mediaData.map((data:any,index)=>{
          const dataKey:string = Object.keys(data).find(key => key)!;
          const itemKey:object = Object.keys(data[dataKey])
          
          
          return(
            <Item>
              <Name>{data.name}</Name>
              {itemKey.map((item:string)=>{
                return <Value>{data[dataKey][item]}</Value>
              })}
              <Value style={{borderBottom:"1px solid #F5F6F7" , color:"#8190F7"}}>{data.total}</Value>
            </Item>
          )
        })}
      </Table>
  )
}


const Table = styled.div`
  margin-top: 5rem;
  margin-left: 2.5rem;
  width: 40.5rem;
  height: 20rem;
  display: flex;
  font-size: 12px;
`;
const Item = styled.div`
  text-align: right;
  width: 7rem;
  font-weight: bold;
  border-top: 1px solid #F5F6F7;
`;
const Name = styled.div`
  display: flex;
  height: 2.2rem;
  align-items: center;
  justify-content: right;
  color: #BCC4CC;
`;
const Value = styled.div`
  display: flex;
  height: 2.2rem;
  align-items: center;
  justify-content: right;
  border-top: 1px solid #F5F6F7;
`;
const Channel = styled.div`
  display: table;
`;

const Ul = styled.ul`
  display: flex;
`;
const Li = styled.li`
  border-top: 1px solid #F5F6F7;
  display: flex;
  width: 6rem;
  font-size: 12px;
  font-weight: bold;
  height: 2.2rem;
  align-items: center;
`;





