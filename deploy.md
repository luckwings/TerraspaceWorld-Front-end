near create-account terraspaces.near --masterAccount xuguangxia.near --initialBalance 8

near create-account terraspaces-staking.near --masterAccount xuguangxia.near --initialBalance 5

near deploy --accountId terraspaces.near --wasmFile out/nft.wasm --initFunction new --initArgs '{"owner_id": "xuguangxia.near"}' --initGas '300000000000000'

near deploy --accountId terraspaces-staking.near --wasmFile out/terraspace_staking.wasm --initFunction new --initArgs '{"owner_id": "xuguangxia.near"}' --initGas '300000000000000'
