import styled from "styled-components"

interface I_props {
  mediaData:object[]
}
export default function MediaTable({mediaData}:any) {
  console.log(mediaData);
  
  return(
      <Table>
        <Line>
          <Element>
            {mediaData.map((data:any)=>{
              return <div>{data.name}</div>
            })}
            <div>ggg</div>
          </Element>
        </Line>
        <Line>
          <Channel>

          </Channel>
        </Line>
        
      </Table>
  )
}


const Table = styled.div`
  margin-top: 5rem;
  margin-left: 2.5rem;
  width: 40.5rem;
  height: 20rem;
`;
const Line = styled.div`
  border-top: 1px solid black;
`;
const Element = styled.div`
  display: table;
  div{
    display: table-cell;
    font-size: 12px;
    padding: 0.4rem;
  }
`;

const Channel = styled.div`
  display: table;
`;
const Value = styled.div``;