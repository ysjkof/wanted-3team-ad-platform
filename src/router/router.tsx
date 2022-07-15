import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import MediaStatus from '../components/MediaStatus';
import Test from '../pages/Test';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<p>대시보드</p>} />
          <Route path="dashboard" element={<MediaStatus />} />
          <Route path="management" element={<p>광고관리</p>} />
          <Route path="*" element={<div>페이지가 없습니다</div>} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
