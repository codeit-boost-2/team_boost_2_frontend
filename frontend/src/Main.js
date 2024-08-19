import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import GroupListPage from "./pages/Grouplist_page";
import MakeGroupPage from "./pages/Makegroup_page";
import GroupPage from "./pages/GroupPage";
//나머지 페이지도 import

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<GroupListPage />} />
          <Route path="/makeGroup" element={<MakeGroupPage />} />
          <Route path="/GroupPage" element={<GroupPage />} />
          {/* Route path="다른페이지" element={<다른페이지 />} */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
