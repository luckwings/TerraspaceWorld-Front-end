import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const SearchInputBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  > input {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #FFF;
    background: var(--card-color);
    border: none;
    border-right: none;
    border-radius: 10px;
    padding: 8px;
    outline: none;
    text-indent: 8px;
    width: 100%;
    min-width: 50px;
    height: 42px;
  }
  @media (min-width: 768px) {
    > input {
      min-width: 300px;
    }
  }
`

export const SearchIconWrapper = styled.button`
  margin-left: 10px;
`

export const DropDownList = styled.div`
  padding: 0px;
  font-size: 14px;
  box-shadow: rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px;
  background: var(--card-color);
  border: none;
  border-radius: 10px;
  list-style: none;
  position: absolute;
  top: 100%;
  max-height: 200px;
  min-width: 100%;
  overflow: auto;
  z-index: 2;
  margin-top: 5px;
`

export const DropDownItem = styled.div`
  position: relative;
  width: 100%;
  padding: 8px 12px;
  /* width: 224px; */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 300;
  color: rgb(229, 229, 229);

  span {
    width: calc(100% - 20px);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    background-color: rgb(67, 143, 255);
  }
`