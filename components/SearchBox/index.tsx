import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useCollection } from '../../contexts/CollectionContext'
import {
  Container,
  SearchInputBox,
  SearchIconWrapper,
  DropDownList,
  DropDownItem
} from './styles'

import { WalletContext, STAKE_CONTRACT_ID } from '../../contexts/wallet'

export const SearchBox = () => {
  const { wallet, getNftMetadata, getCollectionList, getCollectionMetadata } = useContext(WalletContext)
  const { setCollection } = useCollection()
  const [searchVal, setSearchVal] = useState<string>('');
  const [collections, setCollections] = useState<any>([]);
  const [collectionList, setCollectionList] = useState<any>([]);
  const [lazyLoad, setlazyLoad] = useState(true)

  const router = useRouter();
  let timeout: any = null;
  let previousSearch: any;
  const el = React.useRef<any>(null);


  const fetchCollectionList = async () => {
    let stakeData = await wallet?.account().viewFunction(STAKE_CONTRACT_ID,
      "get_staking_informations_by_owner_id",
      {
        account_id: wallet.getAccountId(),
        from_index: "0",
        limit: 100,
      });
    stakeData = stakeData || [];
    for (let i = 0; i < stakeData.length; i++) {
      const nft_info = await wallet?.account().viewFunction(stakeData[i].nft_contract_id,
        "nft_token",
        {
          token_id: stakeData[i].token_id,
        });

      if ((JSON.stringify(nft_info.approved_account_ids).match(STAKE_CONTRACT_ID) || []).length
        == (JSON.stringify(nft_info.approved_account_ids).match('":') || []).length) {
        const accountList = await getCollectionList();
        const collectionList = await Promise.all(accountList.map(async (account_id: string) => {
          const data = await getCollectionMetadata(account_id);
          return { ...data, account_id }
        }));
        console.log(collectionList);
        setCollectionList(collectionList);
        return;
      }
    }
  }

  const onChangeSearch = (e: any) => {
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      setSearchVal(e.target.value)
    }, 750);

    if (previousSearch !== e.target.value) {
      if (!lazyLoad) {
        setSearchVal(e.target.value)
      } else {
        clearTimeout(timeout)
        timeout = setTimeout(function () {
          setSearchVal(e.target.value)
        }, 750)
      }

    }
    previousSearch = e.target.value
  }

  const handleClickCollection = (item: any) => {
    setCollection(item);
    setCollections([]);
    el.current.value = item.name;
  }

  useEffect(() => {
    el.current.onkeyup = onChangeSearch
  })

  useEffect(() => {
    if (!searchVal) {
      el.current.value = '';
      setCollections([])
      return
    }
    const updatedList: any = collectionList.filter((item: any): any => item?.name?.toLowerCase().includes(searchVal?.toLowerCase()));
    setCollections(updatedList);
  }, [searchVal])

  useEffect(() => {
    if (router.pathname === '/dashboard') setlazyLoad(false);
  }, [router.pathname])

  useEffect(() => {
    if (wallet) {
      fetchCollectionList();
    }
  }, [wallet])
  return (
    <Container>
      <SearchInputBox>
        <input
          placeholder={router.pathname === '/dashboard' ? 'Add a collection' : 'Search for items, collections and accounts'}
          ref={el}
          autoComplete='off'
        />
        <DropDownList>
          {collections.map((item: any, i: number) => (
            <DropDownItem key={i} onClick={() => handleClickCollection(item)}>
              <span>{item.name}</span>
              <AddIcon />
            </DropDownItem>
          ))}
        </DropDownList>
      </SearchInputBox>
      <SearchIconWrapper className='cmn-btn'>
        <SearchIcon />
      </SearchIconWrapper>
    </Container>
  )
}

export const SearchIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-14oyyg8">
      <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  )
}

export const AddIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-rf1eo">
      <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  )
}