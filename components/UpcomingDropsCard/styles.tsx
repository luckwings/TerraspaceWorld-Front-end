import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 40px;
  border-radius: 40px;
  background-color: #3f3359;
  border: 1px solid var(--primary-2);

  > span {
    margin-right: 10px;
    font-weight: 500;
  }
`

export const ContentWrapper = styled.div`
  flex: 1;
`

export const Title = styled.div`
  margin-top: 2%;
  margin-left: 2%;
`

export const LinkIconbar = styled.div`
  margin-top: 20px;
  a {
    margin-left: 15px;
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
export const InfoCardWrapper = styled.div`
  padding-top: 15px;
`

export const Letter = styled.div`
  padding: 2%;
  color: white;
  align-text: center;
  font-size: 12 !important;
  overflow: auto;
  max-height: 200px;
`