import styled, { css } from "styled-components";

export const ModalContainer = styled.div`
  border: 3px solid var(--primary-2);
  padding: 70px;
  border-radius: 40px;
  background-image: linear-gradient(134.6deg, #3f3359, #4f3372);
  max-width: 1100px;
  height: calc(100vh - 120px);
  overflow: scroll;
  @media screen and (max-width: 600px) {
    padding: 60px 35px;
  }
`;

export const BodyContainer = styled.div`
  display: flex;
  margin-top: 50px;
`;

export const IconContent = styled.div`
  background-color: var(--primary-2);
  padding: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  z-Index: 2;
`;

export const TimelineContent = styled.div`
  position: relative;
`;

export const DetailContent = styled.div`
  color: white;
  padding-left: 40px;
  @media screen and (max-width: 600px) {
    padding-left: 0px;
    .value-group {
      margin-top: 40px;
    }
  }
`;

export const ModalInput = styled.input`
  background-color: transparent;
  color: white;
  width: 100%;
`;

export const InputContent = styled.div`
  background-color: #ffffff25;
  padding: 15px;
  border-radius: 15px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;
