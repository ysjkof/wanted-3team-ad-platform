import styled from 'styled-components';
import { FiSettings, FiBell, FiUser } from 'react-icons/fi';
import { theme } from '../styles/theme';
export default function Header() {
  return (
    <>
      <Container>
        <FiBell />
        <FiSettings />
        <FiUser />
        <span>사용자님</span>
      </Container>
    </>
  );
}

const Container = styled.nav`
  position: fixed;
  top: 0;
  box-sizing: border-box;
  z-index: 5;
  width: calc(64rem * 0.8);
  height: 3rem;
  padding-right: 1rem;
  border-bottom: ${theme.borderColor} 1px solid;
  display: flex;
  justify-content: right;
  align-items: center;
  background-color: inherit;
  * {
    margin-left: 1rem;
  }
  @media (max-width: 480px) {
    position: fixed;
    top: 0;
    height: 15vw;
    border-bottom: none;
  }
`;
