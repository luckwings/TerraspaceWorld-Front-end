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
    font-size: 25px;
    margin-right: 10px;
    margin-top: 10px;
  }

  @media (min-width: 576px) {
    font-size: 30px;
  }
`

export const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--primary-2);
  margin-top: 10px;
`

interface TabProps {
  readonly active?: boolean;
}

export const Tab = styled.div<TabProps>`
  font-size: 16px;
  border-radius: 6px;
  padding: 7px 12px;
  cursor: pointer;
  color: var(--white);
  transition: all 0.2s ease;

  ${(props: any) => props.active && css`
    background-color: var(--primary-2);
  `}
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
  margin-top: 10px;
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
