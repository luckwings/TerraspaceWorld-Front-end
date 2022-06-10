import { useEffect, useState, useContext } from 'react'
import { WatchList } from '../WatchList';
import { v4 as uuid } from 'uuid';
import {
  Container,
  SideBarWrapper,
  ContentWrapper,
  SideBarFooter,
  ArrowButton,
  SideBarContent,
  TokenList,
  TokenImgWrapper,
  MobileSideBarWrapper,
  TabWrapper,
  WatchListWrapper,
  MobileTokenButton,
  TokenListWrapper,
  MobileTokenImage
} from './styles'
import { useCollection } from '../../contexts/CollectionContext';
import { DashboardChartView } from '../DashboardChartView';

export const Dahsboard = () => {
  const { collection, setCollection } = useCollection()
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [watchListGroup, setWatchListGroup] = useState<Array<any>>([]);
  const [selectedWatchList, setSelectedWatchList] = useState<any>(null);
  const [isMobileActive, setIsMobileActive] = useState<boolean>(true);

  const syncWatchListGroup = () => {
    let _watchlistGroup = JSON.parse(localStorage.getItem("watchlist_group")!);
    if (!_watchlistGroup || _watchlistGroup.length < 1) {
      _watchlistGroup = [
        { key: uuid(), name: 'Watchlist #1', tokens: [] }
      ]
    }
    if (_watchlistGroup.length > 0) {
      setWatchListGroup(_watchlistGroup);
      setSelectedWatchList(_watchlistGroup[0]);
    }
  }

  const updateWatchlistGroup = async (_watchlistGroup: any[]) => {
    setWatchListGroup(_watchlistGroup);
    localStorage.setItem('watchlist_group', JSON.stringify(_watchlistGroup));
  }

  const handleUpdateWatchListGroup = (item: any) => {
    const _watchListGroup = watchListGroup.map((watchList: any) => {
      if (watchList?.key === item?.key) {
        return {
          ...watchList,
          ...item
        }
      }
      return watchList;
    });
    setSelectedWatchList(item);
    updateWatchlistGroup(_watchListGroup);
    // setWatchListGroup(_watchListGroup);
  }

  const handleAddWatchListGroup = (item: any) => {
    const _watchListGroup = [...watchListGroup];
    item && _watchListGroup.push(item);
    updateWatchlistGroup(_watchListGroup);
    // setWatchListGroup(_watchListGroup);
  }

  const handleDeleteWatchListGroup = (item: any) => {
    const _watchListGroup = watchListGroup.filter((watchList: any) => watchList.key !== item.key);
    if (item?.key === selectedWatchList?.key) {
      setSelectedWatchList(_watchListGroup[0]);
    }
    updateWatchlistGroup(_watchListGroup);
    // setWatchListGroup(_watchListGroup);
  }

  const handleAdd = () => {
    const uniqueId: string = uuid();
    const _watchList = { key: uniqueId, name: `Watchlist #${watchListGroup?.length + 1}`, tokens: [] };
    handleAddWatchListGroup(_watchList);
  }

  const handleMobileWatchClick = (e: any, item: any) => {
    if (e.target.closest('svg')) return;
    setSelectedWatchList(item);
  }

  useEffect(() => {
    syncWatchListGroup();
  }, [])

  useEffect(() => {
    if (selectedWatchList === null || collection === undefined || watchListGroup?.length === 0) return
    let isValid = false;
    watchListGroup.forEach(item => {
      if (selectedWatchList.key === item.key) {
        const index = item.tokens.find((item: any) => item?.symbol === collection.symbol)
        isValid = index
      }
    })

    if (isValid) return
    const updatedWatchListGroup = watchListGroup.map(item => {
      if (selectedWatchList.key === item.key) {
        const _tokens = [...item.tokens]
        _tokens.push(collection)
        setCollection(undefined);
        setSelectedWatchList({...selectedWatchList, tokens: _tokens})
        return {
          ...item,
          tokens: _tokens
        }
      }
      return item
    })
    updateWatchlistGroup(updatedWatchListGroup);
    // setWatchListGroup(updatedWatchListGroup)
  }, [collection, watchListGroup])


  return (
    <>
      <Container>
        <div className="vector-abs">
          <img src="assets/img/vector/Vector.png" alt="Vector" loading="lazy" />
        </div>
        <SideBarWrapper isCollapse={isCollapse}>
          <div>
            <SideBarContent>
              {!isCollapse ? (
                watchListGroup.map((item, i) => (
                  <WatchList
                    key={JSON.stringify(item)}
                    watchlist={item}
                    handleUpdateWatchListGroup={handleUpdateWatchListGroup}
                    handleAddWatchListGroup={handleAddWatchListGroup}
                    handleDeleteWatchListGroup={handleDeleteWatchListGroup}
                    watchListGroup={watchListGroup}
                    active={item?.key === selectedWatchList?.key}
                    setSelectedWatchList={setSelectedWatchList}
                  />
                ))
              ) : (
                <TokenList>
                  {selectedWatchList?.tokens?.length > 0 && selectedWatchList?.tokens?.map((token: any, i: number) => (
                    <TokenImgWrapper key={i}>
                      <img src={token?.icon} alt='' />
                    </TokenImgWrapper>
                  ))}
                </TokenList>
              )}

            </SideBarContent>
            <SideBarFooter>
              {!isCollapse && (
                <button className='add-btn' onClick={handleAdd}>
                  <AddIcon />
                  ADD WATCHLIST
                </button>
              )}
              <ArrowButton
                isCollapse={isCollapse}
                onClick={() => setIsCollapse(prev => !prev)}
              >
                <LeftArrowIcon />
              </ArrowButton>
            </SideBarFooter>
          </div>
        </SideBarWrapper>
        <ContentWrapper>
          {selectedWatchList?.tokens.map((token: any, key: number) => {
            return (<DashboardChartView key={key} token={token} />);
          })}
        </ContentWrapper>
      </Container>
      <MobileSideBarWrapper inActive={!isMobileActive}>
        <TabWrapper>
          <div onClick={() => setIsMobileActive(prev => !prev)} />
        </TabWrapper>
        <WatchListWrapper>
          <button className='add-btn' onClick={handleAdd}>
            <AddIcon />
            WATCHLIST
          </button>
          {watchListGroup?.length > 0 && watchListGroup?.map((watch: any, i: number) => (
            <MobileTokenButton key={i} active={watch?.key === selectedWatchList?.key} onClick={(e) => handleMobileWatchClick(e, watch)}>
              {watch?.name}
              <CloseIcon onClick={() => handleDeleteWatchListGroup(watch)} />
            </MobileTokenButton>
          ))}
        </WatchListWrapper>
        <TokenListWrapper>
          {selectedWatchList?.tokens?.length > 0 && selectedWatchList?.tokens?.map((token: any, i: number) => (
            <MobileTokenImage key={i}>
              <img src={token?.icon} alt='' />
            </MobileTokenImage>
          ))}
        </TokenListWrapper>
      </MobileSideBarWrapper>
    </>
  )
}

export const AddIcon = () => {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
    </svg>
  )
}

export const LeftArrowIcon = () => {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
    </svg>
  )
}

export const CloseIcon = (props: any) => {
  const { onClick } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-1vsvyrr" onClick={onClick}>
      <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
}
