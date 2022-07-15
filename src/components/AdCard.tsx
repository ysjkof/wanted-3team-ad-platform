import styled from 'styled-components';
import { theme } from '../theme';

import { Ad } from './AdCardList';

interface Props {
  Content: Ad;
}

export default function AdCard({ Content }: Props) {
  return (
    <Container>
      <Title>{Content.title}</Title>
      <Information>
        <InformationTitle>상태 : </InformationTitle>
        {Content.status}
      </Information>
      <Information>
        <InformationTitle>광고 생성일 : </InformationTitle>
        {Content.startDate}
      </Information>
      <Information>
        <InformationTitle>일 희망 예산 : </InformationTitle>
        {Content.budget}
      </Information>
      <Information>
        <InformationTitle>광고 수익율 : </InformationTitle>
        {Content.report.roas}
      </Information>
      <Information>
        <InformationTitle>매출 : </InformationTitle>
        {Content.report.convValue}
      </Information>
      <Information>
        <InformationTitle>광고 비용 : </InformationTitle>
        {Content.report.cost}
      </Information>
      <EditButton>수정하기</EditButton>
    </Container>
  );
}

const Container = styled.li`
  width: 12rem;
  padding: 1rem;
  margin-bottom: 1rem;
  color: ${theme.darkFontColor};
  background-color: white;
  border: 1px solid ${theme.borderColor};
  border-radius: 10px;
`;

const Title = styled.h1`
  padding: 1rem 0;
  font-size: 1.25rem;
  border-bottom: 1px solid ${theme.borderColor};
`;

const Information = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${theme.borderColor};
  color: ${theme.darkFontColor};
`;

const InformationTitle = styled.span`
  color: ${theme.lightFontColor};
`;

const EditButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: white;
  border: 1px solid ${theme.borderColor};
  border-radius: 10px;
  color: ${theme.darkFontColor};
  cursor: pointer;
`;
