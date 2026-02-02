import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const Header = lazy(() => import("../Header/Header.jsx"));
const NewsPage = lazy(() => import("../../pages/NewsPage/NewsPage.jsx"));
const FriendsPage = lazy(() => import("../../pages/FriendsPage/FriendsPage.jsx"));
const NoticesPage = lazy(() => import("../../pages/NoticesPage/NoticesPage.jsx"));


function App() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
