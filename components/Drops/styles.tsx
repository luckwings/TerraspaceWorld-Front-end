import styled from 'styled-components'

export const Container = styled.div`
  padding-top: 105px;
  padding-bottom: 105px;
  min-height: 100vh;
  position: relative;
`

export const HomeHeroWrapper = styled.div`
  > div {
    padding-bottom: 30px;
  }
  .custom-dot-list-style {
    .react-multi-carousel-dot {
      button {
        background-color: #404872;
        border: none;
        width: 20px;
        height: 5px;
        border-radius: 30px;
      }
    }
    .react-multi-carousel-dot--active {
      button {
        background-color: white;
      }
    }
  }
`
export const VolumeWrapper = styled.div`
  background-color: #554578;
  border-radius: 5px;
  align-items: center;
  > span {
    font-size: 16px;
    &.title {
      font-family : "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
      color: var(--white);
    }
    &.value {
      font-family : "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
      color: #fff;
    }
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

export const InfoCardWrapper = styled.div`
  padding-top: 15px;
`
