import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Generate from "./Generate";
import MyPage from "./pages/MyPage";
import ResetPassword from "./pages/ResetPassword";
import Layout from "./components/Layout";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import ProtectedRoute from "./components/ProtectedRoute";

//ToDo: 구독 서비스 만들기
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/generate" element={<Generate />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
      </Route>
    </Routes>
  );
}
