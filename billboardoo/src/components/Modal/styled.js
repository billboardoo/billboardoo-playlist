import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 470px;
  height: 310px;
  background: #ffffff;
  backdrop-filter: blur(50px);
  border-radius: 10px;
  overflow: hidden;
`;

export const ButtonLayout = styled.div`
  display: flex;
  align-items: center;
`;

export const MainButton = styled.button`
  cursor: pointer;
  width: 235px;
  height: 60px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  border: none;
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
`;

export const ModalContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 470px;
  height: 100%;
`;

export const ModalBackGroud = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;
