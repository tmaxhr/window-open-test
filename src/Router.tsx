import { Route, Routes } from "react-router-dom";
import PassAuth from "./pages/PassAuth";
import PassAuthResult from "./pages/PassAuthResult";
import Home from "./pages/Home";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/pass" element={<PassAuth />} />
      <Route path="/pass/result" element={<PassAuthResult />} />
    </Routes>
  );
}

export default AppRouter;
