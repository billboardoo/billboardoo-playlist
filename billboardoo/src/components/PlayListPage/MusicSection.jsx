import React from "react";
import { useNavigate } from "react-router-dom";
import CrossPlay from "../../assets/svgs/PlaylistCrossPlay.svg";
import Play from "../../assets/svgs/PlaylistPlay.svg";
import ListPlus from "../../assets/svgs/ListPlus.svg";
import MusicListBox from "./MusicListBox";
import * as S from "./styled";

const MusicSection = (props) => {
  const { musicList, playlistInfo, setPlaylistInfo, setDeleteModalBool } =
    props;
  const navigate = useNavigate();

  const movePlusMusicPage = () => {
    navigate("/plus-music");
  };

  return (
    <S.PlaylistLayout>
      <S.TitleBox>
        <S.PageTitle>노래목록</S.PageTitle>
        <S.ButtonLayout>
          <S.PlaybackPlaylistButton>
            <img src={Play} />
            전체 재생
          </S.PlaybackPlaylistButton>
          <S.PlaybackPlaylistButton>
            <img src={CrossPlay} />
            랜덤 재생
          </S.PlaybackPlaylistButton>
          <S.PlusPlaylistButton onClick={movePlusMusicPage}>
            <img src={ListPlus} />
            노래 추가
          </S.PlusPlaylistButton>
        </S.ButtonLayout>
      </S.TitleBox>
      <S.ListInfoBox>
        <S.ListPlaylistName>재생목록 이름</S.ListPlaylistName>
        <S.ListPlaylistCreator>작성자</S.ListPlaylistCreator>
      </S.ListInfoBox>
      {musicList.map((item, index) => {
        return (
          <MusicListBox
            setDeleteModalBool={setDeleteModalBool}
            playlistInfo={playlistInfo}
            setPlaylistInfo={setPlaylistInfo}
            item={item}
            key={index}
          />
        );
      })}
    </S.PlaylistLayout>
  );
};

export default MusicSection;