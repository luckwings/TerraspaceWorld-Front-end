import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
`

export const InnerContainer = styled.div`
  background-color: #3f3359;
  background-position: center;
  border-radius: 25px;
  background-size: cover;
  overflow: hidden;
  border: 1px solid var(--primary-2);
  transition: all 0.3s linear;
  > img {
    border-radius: 25px;
    width: 100%;
    height: 200px;
    max-height: 300px;
    object-fit: cover;
  }
  &:hover {
    background-color: var(--primary-2);
  }
`

export const FooterWrapper = styled.div`
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  > h2 {
    font-size: 18px;
    margin-right: 10px;
  }
  svg {
    width: 24px;
    height: 24px;
    > circle {
      fill: transparent;
    }
    path {
      fill: var(--white);
    }
  }
`

export const InfoWrapper = styled.div`
  p {
    font-size: 14px;
    opacity: 0.9;

    &.price {
      opacity: 1;
      font-size: 16px;
      font-weight: 500;
    }
  }
`

export const SocialList = styled.div`
  display: flex;
  align-items: center;
  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    > img, a {
      min-width: 20px;
      height: 20px;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
