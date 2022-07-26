import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Arrow from "../../assets/svgs/Arrow";
import FindIcon from "../../assets/svgs/FindIcon.svg";
import MusicBox from "./MusicBox";
import PageItroduceBox from "../PageItroduceBox/PageItroduceBox";
import * as S from "./styled";

const PlusMusicPage = () => {
  const categoryRef = useRef();
  const findCategory = [
    {
      name: "노래명",
      category: "title",
    },
    {
      name: "아티스트",
      category: "artist",
    },
    {
      name: "조교명",
      category: "remix",
    },
  ];
  const [menuValue, setMenuValue] = useState({
    name: "노래명",
    category: "title",
  });
  const [findMusicParams, setFindMusicParams] = useState({
    type: "title",
    sort: "popular",
    keyword: "",
  });
  const [playlistInfo, setPlaylistInfo] = useState({});
  const [menuBool, setMenuBool] = useState(false);
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    getChartMusic();
    getPlaylistdetail();
  }, []);

  //플레이리스트 정보 가져오기
  const getPlaylistdetail = () => {
    const playlistKey = localStorage.getItem("playlistKey");
    axios.get(`/api/playlist/detail/${playlistKey}`).then((res) => {
      setPlaylistInfo(res.data);
      localStorage.setItem("playlistKey", res.data.key);
    });
  };

  const changeMenuBool = () => {
    setMenuBool(!menuBool);
  };

  //검색 키워드 변경 함수
  const onChangeKeyword = (e) => {
    const { value } = e.target;
    setFindMusicParams({ ...findMusicParams, keyword: value });
    console.log(findMusicParams);
  };

  //음악 검색 함수
  const findMusic = (e) => {
    if (e.key == "Enter" && findMusicParams.keyword) {
      axios
        .get("/api/search", {
          params: findMusicParams,
        })
        .then((res) => {
          setMusicList(res.data);
        });
    }
  };

  //차트 가져오는 함수
  const getChartMusic = () => {
    axios
      .get("/api/charts/weekly", {
        params: {
          limit: 10,
        },
      })
      .then((res) => {
        setMusicList(res.data);
      });
  };

  const handleOnChangeSelectValue = (e) => {
    const { name } = e.target;
    setMenuValue(findCategory[name]);
    setFindMusicParams({
      ...findMusicParams,
      type: findCategory[name].category,
    });
  };

  return (
    <S.Container>
      <S.testHeader />
      <PageItroduceBox pageTitle="재생 목록 노래 추가" />
      <S.MainFindInputBox>
        <S.FindInputFilter onClick={changeMenuBool}>
          {menuBool && (
            <S.FilterMenu>
              {findCategory.map((item, index) => {
                return (
                  <S.Menu
                    name={index}
                    onClick={handleOnChangeSelectValue}
                    key={index}
                  >
                    {item.name}
                  </S.Menu>
                );
              })}
            </S.FilterMenu>
          )}
          <div ref={categoryRef}>{menuValue.name}</div>
          <Arrow ArrowPower={true} />
        </S.FindInputFilter>
        <S.FindInput
          onKeyPress={findMusic}
          onChange={onChangeKeyword}
          placeholder="검색어를 입력해주세요"
        />
        <S.FindIcon src={FindIcon} />
      </S.MainFindInputBox>
      <S.appendMusicLayout>
        <S.MusicFilterLayout>
          <S.MusicFilter />
          <S.UpdateText>최종 업데이트 | 2022.10.10 16:03</S.UpdateText>
        </S.MusicFilterLayout>
        <S.MusicInfoBox>
          <S.MusicInfoName>곡 정보</S.MusicInfoName>
          <S.MusicInfoText color="#080F34" right="90px">
            조회수
          </S.MusicInfoText>
          <S.MusicInfoText color="#080F34" right="180px">
            출시일
          </S.MusicInfoText>
        </S.MusicInfoBox>
        {musicList.map((item, index) => {
          return (
            <MusicBox
              setPlaylistInfo={setPlaylistInfo}
              playlistInfo={playlistInfo}
              item={item}
              key={index}
              color={index % 2 == 0 ? "#E4E6EC" : "#EEEFF3"}
            />
          );
        })}
      </S.appendMusicLayout>
    </S.Container>
  );
};

export default PlusMusicPage;
