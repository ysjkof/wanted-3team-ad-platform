import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MediaStatus from '../components/MediaStatus';
import Layout from '../Layout';
import Management from '../pages/Management';
import Test from '../pages/Test';
import Dashboard from '../pages/Dashboard';
import CreateAd from '../pages/CreateAd';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<MediaStatus />} />
          <Route path="dashboard" element={<MediaStatus />} />
          <Route path="management" element={<Management />} />
          <Route path="create" element={<CreateAd />} />
          <Route path="*" element={<div>페이지가 없습니다</div>} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;