import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import {
  Container,
  CollectWrapper,
  InputWrapper,
  Input,
  ActionWrapper,
  DropDownList,
  ArrowButton,
  DropDownItem,
  TokenListWrapper,
  TokenItemWrapper,
  InfoWrapper,
  TokenRemoveButton,
  EmptyList
} from './styles'

interface WatchListProps {
  watchlist?: any;
  handleUpdateWatchListGroup?: any;
  handleAddWatchListGroup?: any;
  handleDeleteWatchListGroup?: any;
  watchListGroup?: any;
  active?: boolean;
  setSelectedWatchList?: any;
};

export const WatchList = (props: WatchListProps) => {
  const {
    watchlist,
    watchListGroup,
    handleUpdateWatchListGroup,
    handleAddWatchListGroup,
    handleDeleteWatchListGroup,
    setSelectedWatchList,
    active
  } = props;

  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dropDownRef = useRef<any>(null)

  const handleClickOutside = (e: any) => {
    if (!isDropDown) return
    const outsideCalendar = !dropDownRef.current?.contains(e.target)
    if (outsideCalendar) {
      setIsDropDown(false)
    }
  }

  const handleChangeAction = (index: number) => {
    setIsDropDown(false);
    if (index === 0) setIsEdit(true);
    else if (index === 1) {
      const uniqueId: string = uuid();
      const updatedItem = { ...watchlist, key: uniqueId, name: `${watchlist.name} (copy)`, tokens: [...watchlist.tokens] }
      handleAddWatchListGroup(updatedItem)
    } else {
      handleDeleteWatchListGroup(watchlist)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isDropDown]);

  return (
    <Container>
      <CollectWrapper active={active} onClick={() => setSelectedWatchList(watchlist)}>
        <ArrowButton
          expand={isExpand}
          onClick={() => setIsExpand(prev => !prev)}
        >
          <RightArrowIcon />
        </ArrowButton>
        <InputWrapper>
          <span>{watchlist?.tokens?.length || 0}</span>
          <Input
            defaultValue={watchlist?.name}
            disabled={!isEdit}
            onBlur={(e) => {
              setIsEdit(false);
              handleUpdateWatchListGroup({ ...watchlist, name: e.target.value ?? watchlist.name })
            }}
          />
        </InputWrapper>
        {active && (
          <ActionWrapper ref={dropDownRef}>
            <button onClick={() => setIsDropDown(true)}>
              <MoreInfoIcon />
            </button>
            <DropDownList active={isDropDown}>
              <div>
                <DropDownItem onClick={() => handleChangeAction(0)}>
                  <EditIcon />
                  <label>Edit title</label>
                </DropDownItem>
                <DropDownItem onClick={() => handleChangeAction(1)}>
                  <DuplicateIcon />
                  <label>Duplicate</label>
                </DropDownItem>
                {watchListGroup?.length !== 1 && (
                  <DropDownItem onClick={() => handleChangeAction(2)}>
                    <DeleteIcon />
                    <label>Delete</label>
                  </DropDownItem>
                )}

              </div>
            </DropDownList>
          </ActionWrapper>
        )}

      </CollectWrapper>
      {isExpand && (
        <TokenListWrapper>
          {watchlist?.tokens?.length > 0 ? (watchlist?.tokens.map((token: any, i: number) => (
            <TokenItemWrapper key={i}>
              <div>
                <InfoWrapper>
                  <div>
                    <img src={token?.icon} alt='' />
                    <span>{token.name}</span>
                  </div>
                </InfoWrapper>
                <TokenRemoveButton className='token-remove' onClick={() => {
                  const _tokens = [...watchlist?.tokens];
                  _tokens.splice(i, 1);
                  handleUpdateWatchListGroup({ ...watchlist, tokens: [..._tokens] })
                }}>
                  <RemoveIcon />
                </TokenRemoveButton>
              </div>
            </TokenItemWrapper>
          ))) : (
            <EmptyList>This list is empty</EmptyList>
          )}
        </TokenListWrapper>
      )}

    </Container>
  )
}

export const RightArrowIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-1hkd4f7">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
}

export const MoreInfoIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-o2lwrq">
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  )
}

export const EditIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
  )
}

export const DuplicateIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  )
}

export const DeleteIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  )
}

export const RemoveIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-1plrovb">
      <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
}
