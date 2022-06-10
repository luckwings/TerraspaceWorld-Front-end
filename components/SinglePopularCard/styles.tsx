import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
`

export const InnerContainer = styled.div`
  padding: 25px;
  background: radial-gradient(97.57% 210.75% at 0.9% 2.98%, rgba(255, 255, 255, 0.4) 0%, #31254A 0.01%, rgba(160, 120, 237, 0) 100%);
  border-radius: 30px;
`

export const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 40px;
    height: 40px;
    min-width: 30px;
    border-radius: 8px;
    border: 2px solid white;
    margin-right: 10px;
  }
`

export const InfoWrapper = styled.div``

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 14px;
    margin-right: 5px;
    color: var(--white);
    font-weight: bold;
  }
  svg {
    width: 20px;
    min-width: 20px;
    height: 20px;
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

export const InfoCardWrapper = styled.div`
  padding-top: 15px;
`

export const InfoCard = styled.div`
  background-color: #3f3359;
  border-radius: 8px;
  margin-top: 15px;
  padding: 10px;
  p {
    color: var(--white);
    &:first-child {
      opacity: 0.8;
      font-size: 14px;
    }
    &:last-child {
      font-weight: 500;
    }
  }
`