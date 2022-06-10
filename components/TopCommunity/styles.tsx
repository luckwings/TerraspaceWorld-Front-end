import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 70px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TitleTabWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > h1 {
    margin-top: 10px;
    font-size: 25px;
    margin-right: 10px;
    text-transform: capitalize;
  }
  button {
    margin-top: 10px;
    height: 25px;
    padding: 0px 10px;
    font-size: 14px;
    border-radius: 6px;
  }
  
  @media (min-width: 576px) {
    > h1 {
      font-size: 30px;
    }
  }
`

export const SliderWrapper = styled.div`
  margin-top: 20px;

  > div {
    margin-left: -10px;
    width: calc(100% + 20px);
  }
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
  ${(props: any) => props.active && css`
    background-color: var(--white);
    svg {
      color: black;
    }
  `}

`
