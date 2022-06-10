import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: calc(100% - 8px);
  margin-right: 8px;
`

interface CollectWrapperProps {
  readonly active?: boolean;
}

export const CollectWrapper = styled.div<CollectWrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2px 8px;
  border-radius: 0px 12px 12px 0px;
  height: 32px;

  button {
    color: rgb(116, 118, 145);
    border-radius: 4px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: rgb(255, 255, 255);
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  ${(props: any) => props?.active && css`
    background: rgba(255, 255, 255, 0.1);
  `}
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  > span {
    color: rgb(116, 118, 145);
    font-size: 14px;
    font-weight: 400;
  }
`

export const Input = styled.input`
  font-size: 14px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0.3);
  border-color: transparent;
  border-radius: 4px;
  cursor: text;
  padding: 0px 4px;
  width: 170px;
  margin-left: 4px;
  outline: none !important;
  &:disabled {
    background-color: transparent;
    cursor: default;
  }
`

export const ActionWrapper = styled.div`
  position: relative;

  > button {
    height: 16px;
    width: 14px;
  }
`

interface DropDownListProps {
  active?: boolean;
}

export const DropDownList = styled.div<DropDownListProps>`
  position: absolute;
  overflow: hidden;
  top: 20px;
  right: 0px;
  background-color: rgb(13, 10, 30);
  border-radius: 6px;
  box-shadow: rgb(0 0 0 / 60%) 0px 8px 20px;
  transition: opacity 200ms ease 0s, transform 200ms ease 0s, visibility 200ms ease 0s;
  z-index: 12;
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  visibility: hidden;

  > div {
    display: flex;
    flex-direction: column;
  }

  ${(props: any) => props?.active && css`
    opacity: 1;
    visibility: visible;
    transform: translateY(10px);
  `}
`

interface ArrowButtonProps {
  readonly expand?: boolean;
}

export const ArrowButton = styled.button<ArrowButtonProps>`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  svg {
    transition: transform 0.2s ease;
  }

  ${(props: any) => props?.expand && css`
    svg {
      transform: rotateZ(90deg);
    }
  `}
`

export const DropDownItem = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  padding: 6px 16px;
  font-size: 10px;
  color: rgb(229, 229, 229);

  label {
    margin-left: 8px;
    cursor: pointer;
    font-size: 12px;
    white-space: nowrap;
    font-weight: 300;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

export const TokenListWrapper = styled.div`
  padding: 4px 0px 6px 38px;
  display: block;
`

export const EmptyList = styled.div`
  padding-left: 14px;
  font-size: 14px;
  color: rgb(116, 118, 145);
  font-weight: 300;
`

export const TokenItemWrapper = styled.div`
  > div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-bottom: 0px;
    padding: 4px 8px 4px 4px;
    width: auto;
  }
  &:hover .token-remove {
    display: flex;
  }
`

export const InfoWrapper = styled.div`
  cursor: pointer;
  color: rgb(255, 255, 255);
  text-decoration: none;
  word-break: break-word;
  font-size: 14px;
  width: 80%;
  margin-left: 8px;
  opacity: 0.8;

  > div {
    display: flex;
    align-items: center;
    flex-direction: row;
    font-weight: 300;
    img {
      height: 20px;
      width: 20px;
      object-fit: cover;
      min-width: 20px;
      border-radius: 100%;
    }
    span {
      display: flex;
      flex-direction: row;
      margin-left: 8px;
      color: rgb(116, 118, 145);
      &:hover {
        color: rgb(255, 255, 255);
      }
    }
  }
`

export const TokenRemoveButton = styled.div`
  align-items: center;
  justify-content: flex-end;
  color: rgb(116, 118, 145);
  display: none;
  cursor: pointer;
  margin-top: 2px;
  &:hover {
    color: rgb(255, 255, 255);
  }
`