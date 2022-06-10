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
    height: 250px;
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
  height: 100px;
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

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

export const SocialList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
