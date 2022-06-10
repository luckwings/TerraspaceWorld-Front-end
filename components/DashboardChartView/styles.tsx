import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-bottom: 8px;
`

interface HeaderWrapperProps {
  readonly expand?: boolean;
}

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 15px;
  padding: 15px 10px;
  background: rgb(20, 20, 48);
  border-bottom: none;
  position: relative;
  white-space: nowrap;

  ${(props: any) => props?.expand && css`
    border-radius: 8px 8px 0px 0px;
  `}

  @media (min-width: 768px) {
    padding: 10px 24px;
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 22px;
    width: 22px;
    margin-right: 10px;
    border-radius: 50%;
    user-select: none;
  }

  span {
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    text-decoration: none;
    color: rgb(229, 229, 229);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      color: rgb(67, 143, 255);
    }
  }
`

interface ArrowIconButtonProps {
  readonly expand?: boolean;
}

export const ArrowIconButton = styled.button<ArrowIconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  border: none;
  background: transparent;
  padding: 0px;
  margin-top: 2px;
  margin-right: 5px;
  svg {
    color: white;
    min-width: 22px;
    height: 22px;
    transition: transform 0.2s ease;
  }
  &:hover {
    opacity: 1;
  }

  ${(props: any) => props?.expand && css`
    svg {
      transform: rotateZ(90deg);
    }
  `}
`

export const ChartInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NotificationIconButton = styled.button`
  border-radius: 50%;
  background-color: transparent;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;

  svg {
    color: rgb(255, 255, 255);
  }

  &:hover {
    background-color: rgb(10, 2, 33);
    opacity: 1;
  }
`

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  border-radius: 8px;
  padding: 4px;
  font-size: 10px;
  font-weight: 400;
  color: rgb(255, 255, 255);
  opacity: 0.8;
  white-space: nowrap;
  text-transform: uppercase;
  flex-direction: column;

  span {
    font-weight: 400;
    color: rgb(75, 186, 157);
    cursor: pointer;
    font-size: 10px;
    filter: brightness(1.1);
    margin-left: 5px;
  }
  @media (min-width: 576px) {
    font-size: 12px;
    span {
      font-size: 12px;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const ContentWrapper = styled.div`
  background: rgb(20, 20, 48);
  border-radius: 0px 0px 8px 8px;
  margin-right: 15px;
  padding: 0px 24px 24px;
`

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const FloorButton = styled.div`
  cursor: pointer;
  padding: 2px 8px;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 400;
  background: rgb(27, 133, 105);
  margin-right: 8px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  opacity: 0.9;
  height: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  svg {
    margin-right: 4px;
    color: rgb(255, 255, 255);
  }

  span {
    color: rgb(255, 255, 255);
  }

  &:hover {
    opacity: 1;
  }
`

export const ChartContentWrapper = styled.div`
  border-radius: 8px;
  padding: 16px;
  background-color: rgb(10, 2, 33);
`

export const HideShowWrapper = styled.div`
  display: flex;
  align-items: center;
`

interface HideShowItemProps {
  readonly bgColor?: string;
  readonly inActive?: boolean;
}

export const HideShowItem = styled.div<HideShowItemProps>`
  display: flex;
  align-items: center;
  margin: 0px 8px 8px 8px;

  > div {
    background-color: rgb(115, 251, 211);
    width: 12px;
    height: 12px;
    border-radius: 4px;
    margin-right: 6px;
    margin-top: 2px;
  }

  > span {
    &.title {
      color: rgb(116, 118, 145);
      font-weight: 300;
      text-overflow: ellipsis;
    }
    &.value {
      font-weight: 400;
      color: rgb(115, 251, 211);
      cursor: pointer;
      font-size: 12px;
      margin: 2px 4px 0px;
    }
  }

  > button {
    display: flex;
    background: transparent;
    > svg {
      color: rgb(116, 118, 145);
      cursor: pointer;
      margin-top: 2px;
      margin-left: 2px;
      font-size: 12px;
      &:hover {
        color: rgb(229,229,229);
      }
    }
  }

  ${(props: any) => props?.bgColor && css`
    > div {
      background-color: ${props?.bgColor};
    }
    span.value {
      color: ${props?.bgColor};
    }
  `}

  ${(props: any) => props?.inActive && css`
    > div {
      background-color: rgb(116, 118, 145);
    }
    span.value {
      color: rgb(116, 118, 145);
    }
  `}
`

export const HighChartHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 12px;
`
