// Welcome to the Mass Key Deletion recipe.

const nearAPI = require("near-api-js"); // imports near api js

// Standard setup to connect to NEAR While using Node
const { keyStores, KeyPair, connect } = nearAPI;
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
let config;

// STEP 2 Choose your configuration.
// set this variable to either "testnet" or "mainnet"
// if you haven't used this before use testnet to experiment so you don't lose real tokens by deleting all your access keys
const configSetting = "mainnet";

const GAS_FOR_NFT_APPROVE = "20000000000000";
const GAS_FOR_RESOLVE_TRANSFER = "10000000000000";
const GAS_FOR_NFT_TRANSFER = "30000000000000";
const MAX_GAS = "300000000000000";
const DEPOSIT = "450000000000000000000";

// setting configuration based on input
switch (configSetting) {
  case "mainnet":
    config = {
      networkId: "mainnet",
      keyStore, // optional if not signing transactions
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://explorer.mainnet.near.org",
    };
    console.log("configuration set to mainnet ");

    break;

  case "testnet":
    config = {
      networkId: "testnet",
      keyStore, // optional if not signing transactions
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    console.log("configuration set to testnet ");
    break;
  default:
    console.log(`please choose a configuration `);
}

const STAKING_CONTRACT_ID = "terraspaces-staking.near";
const NFT_CONTRACT_ID = "terraspaces.near";
const KOKUMO_CONTRACT_ID = "kokumokongz.near"

const Test = async () => {
  //Load Your Account
  const near = await connect(config);

  // STEP 4 enter your mainnet or testnet account name here!
  const account = await near.account("xuguangxia.near");

  let result;

  // result = await account.getAccessKeys();
  // let tokenKeyExist = false;
  // for (let i = 0; i < result.length; i++) {
  //  if (result[i].access_key.permission != 'FullAccess' && result[i].access_key.permission.FunctionCall.receiver_id == NFT_CONTRACT_ID) {
  //   tokenKeyExist = true;
  //   break;
  //  }
  // }
  // if (tokenKeyExist == false) {
  //  console.log("Adding AccessKey to Token");
  //  const keyPair = KeyPair.fromRandom("ed25519");
  //  const publicKey = keyPair.publicKey.toString();
  //  await keyStore.setKey(config.networkId, publicKey, keyPair);
  //  await account.addKey(publicKey, NFT_CONTRACT_ID, [], '250000000000000000000000');
  // }

  // result = await account.viewFunction(
  //   NFT_CONTRACT_ID,
  //   "nft_tokens",
  //   {
  //     from_index: "775",
  //     limit: 1,
  //   },
  //   MAX_GAS
  // );
  // console.log("ContractMetadata:", result);

  // result = await account.viewFunction(
  //   "x.paras.near",
  //   "nft_token",
  //   {
  //     token_id: "240718:1",
  //   }
  // );

  // console.log(result);

  // result = await account.functionCall({
  //   contractId: NFT_CONTRACT_ID,
  //   methodName: "update_nftmetadata",
  //   args: {
  //   },
  //   gas: MAX_GAS,
  // });
  // console.log("updated");

  // result = await account.functionCall({
  //   contractId: NFT_CONTRACT_ID,
  //   methodName: "init_whitelist_2",
  //   args: {
  //   },
  //   gas: MAX_GAS,
  // });
  // console.log("init 2");

  // result = await account.functionCall({
  //   contractId: NFT_CONTRACT_ID,
  //   methodName: "init_whitelist_3",
  //   args: {
  //   },
  //   gas: MAX_GAS,
  // });
  // console.log("init 3");

  // result = await account.functionCall({
  //   contractId: NFT_CONTRACT_ID,
  //   methodName: "init_whitelist_4",
  //   args: {
  //   },
  //   gas: MAX_GAS,
  // });
  // console.log("init 4");

  // result = await account.functionCall({
  //   contractId: NFT_CONTRACT_ID,
  //   methodName: "init_whitelist_5",
  //   args: {
  //   },
  //   gas: MAX_GAS,
  // });
  // console.log("init 5");

  // result = await account.functionCall({
  //   contractId: NFT_CONTRACT_ID,
  //   methodName: "init_whitelist_6",
  //   args: {
  //   },
  //   gas: MAX_GAS,
  // });
  // console.log("init 6");

  // result = await account.functionCall({
  //   contractId: NFT_CONTRACT_ID,
  //   methodName: "init_whitelist_7",
  //   args: {
  //   },
  //   gas: MAX_GAS,
  // });
  // console.log("init 7");

  result = await account.functionCall({
    contractId: STAKING_CONTRACT_ID,
    methodName: "append_observe_id",
    args: {
      nft_contract_id: "mrbrownproject.near"
    },
    gas: MAX_GAS,
  });
  console.log("add observe");

  result = await account.functionCall({
    contractId: STAKING_CONTRACT_ID,
    methodName: "append_nft_contract_id",
    args: {
      nft_contract_id: "mrbrownproject.near"
    },
    gas: MAX_GAS,
  });
  console.log("add partner");

};

Test();
