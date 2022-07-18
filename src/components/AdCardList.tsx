import styled from 'styled-components';
import { Ad } from '../pages/Management';
import AdCard from './AdCard';

interface Props {
  ads: Ad[];
}

export default function AdCardList({ ads }: Props) {
  return (
    <Container>
      {ads.map((ad) => {
        return <AdCard key={ad.id} Content={ad} />;
      })}
      {ads.map((ad) => {
        return <AdCard key={ad.id} Content={ad} />;
      })}
      {ads.map((ad) => {
        return <AdCard key={ad.id} Content={ad} />;
      })}
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
`;
