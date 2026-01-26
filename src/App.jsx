import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Generate from "./Generate";
import Test from "./Test";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/test" element={<Test />} />
      </Route>
    </Routes>
  );
}
