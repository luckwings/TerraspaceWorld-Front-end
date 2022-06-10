import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
`

export const InnerContainer = styled.div`
  background-color: #3f3359;
  background-position: center;
  border-radius: 20px;
  background-size: cover;
  overflow: hidden;
  border: 1px solid var(--primary-2);
  > img {
    border-radius: 20px;
    width: 100%;
    height: 300px;
    max-height: 300px;
    object-fit: cover;
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

export const Description = styled.p`
  color: var(--white);
  font-size: 14px;
  margin: 5px 0px;
  line-height: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  button {
    margin: 5px 0px;
    height: 34px;
    width: 100%;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    > button {
      width: auto;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
`