import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Generate from "./Generate";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/generate" element={<Generate />} />
    </Routes>
  );
}
