import styled from 'styled-components';
import { FiSettings, FiBell, FiUser } from 'react-icons/fi';
import { theme } from '../theme';
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
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
  padding-right: 1rem;
  border-bottom: ${theme.borderColor} 1px solid;
  display: flex;
  justify-content: right;
  align-items: center;
  * {
    margin-left: 1rem;
  }
`;
