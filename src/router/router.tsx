import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import Main from '../pages/Main';
import Management from '../pages/Management';
import MediaStatus from '../components/MediaStatus';
import Test from '../pages/Test';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<p>대시보드</p>} />
          <Route path="management" element={<Management />} />
          <Route path="dashboard" element={<MediaStatus />} />
          <Route path="*" element={<div>페이지가 없습니다</div>} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
