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
    .favorite-box {
      background-color: #9462e9;
      color: var(--white);
    }
    .date-box {
      background-color: #9462e9;
    }
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

export const DateIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const DateBox = styled.div`
  background-color: #554578;
  border-radius: 50px;
  color: var(--white);
  padding: 2px 8px;
  font-size: 14px;
  transition: all 0.3s linear;
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

export const FavoriteBox = styled.div`
  background-color: #554578;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  color: #ff6dff;
  padding: 2px 8px;
  font-size: 14px;
  margin-top: 10px;
  transition: all 0.3s linear;

  > svg {
    margin-right: 5px;
  }
`
