use crate::*;
extern crate chrono;
// use chrono::prelude::*;
use chrono::{DateTime, Local, NaiveDateTime, Utc};
use std::time::SystemTime;
use std::convert::TryFrom;

// we have to define view functions here.
// but maybe I already adjusted and you would add little funtions.

#[near_bindgen]
impl Contract {
    /// views
    pub fn get_supply_staking_informations(&self) -> U64 {
        U64(self.staking_informations.len())
    }

    pub fn get_supply_by_owner_id(&self, account_id: AccountId) -> U64 {
        let by_owner_id = self.by_owner_id.get(&account_id);
        if let Some(by_owner_id) = by_owner_id {
            U64(by_owner_id.len())
        } else {
            U64(0)
        }
    }

    pub fn get_supply_by_contract_id(&self, account_id: AccountId) -> U64 {
        let by_contract_id = self.by_contract_id.get(&account_id);
        if let Some(by_contract_id) = by_contract_id {
            U64(by_contract_id.len())
        } else {
            U64(0)
        }
    }

    pub fn get_staking_informations_by_owner_id(
        &self,
        account_id: AccountId,
        from_index: U64,
        limit: u64,
    ) -> Vec<StakeInfo> {
        let mut tmp = vec![];
        let by_owner_id = self.by_owner_id.get(&account_id);
        let staking_informations = if let Some(by_owner_id) = by_owner_id {
            by_owner_id
        } else {
            return vec![];
        };
        let keys = staking_informations.as_vector();
        let start = u64::from(from_index);
        let end = min(start + limit, staking_informations.len());
        for i in start..end {
            tmp.push(
                self.staking_informations
                    .get(&keys.get(i).unwrap())
                    .unwrap(),
            );
        }
        tmp
    }

    pub fn get_staking_informations_by_contract_id(
        &self,
        account_id: AccountId,
        from_index: U64,
        limit: u64,
    ) -> Vec<String> {
        let mut tmp = vec![];
        let by_contract_id = self.by_contract_id.get(&account_id);
        let staking_informations = if let Some(by_contract_id) = by_contract_id {
            by_contract_id
        } else {
            return vec![];
        };
        let keys = staking_informations.as_vector();
        let start = u64::from(from_index);
        let end = min(start + limit, staking_informations.len());
        for i in start..end {
            tmp.push(
                keys.get(i).unwrap()
            );
        }
        tmp
    }

    pub fn get_staking_information(&self, nft_contract_id: AccountId, token_id: TokenId) -> Option<StakeInfo> {
        let contract_and_token_id = format!("{}{}{}", nft_contract_id, DELIMETER, token_id);
        self.staking_informations.get(&contract_and_token_id)
    }
}
