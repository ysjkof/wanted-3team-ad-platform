import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../theme';

enum TABS {
  DASHBOARD = '/dashboard',
  AD_MANAGEMENT = '/management',
}

type Props = {
  selected: Boolean;
};

export default function MenuBar() {
  const { pathname } = useLocation();
  const initialTab: TABS = Object.values(TABS).find((values) => values === pathname) || TABS.DASHBOARD;
  const [selectedTab, setSelectedTab] = useState<TABS>(initialTab);
  const toggleTabs = (tabName: TABS) => {
    setSelectedTab(tabName);
  };
  const navigate = useNavigate();

  useEffect(() => {
    navigate(selectedTab);
  }, [selectedTab]);

  return (
    <Container>
      <MenuButton
        selected={selectedTab === TABS.DASHBOARD}
        className="dashboard_tab"
        onClick={() => toggleTabs(TABS.DASHBOARD)}
      >
        <div className="icon">
          <img src="" alt="" />
        </div>
        대시보드
      </MenuButton>
      <MenuButton
        selected={selectedTab === TABS.AD_MANAGEMENT}
        className="admanagement_tab"
        onClick={() => toggleTabs(TABS.AD_MANAGEMENT)}
      >
        <div className="icon">
          <img src="" alt="" />
        </div>
        광고관리
      </MenuButton>
    </Container>
  );
}
const Container = styled.div`
  width: 20%;
  border: rgb(246, 248, 248) solid 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MenuButton = styled.button<Props>`
  width: 80%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-radius: 10px;
  ${(props: Props) =>
    props.selected
      ? `background-color: ${theme.btSelectedColor}; 
      color: ${theme.primaryColor}`
      : ''};
`;
