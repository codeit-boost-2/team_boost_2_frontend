import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import GroupListPage from "./pages/Grouplist_page";
import MakeGroupPage from "./pages/Makegroup_page";
import GroupPage from "./pages/Group_page";
import AuthenticationPage from "./pages/Authentication_page";
import MemoryPostPage from "./pages/Memory_post_page";
import MemoryDetailPage from "./pages/Memory_detail_page";
import NotFoundPage from"./pages/Not_found_page";
//나머지 페이지도 import

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<GroupListPage />} />
          <Route path="/MakeGroup" element={<MakeGroupPage />} />
          <Route path="/GroupPage">
            <Route index element={<GroupPage />} />
            <Route path=":MemoryId" element={<MemoryDetailPage />} />
          </Route>
          <Route path="/AutPage" element={<AuthenticationPage />} />
          <Route path="MemoryPost" element={<MemoryPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* Route path="다른페이지" element={<다른페이지 />} */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;