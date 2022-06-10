import * as nearAPI from "near-api-js";
import React, { useCallback, useEffect, useState } from "react";

import {
  ConnectConfig,
  WalletConnection as WalletConnectionProps,
} from "near-api-js"
import { Provider } from "near-api-js/lib/providers";

const { KeyPair, keyStores, connect, WalletConnection, utils: { format: { formatNearAmount } } } = nearAPI;

export const STAKE_CONTRACT_ID = "terraspaces-staking.near"
export const NFT_CONTRACT_ID = "terraspaces.near"
export const GAS_FOR_NFT_APPROVE = "20000000000000";
export const GAS_FOR_RESOLVE_TRANSFER = "10000000000000";
export const GAS_FOR_SIMPLE_TRANSACTION = "10000000000000";
export const MAX_GAS = "300000000000000";
export const DEPOSIT = "1000000000000000000000";

export const X_PARAS_COLLECTIONS = ["flipped-face-by-taiternnear", "the-wooks-by-nearwooksnear", "near-nomad-by-puunboynear", "mara-gen-0-by-maranftnear", "boo-monster-by-omarbibznear", "starry-night-by-markoethnear"]

interface ConnectionContextProps {
  near: nearAPI.Near | undefined
  wallet: WalletConnectionProps | undefined
  signIn: Function
  signOut: Function
  getNftMetadata: Function
  getCollectionList: Function
  getCollectionMetadata: Function
  getMainCollectionList: Function
}

export type TokenMetadata = {
  title?: string, // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
  description?: string, // free-form description
  media?: string, // URL to associated media, preferably to decentralized, content-addressed storage
  media_hash?: string, // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
  copies?: Number // number of copies of this set of metadata in existence when token was minted.
  issued_at?: Number // When token was issued or minted, Unix epoch in milliseconds
  expires_at?: Number // When token expires, Unix epoch in milliseconds
  starts_at?: Number // When token starts being valid, Unix epoch in milliseconds
  updated_at?: Number // When token was last updated, Unix epoch in milliseconds
  extra?: string // anything extra the NFT wants to store on-chain. Can be stringified JSON.
  reference?: string // URL to an off-chain JSON file with more info.
  reference_hash?: string // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

export type NftData = {
  token_id: string
  owner_id: string
  metadata: TokenMetadata
  approved_account_ids: Object
  royalty: Object
}

export type NftContractMetadata = {
  spec: string,              // required, essentially a version like "nft-1.0.0"
  name: string,              // required, ex. "Mosaics"
  symbol: string,            // required, ex. "MOSIAC"
  icon?: string,      // Data URL
  base_uri?: string, // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
  reference?: string, // URL to a JSON file with more info
  reference_hash?: string, // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

export const WalletContext = React.createContext<ConnectionContextProps>({
  near: undefined,
  wallet: undefined,
  signIn: () => { },
  signOut: () => { },
  getNftMetadata: () => { },
  getCollectionList: () => { },
  getCollectionMetadata: () => { },
  getMainCollectionList: () => { },
})

// connect to NEAR
const WalletProvider = (props: any) => {
  const [near, setNear] = useState<nearAPI.Near>()
  const [wallet, setWallet] = useState<WalletConnectionProps>()
  const [provider, setProvider] = useState<Provider>()
  const [nearBalance, setNearBalance] = useState<String>("")
  const { keyStore } = props;

  const signIn = () => {
    if (wallet)
      wallet.requestSignIn(STAKE_CONTRACT_ID);
  };

  const signOut = () => {
    if (!wallet) return
    wallet.signOut()
    location.replace("/")
  };

  const connectToNear = useCallback(async () => {
    try {
      if (keyStore) {
        const config: ConnectConfig = {
          networkId: "mainnet",
          keyStore, // optional if not signing transactions
          nodeUrl: "https://rpc.mainnet.near.org",
          walletUrl: "https://wallet.mainnet.near.org",
          helperUrl: "https://helper.mainnet.near.org",
          // explorerUrl: "https://explorer.mainnet.near.org",
          headers: {}
        };
        const near = await connect(config);
        const provider = near.connection.provider;
        const wallet = new WalletConnection(near, null);
        setNear(near);
        setWallet(wallet);
        setProvider(provider);
        if (wallet && wallet.isSignedIn()) {
          let accountState = await wallet.account().state();
          setNearBalance(formatNearAmount(accountState.amount));
          let result = await wallet.account().getAccessKeys();
          let tokenKeyExist = false;
          // for(let i=0; i<result.length; i++){
          //   if(result[i].access_key.permission != 'FullAccess' && result[i].access_key.permission.receiver_id == NFT_CONTRACT_ID){
          //     tokenKeyExist = true;
          //     break;
          //   }
          // }
          // if(tokenKeyExist == false){
          //   console.log("Adding AccessKey to Token");
          //   const keyPair = KeyPair.fromRandom("ed25519");
          //   const publicKey = keyPair.getPublicKey().toString();
          //   await keyStore.setKey(config.networkId, publicKey, keyPair);
          //   await wallet.account().addKey(publicKey, 'kaizofighter_game_test_5.xuguangxia.near', [], '250000000000000000000000');
          // }
        } else {
          setNearBalance("0");
          console.log("==============================", nearBalance);
        }
      }
    } catch (error) {
      console.log(error, "error")
    }
  }, [keyStore])

  const getNftMetadata = async (wallet: WalletConnectionProps) => {
    if (wallet && wallet.isSignedIn()) {
      const metadata = await wallet.account().viewFunction(
        NFT_CONTRACT_ID,
        "nft_metadata",
        {
        }
      );
      return metadata;
    }
    return {};
  }

  const getCollectionList = async () => {
    const rawResult: any = await provider?.query({
      request_type: "call_function",
      account_id: STAKE_CONTRACT_ID,
      method_name: "get_observe_ids",
      args_base64: btoa(`{}`),
      finality: "optimistic",
    })
    const results = JSON.parse(Buffer.from(rawResult.result).toString())

    return results
  }

  const getMainCollectionList = async () => {
    const rawResult: any = await provider?.query({
      request_type: "call_function",
      account_id: STAKE_CONTRACT_ID,
      method_name: "get_nft_contract_ids",
      args_base64: btoa(`{}`),
      finality: "optimistic",
    })
    const results = JSON.parse(Buffer.from(rawResult.result).toString())

    return results
  }

  const getCollectionMetadata = async (account_id: string) => {
    if (X_PARAS_COLLECTIONS.includes(account_id)) {
      const result = await fetch("https://api-v2-mainnet.paras.id/collections?collection_id=" + account_id);
      const fetch_result = await result.json();
      console.log(fetch_result);
      const collection_info = fetch_result["data"]["results"][0];
      return {
        name: collection_info.collection,
        icon: "https://ipfs.fleek.co/ipfs/" + collection_info.media
      }
    }
    const rawResult: any = await provider?.query({
      request_type: "call_function",
      account_id: account_id,
      method_name: "nft_metadata",
      args_base64: btoa(`{}`),
      finality: "optimistic",
    })
    const results = JSON.parse(Buffer.from(rawResult.result).toString())
    return results
  }

  useEffect(() => {
    connectToNear()
  }, [keyStore])

  return (
    <WalletContext.Provider
      value={{ near, wallet, signIn, signOut, getNftMetadata, getCollectionList, getCollectionMetadata, getMainCollectionList }}
    >
      {props.children}
    </WalletContext.Provider>
  )
}

export default WalletProvider
