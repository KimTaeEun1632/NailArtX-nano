import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Generate from "./Generate";
import MyPage from "./pages/MyPage";
import Layout from "./components/Layout";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";

//ToDo: 구독 서비스 만들기
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
      </Route>
    </Routes>
  );
}
