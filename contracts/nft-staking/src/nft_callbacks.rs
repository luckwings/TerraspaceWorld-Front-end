use crate::*;

/// approval callbacks from NFT Contracts

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct StakingArgs {
    pub staking_status: String,
}

trait NonFungibleTokenApprovalsReceiver {
    fn nft_on_approve(
        &mut self,
        token_id: TokenId,
        owner_id: ValidAccountId,
        approval_id: u64,
        msg: String,
    );
}

//I already adjusted this function and you can see if someone try to approve his nft to this contract,
//This contract consider it as staking and transfer the nft from owner to this contract and register info.

#[near_bindgen]
impl NonFungibleTokenApprovalsReceiver for Contract {
    /// where we add the sale because we know nft owner can only call nft_approve

    fn nft_on_approve(
        &mut self,
        token_id: TokenId,
        owner_id: ValidAccountId,
        approval_id: u64,
        msg: String,
    ) {
        // enforce cross contract call and owner_id is signer

        let nft_contract_id = env::predecessor_account_id();
        let signer_id = env::signer_account_id();
        assert_ne!(
            nft_contract_id, signer_id,
            "nft_on_approve should only be called via cross-contract call"
        );
        assert_eq!(
            owner_id.as_ref(),
            &signer_id,
            "owner_id should be signer_id"
        );

        // // enforce signer's storage is enough to cover + 1 more sale

        // let storage_amount = self.storage_amount().0;
        // let owner_paid_storage = self.storage_deposits.get(&signer_id).unwrap_or(0);
        // let signer_storage_required = (self.get_supply_by_owner_id(signer_id).0 + 1) as u128 * storage_amount;
        // assert!(
        //     owner_paid_storage >= signer_storage_required,
        //     "Insufficient storage paid: {}, for {} sales at {} rate of per sale",
        //     owner_paid_storage, signer_storage_required / STORAGE_PER_SALE, STORAGE_PER_SALE
        // );

        let StakingArgs { staking_status } =
            near_sdk::serde_json::from_str(&msg).expect("Not valid StakingArgs");

        let contract_and_token_id = format!("{}{}{}", nft_contract_id, DELIMETER, token_id);

        self.staking_informations.insert(
            &contract_and_token_id,
            &StakeInfo {
                owner_id: owner_id.clone().into(),
                approval_id,
                token_id: token_id.clone(),
                nft_contract_id: nft_contract_id.clone(),
                created_at: env::block_timestamp() / 1000000,
            },
        );

        // extra for views

        let mut by_owner_id = self.by_owner_id.get(owner_id.as_ref()).unwrap_or_else(|| {
            UnorderedSet::new(
                StorageKey::ByOwnerIdInner {
                    account_id_hash: hash_account_id(owner_id.as_ref()),
                }
                .try_to_vec()
                .unwrap(),
            )
        });

        by_owner_id.insert(&contract_and_token_id);
        self.by_owner_id.insert(owner_id.as_ref(), &by_owner_id);

        let mut by_contract_id = self.by_contract_id.get(&nft_contract_id).unwrap_or_else(|| {
            UnorderedSet::new(
                StorageKey::ByContractIdInner {
                    account_id: nft_contract_id.clone(),
                    token_id: token_id.clone()
                }
                .try_to_vec()
                .unwrap(),
            )
        });

        by_contract_id.insert(&token_id);
        self.by_contract_id.insert(&nft_contract_id, &by_contract_id);
    }
}
