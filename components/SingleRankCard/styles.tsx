import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 35px;
  border-radius: 10px;
  background-color: #3f3359;
  border: 1px solid var(--primary-2);
  padding: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;

  > span {
    margin-right: 10px;
    font-weight: 500;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const ContentWrapper = styled.div`
  flex: 1;
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

export const VolumeWrapper = styled.div`
  background-color: #554578;
  border-radius: 5px;
  padding: 0px 3px;
  > span {
    font-size: 12px;
    &.title {
      color: var(--white);
    }
    &.value {
      color: #83bf0b;
    }
  }
`

export const InfoCard = styled.div`
  margin-top: 5px;
  padding: 0px;
  p {
    color: var(--white);
    &.title {
      opacity: 0.9;
      font-size: 14px !important;
    }
    &.value {
      font-weight: 500;
    }
  }
  @media (min-width: 576px) {
    margin-top: 15px;
    padding: 5px;
  }
`
