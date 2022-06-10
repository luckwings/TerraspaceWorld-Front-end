import styled, { css } from 'styled-components';

export const Container = styled('div')`
  padding-top: 105px;
  min-height: 100vh;
  position: relative;
  display: flex;
`

interface SideBarWrapperProps {
  readonly isCollapse: boolean
}

export const SideBarWrapper = styled.div<SideBarWrapperProps>`
  background: linear-gradient(45deg, rgb(13, 10, 31) 0%, rgb(13, 10, 31) 75%, rgb(21, 31, 56) 100%);
  width: 270px;
  user-select: none;
  z-index: 12;
  overflow: hidden;
  transition: width 0.3s ease;
  display: none;

  > div {
    width: 100%;
    height: 100%;
  }

  ${(props: any) => props?.isCollapse && css`
    width: 70px;
  `}

  @media (min-width: 576px) {
    display: block;
  }
`

export const ContentWrapper = styled('div')`
  flex: 1;
  padding-left: 15px;
`

export const SideBarFooter = styled('div')`
  display: flex;
  justify-content: space-between;

  button {
    color: rgba(116, 118, 145, 0.5);
    border: 1px solid rgba(116, 118, 145, 0.5);
    border-radius: 8px;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 24px;

    &.add-btn {
      padding: 4px 16px;
      margin: 14px 16px 20px;
      font-size: 10px;

      svg {
        margin-right: 5px;
      }
    }

    &:hover, &:active, &:focus  {
      color: rgb(255, 255, 255);
      border: 1px solid rgb(255, 255, 255);
      opacity: 0.6;
    }
  }
`

interface ArrowButtonProps {
  readonly isCollapse: boolean
}

export const ArrowButton = styled.button<ArrowButtonProps>`
  padding: 4px;
  margin: 14px 16px 20px;
  font-size: 14px;

  ${(props: any) => props?.isCollapse && css`
    margin-left: auto;
    margin-right: auto;
    > svg {
      transform: rotateY(180deg);
    }
  `}
`

export const SideBarContent = styled.div`
  width: 100%;
  height: calc(100% - 58px);
  padding: 15px 0px;
`

export const TokenList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TokenImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0px;

  img {
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    transition: all 0.2s ease-in-out 0s;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`

interface MobileSideBarWrapperProps {
  readonly inActive?: boolean;
}

export const MobileSideBarWrapper = styled.div<MobileSideBarWrapperProps>`
  box-sizing: border-box;
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: rgb(18, 23, 46);
  box-shadow: rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px;
  padding: 0px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  -webkit-box-align: center;
  align-items: center;
  transition: transform 800ms ease 0s;
  z-index: 999;

  ${(props: any) => props?.inActive && css`
    transform: translateY(98px);
  `}

  @media (min-width: 576px) {
    display: none;
  }
`

export const TabWrapper = styled.div`
  width: 14vw;
  padding-top: 4px;
  height: 8px;
  margin-bottom: 8px;
  > div {
    cursor: pointer;
    background-color: rgb(116, 118, 145);
    border-radius: 8px;
    margin: 6px auto;
    width: 10vw;
    height: 4px;
    &:hover {
      filter: brightness(1.25);
    }
  }
`

export const WatchListWrapper = styled.div`
  width: 94vw;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  overflow-x: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  button {
    border-radius: 8px;
    cursor: pointer;
    height: 26px;
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    white-space: nowrap;
    margin: 4px;
    &.add-btn {
      font-size: 10px;
      color: rgb(116, 118, 145);
      border: 1px solid rgba(116, 118, 145, 0.5);
      background: none;
      padding: 6px 12px;
      svg {
        margin-right: 4px;
      }
      &:hover {
        color: rgb(255, 255, 255);
        border: 1px solid rgb(255, 255, 255);
        opacity: 0.6;
      }
    }
  }
`

interface MobileTokenButtonProps {
  active?: boolean;
}

export const MobileTokenButton = styled.button<MobileTokenButtonProps>`
  color: rgb(116, 118, 145);
  border: none;
  background-color: rgb(12, 10, 30);
  padding: 4px 8px 4px 12px;
  font-size: 13px;
  > svg {
    margin-left: 4px;
  }
  &:hover {
    color: rgb(229, 229, 229);
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${(props: any) => props.active && css`
    background-color: rgb(27, 133, 105) !important;
    color: rgb(229, 229, 229) !important;
  `}
`

export const TokenListWrapper = styled.div`
  width: 94vw;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 4px 0px 6px;
  padding: 0px 4px;
  border-radius: 8px;
  box-sizing: border-box;
  overflow-x: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`

export const MobileTokenImage = styled.div`
  color: rgb(255, 255, 255);
  cursor: pointer;
  text-decoration: none;
  word-break: break-word;
  font-size: 14px;
  img {
    border-radius: 100%;
    height: 36px;
    width: 36px;
    margin: 0px 8px 0px 4px;
    box-shadow: rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px;
    &:hover {
      transform: scale(1.1);
    }
  }
`
