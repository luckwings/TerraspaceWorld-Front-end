import styled from 'styled-components';

export const ExploreNearWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > div {
    width: 100%;
  }

  @media (min-width: 768px) {
    > div {
      &:first-child {
        width: 60%;
      }
      &:last-child {
        width: 40%;
      }
    }
  }
`

export const TextWrapper = styled.div`
  > h1 {
    margin-top: 10px;
    font-size: 40px;
    text-align: center;
    color: var(--white);
  }
  > p {
    margin-top: 10px;
    font-size: 20px;
    color: var(--white);
    opacity: 0.8;
  }

  @media (min-width: 576px) {
    > h1 {
      margin-top: 10px;
      text-align: left;
      font-size: 48px;
    }
  }
`

export const TerraSpaceWrapper = styled.div`
  display: flex;
  align-items: center;

  > span {
    font-size: 18px;
    color: var(--white);
    margin-right: 10px;
    font-weight: bold;
  }
  svg {
    width: 24px;
    height: 24px;
    > circle {
      fill: transparent;
    }
    path {
      fill: white;
    }
  }
`

export const CheckListWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`

export const CheckItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
  svg {
    width: 20px;
    height: 20px;
    min-width: 20px;
    margin-right: 10px;
  }
  > p {
    font-size: 16px;
    color: var(--white);
    opacity: 0.8;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  button {
    width: 100%;
    margin: 5px auto;
    height: 44px;
    &:first-child {
      margin-right: 15px;
    }
    svg {
      font-size: 24px;
      margin-left: 5px;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    button {
      margin: 5px 0px;
      width: auto;
    }
  }
`

export const ImageWrapper = styled.div`
  margin-top: 20px;
  @media (min-width: 768px) {
    padding-left: 20px;
    margin-top: 0px;
  }
`

export const ImageContent = styled.div`
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  width: 100%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const DetailInfoWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  background-color: #24242f;
  width: 100%;
`

export const DetailLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 40px;
    height: 40px;
    min-width: 40px;
    border-radius: 8px;
    border: 2px solid white;
    margin-right: 10px;
  }
`

export const InfoWrapper = styled.div``

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  span, a {
    font-size: 14px;
    margin-right: 5px;
    color: var(--white);
  }
  span {
    font-weight: 500;
    font-size: 16px;
  }
  a {
    color: var(--white);
    transition: all 0.3s linear;
    &:hover {
      text-decoration: underline;
      color: var(--primary-2);
    }
  }
  svg {
    width: 20px;
    min-width: 20px;
    height: 20px;
  }
  &.link {
    a {
      opacity: 0.8;
      font-size: 14px;
    }
    svg {
      opacity: 0.8;
    }
  }
`

export const DetailRightWrapper = styled.div`
  display: flex;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 22px;
      margin-left: 10px;
      transition: all 0.2s ease-out;
      &:hover {
        transform: scale(1.07);
      }
    }
  }
`