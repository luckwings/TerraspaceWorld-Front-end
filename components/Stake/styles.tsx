import styled from 'styled-components'

export const Container = styled.div`
  padding-bottom: 20px;
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
  padding: 10px
  align-items: center;
  text-align: center;
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
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TitleTabWrapper = styled.div`
  display: flex;
  align-items: center;
  > h1 {
    font-size: 25px;
    margin-right: 10px;
  }

  @media (min-width: 576px) {
    font-size: 30px;
  }
`

export const SliderWrapper = styled.div`
  margin-top: 20px;
`

export const CarouselButtonGroup = styled.div`
  display: flex;
  align-items: center;
`

interface ArrowButtonProps {
  readonly active?: boolean;
}

export const ArrowButton = styled.button<ArrowButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 27px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border: 1px solid white;
  background-color: transparent;
  transition: all 0.2s ease;
  svg {
    color: white;
  }
  &:hover {
    transform: scale(1.02);
  }
  ${(props: any) => props.active`
    background-color: var(--white);
    svg {
      color: black;
    }
  `}

`
