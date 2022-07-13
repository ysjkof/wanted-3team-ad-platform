import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <div>MenuBar</div>
      <Outlet />
    </div>
  );
}

export default Layout;
