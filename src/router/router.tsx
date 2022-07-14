import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import Main from '../pages/Main';
import Management from '../pages/Management';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<p>대시보드</p>} />
          <Route path="dashboard" element={<p>대시보드</p>} />
          <Route path="management" element={<Management />} />
          <Route path="*" element={<div>페이지가 없습니다</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
