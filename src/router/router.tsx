import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import Main from '../pages/Main';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<p>대시보드</p>} />
          <Route path="dashboard" element={<p>대시보드</p>} />
          <Route path="management" element={<p>광고관리</p>} />
          <Route path="*" element={<div>페이지가 없습니다</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
