import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { CreateRTI } from './pages/CreateRTI';
import { RTIDetail } from './pages/RTIDetail';
import { Senders } from './pages/Senders';
import { Receivers } from './pages/Receivers';
import { Templates } from './pages/Templates';
import { ApprovalPortal } from './pages/ApprovalPortal';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="rtis" element={<Dashboard />} />
          <Route path="rtis/:id" element={<RTIDetail />} />
          <Route path="create" element={<CreateRTI />} />
          <Route path="senders" element={<Senders />} />
          <Route path="receivers" element={<Receivers />} />
          <Route path="templates" element={<Templates />} />
          <Route path="approval" element={<ApprovalPortal />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}