use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap, UnorderedSet};
use near_sdk::json_types::{ValidAccountId, U128, U64};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    assert_one_yocto, env, ext_contract, near_bindgen, AccountId, Balance, BorshStorageKey,
    CryptoHash, Gas, PanicOnDefault, Promise,
};
use std::cmp::min;
use std::collections::HashMap;
use std::convert::TryInto;
use crate::external::*;
use crate::internal::*;
use crate::staking::*;
use near_sdk::env::STORAGE_PRICE_PER_BYTE;

mod external;
mod internal;
mod nft_callbacks;
mod staking;
mod staking_views;

near_sdk::setup_alloc!();

//I already adjusted this contract and it has basic info for staking.

// TODO check seller supports storage_deposit at ft_token_id they want to post sale in

const GAS_FOR_FT_TRANSFER: Gas = 5_000_000_000_000;
/// greedy max Tgas for resolve_purchase
const GAS_FOR_ROYALTIES: Gas = 115_000_000_000_000;
const GAS_FOR_NFT_TRANSFER: Gas = 15_000_000_000_000;
const GAS_FOR_NFT_APPROVE: Gas = 30_000_000_000_000;
const BID_HISTORY_LENGTH_DEFAULT: u8 = 1;
const NO_DEPOSIT: Balance = 0;
const STORAGE_PER_SALE: u128 = 1000 * STORAGE_PRICE_PER_BYTE;
static DELIMETER: &str = "||";

pub type TokenId = String;
pub type ContractAndTokenId = String;

// TODO: Capital U128
pub type Payout = HashMap<AccountId, U128>;
#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct StorageBalanceBounds {
    pub min: U128,
    pub max: Option<U128>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub owner_id: AccountId,
    pub nft_contract_ids: UnorderedSet<AccountId>,
    pub observe_ids: UnorderedSet<AccountId>,
    pub staking_informations: UnorderedMap<ContractAndTokenId, StakeInfo>,
    pub by_owner_id: LookupMap<AccountId, UnorderedSet<ContractAndTokenId>>,
    pub by_contract_id: LookupMap<AccountId, UnorderedSet<String>>,
    pub storage_deposits: LookupMap<AccountId, Balance>,
}

/// Helper structure to for keys of the persistent collections.
#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKey {
    StakingInformation,
    ByOwnerId,
    ByOwnerIdInner { account_id_hash: CryptoHash },
    ByContractId,
    ByContractIdInner { account_id: AccountId,
    token_id: String },
    NftContractIds,
    ObserveIds,
    StorageDeposits,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(
        owner_id: ValidAccountId
    ) -> Self {
        let mut this = Self {
            owner_id: owner_id.into(),
            nft_contract_ids: UnorderedSet::new(StorageKey::NftContractIds),
            observe_ids: UnorderedSet::new(StorageKey::ObserveIds),
            // nft_contract_id: String::new(StorageKey::NftContractId),
            staking_informations: UnorderedMap::new(StorageKey::StakingInformation),
            by_owner_id: LookupMap::new(StorageKey::ByOwnerId),
            by_contract_id: LookupMap::new(StorageKey::ByContractId),
            storage_deposits: LookupMap::new(StorageKey::StorageDeposits),
        };
        this.nft_contract_ids.insert(&"terraspaces.near".to_string().try_into().unwrap());
        this.nft_contract_ids.insert(&"asac.near".to_string().try_into().unwrap());
        this.nft_contract_ids.insert(&"mara-smartcontract.near".to_string().try_into().unwrap());
        this.nft_contract_ids.insert(&"nearnautnft.near".to_string().try_into().unwrap());
        this.nft_contract_ids.insert(&"nft.thedons.near".to_string().try_into().unwrap());
        this.nft_contract_ids.insert(&"mint.havendao.near".to_string().try_into().unwrap());
        this.nft_contract_ids.insert(&"boo-monster-by-omarbibznear".to_string().try_into().unwrap());
        this.nft_contract_ids.insert(&"starry-night-by-markoethnear".to_string().try_into().unwrap());
        
        this.observe_ids.insert(&"terraspaces.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"asac.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"nearnautnft.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"kokumokongz.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"mara-smartcontract.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"nft.thedons.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"secretskelliessociety.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"grimms.secretskelliessociety.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"mint.havendao.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"dragonnation.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"nearton_nft.near".to_string().try_into().unwrap());
        // this.observe_ids.insert(&"mara_nft.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"spin-nft-contract.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"tinkerunion_nft.enleap.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"auroradoves.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"near-punks.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"nft.goodfortunefelines.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"kaizofighters.tenk.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"tokodao.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"classykangaroos1.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"tickets-exxaverse.near".to_string().try_into().unwrap());
        // this.observe_ids.insert(&"puunboy.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"estates.secretskelliessociety.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"astropup.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"mrbrownproject.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"neargurls.neartopia.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"monkegodz.tenk.near".to_string().try_into().unwrap());
        // this.observe_ids.insert(&"nearwooks.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"engineart.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"tayc-nft.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"misfits.tenk.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"nagmi.oldmantrader.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"extinctheroes.tenk.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"lionpride.neartopia.near".to_string().try_into().unwrap());
        // this.observe_ids.insert(&"taitern.near".to_string().try_into().unwrap());
        this.observe_ids.insert(&"flipped-face-by-taiternnear".to_string().try_into().unwrap());
        this.observe_ids.insert(&"the-wooks-by-nearwooksnear".to_string().try_into().unwrap());
        this.observe_ids.insert(&"near-nomad-by-puunboynear".to_string().try_into().unwrap());
        this.observe_ids.insert(&"mara-gen-0-by-maranftnear".to_string().try_into().unwrap());
        
        this
    }

    pub fn get_nft_contract_ids(&self) -> Vec<AccountId> {
        self.nft_contract_ids.to_vec()
    }

    #[payable]
    pub fn append_nft_contract_id(&mut self, nft_contract_id: AccountId){
        self.assert_owner();
        self.nft_contract_ids.insert(&nft_contract_id);
    }

    #[payable]
    pub fn remove_nft_contract_id(&mut self, nft_contract_id: AccountId){
        self.assert_owner();
        self.nft_contract_ids.remove(&nft_contract_id);
    }

    pub fn get_observe_ids(&self) -> Vec<AccountId> {
        self.observe_ids.to_vec()
    }

    #[payable]
    pub fn append_observe_id(&mut self, nft_contract_id: AccountId){
        self.assert_owner();
        self.observe_ids.insert(&nft_contract_id);
    }

    #[payable]
    pub fn remove_observe_id(&mut self, nft_contract_id: AccountId){
        self.assert_owner();
        self.observe_ids.remove(&nft_contract_id);
    }

    #[payable]
    pub fn storage_deposit(&mut self, account_id: Option<ValidAccountId>) {
        let storage_account_id = account_id
            .map(|a| a.into())
            .unwrap_or_else(env::predecessor_account_id);
        let deposit = env::attached_deposit();
        assert!(
            deposit >= STORAGE_PER_SALE,
            "Requires minimum deposit of {}",
            STORAGE_PER_SALE
        );
        let mut balance: u128 = self.storage_deposits.get(&storage_account_id).unwrap_or(0);
        balance += deposit;
        self.storage_deposits.insert(&storage_account_id, &balance);
    }

    #[payable]
    pub fn storage_withdraw(&mut self) {
        assert_one_yocto();
        let owner_id = env::predecessor_account_id();
        let mut amount = self.storage_deposits.remove(&owner_id).unwrap_or(0);
        let sales = self.by_owner_id.get(&owner_id);
        let len = sales.map(|s| s.len()).unwrap_or_default();
        let diff = u128::from(len) * STORAGE_PER_SALE;
        amount -= diff;
        if amount > 0 {
            Promise::new(owner_id.clone()).transfer(amount);
        }
        if diff > 0 {
            self.storage_deposits.insert(&owner_id, &diff);
        }
    }

    /// views


    pub fn storage_balance_bounds(&self) -> StorageBalanceBounds {
        StorageBalanceBounds {
            min: U128(STORAGE_PER_SALE),
            max: None,
        }
    }

    pub fn storage_minimum_balance(&self) -> U128 {
        U128(STORAGE_PER_SALE)
    }

    pub fn storage_balance_of(&self, account_id: ValidAccountId) -> U128 {
        U128(self.storage_deposits.get(account_id.as_ref()).unwrap_or(0))
    }

    /// deprecated

    pub fn storage_paid(&self, account_id: ValidAccountId) -> U128 {
        U128(self.storage_deposits.get(account_id.as_ref()).unwrap_or(0))
    }

    pub fn storage_amount(&self) -> U128 {
        U128(STORAGE_PER_SALE)
    }
}
