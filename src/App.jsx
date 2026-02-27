import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Generate from "./Generate";
import Layout from "./components/Layout";
//ToDo: 구독 서비스 만들기
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/generate" element={<Generate />} />
      </Route>
    </Routes>
  );
}
