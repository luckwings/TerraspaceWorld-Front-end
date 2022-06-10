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
