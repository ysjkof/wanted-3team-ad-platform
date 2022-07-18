import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from '../theme';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiOutlinePresentationChartBar } from 'react-icons/hi';
import { MdAddchart } from 'react-icons/md';
enum TABS {
  DASHBOARD = '/dashboard',
  AD_MANAGEMENT = '/management',
}

export default function MenuBar() {
  const { pathname } = useLocation();
  const initialTab: TABS = Object.values(TABS).find((values) => values === pathname) || TABS.DASHBOARD;
  const [selectedTab, setSelectedTab] = useState<TABS>(initialTab);
  const [isDropDownShowingOnMobile, setIsDropDownShowingOnMobile] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleTabs = (tabName: TABS) => {
    setSelectedTab(tabName);
  };

  const toggleDropDown = () => {
    setIsDropDownShowingOnMobile(!isDropDownShowingOnMobile);
  };

  useEffect(() => {
    navigate(selectedTab);
  }, [selectedTab]);

  return (
    <Container className="MenuBar">
      <ButtonsWrapper show={isDropDownShowingOnMobile} className="ButtonsWrapper" onClick={toggleDropDown}>
        <MenuButton
          selected={selectedTab === TABS.DASHBOARD}
          className="dashboard_tab"
          onClick={() => toggleTabs(TABS.DASHBOARD)}
        >
          <HiOutlinePresentationChartBar />
          대시보드
        </MenuButton>
        <MenuButton
          selected={selectedTab === TABS.AD_MANAGEMENT}
          className="admanagement_tab"
          onClick={() => toggleTabs(TABS.AD_MANAGEMENT)}
        >
          <MdAddchart />
          광고관리
        </MenuButton>
      </ButtonsWrapper>
      <HamburgerWrapper
        className="hamburger_wrapper"
        style={isDropDownShowingOnMobile ? { backgroundColor: 'white' } : {}}
      >
        <GiHamburgerMenu className="hamburger_icon" onClick={toggleDropDown} />
      </HamburgerWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 12.8rem;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: calc((100% - 64rem) / 2);
  border: rgb(246, 248, 248) solid 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 1024px) {
    left: 0;
  }
  @media (max-width: 480px) {
    width: 15vw;
    height: 15vw;
    box-sizing: content-box;
  }
`;

const HamburgerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  * {
    display: none;
  }
  @media (max-width: 480px) {
    display: flex;
    justify-content: center;
    align-items: center;
    * {
      display: block;
      width: 60%;
      height: 60%;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 100%;
  @media (max-width: 480px) {
    position: fixed;
    top: 15vw;
    left: -100%;
    width: 100vw;
    height: 9rem;
    background-color: white;
    display: flex;
    transition: left 0.3s;
    * {
      font-size: 1rem;
    }
    ${(props: { show: boolean }) => (props.show ? `left:0%;` : '')}
  }
`;
const MenuButton = styled.button`
  width: 80%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-radius: 10px;
  > *:first-child {
    margin-right: 0.5rem;
  }
  ${(props: { selected: boolean }) =>
    props.selected
      ? `background-color: ${theme.btSelectedColor}; 
      color: ${theme.primaryColor}`
      : ''};
`;
