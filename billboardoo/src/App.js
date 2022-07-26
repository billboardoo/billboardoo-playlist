import React, { useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import MyPage from "./components/MyPage/MyPage";
import PlaylistPage from "./components/PlaylistPage/PlaylistPage";
import ProfileSelectPage from "./components/ProfileSelectPage/ProfileSelectPage";
import LoginModal from "./components/LoginModal/LoginModal";
import PlusMusicPage from "./components/PlusMusicPage/PlusMusicPage";
import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
    profile: "",
    platform: "",
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/plus-music" element={<PlusMusicPage />} />
          <Route
            path="/mypage"
            element={<MyPage userInfo={userInfo} setUserInfo={setUserInfo} />}
          />
          <Route
            path="/profile-select"
            element={<ProfileSelectPage userInfo={userInfo} />}
          />
          <Route path="/" element={<LoginModal />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
