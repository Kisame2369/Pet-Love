import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage/HomePage";
import NewsPage from "./pages/NewsPage/NewsPage";
import NoticesPage from "./pages/NoticesPage/NoticesPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AddPetPage from "./pages/AddPetPage/AddPetPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-pet" element={<AddPetPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
