import React, { useState } from "react";
import axios from "axios";
import ProfileSection from "./ProfileSection";
import ListBox from "./ListBox";
import PlusPlaylistModal from "../PlusPlayListModal/PlusPlaylistModal";
import ListPlus from "../../assets/svgs/ListPlus.svg";
import * as S from "./styled";
import { useEffect } from "react";

const PlaylistPage = () => {
  const [modalBool, setModalBool] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
    photo: "",
    loginType: "",
  });
  const [playlistInfo, setPlaylistInfo] = useState({});
  const [playlistBundle, setPlaylistBundle] = useState([]);
  //{ name:"", count:"" }

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      userInfoSetting(res.data);
      getPlaylist(res.data.id);
    });
  }, []);

  const getPlaylist = (userId) => {
    axios
      .get(`/api/playlist/list/${userId}`)
      .then((res) => {
        setPlaylistBundle(res.data.playlist);
      })
      .catch((res) => {
        alert("오류가 발생했습니다");
      });
  };

  const userInfoSetting = (data) => {
    switch (data.provider) {
      case "google":
        setUserInfo({
          name: data.displayName,
          id: data.id,
          photo: data.photos[0].value,
          loginType: data.provider,
        });
        localStorage.setItem("accessToken", data.accessToken);
        break;
      case "naver":
        setUserInfo({
          name: data.displayName,
          id: data.id,
          photo: data.profile_image,
          loginType: data.provider,
        });
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        break;
      case "twitch":
        setUserInfo({
          name: data.display_name,
          id: data.id,
          photo: data.profile_image_url,
          loginType: data.provider,
        });
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        break;
    }
  };
  const changeModalBool = () => {
    setModalBool(!modalBool);
  };

  const appendPlaylist = () => {
    axios.post("/api/playlist/create");
    let copyPlaylist = [...playlistBundle];
    copyPlaylist.push();
  };

  return (
    <S.Container>
      {modalBool ? (
        <PlusPlaylistModal
          playlistBundle={playlistBundle}
          setPlaylistBundle={setPlaylistBundle}
          changeModalBool={changeModalBool}
        />
      ) : (
        <></>
      )}
      <S.TestHeader />
      <ProfileSection userInfo={userInfo} />
      <S.GuideLineBox>
        <S.GuideLineText>재생목록</S.GuideLineText>
        <S.GuideLineBoxLine />
        <S.PlaylistlLayout>
          {playlistBundle.map((item, index) => {
            return <listBox item={item} key={index} />;
          })}
          <S.ListPlusBox onClick={changeModalBool}>
            <S.PlusImg src={ListPlus} />
            <S.ListPlusTitle>재생목록 추가</S.ListPlusTitle>
          </S.ListPlusBox>
        </S.PlaylistlLayout>
      </S.GuideLineBox>
    </S.Container>
  );
};

export default PlaylistPage;
