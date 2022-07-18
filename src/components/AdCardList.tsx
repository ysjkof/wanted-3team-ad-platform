import styled from 'styled-components';
import { Advertising } from '../databaseTypes';
import { HandleDeleteClick } from '../pages/Management';
import AdCard from './AdCard';

interface Props {
  ads: Advertising[];
  handleDeleteClick: HandleDeleteClick;
}

export default function AdCardList({ ads, handleDeleteClick }: Props) {
  return (
    <Container>
      {ads.map((ad) => {
        return <AdCard key={ad.id} Content={ad} handleDeleteClick={handleDeleteClick} />;
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
