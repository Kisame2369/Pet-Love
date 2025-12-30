import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const Header = lazy(() => import("../Header/Header.jsx"));

function App() {
      <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage/>} />
        </Routes>
      </Suspense>
    </>
  
}

export default App
