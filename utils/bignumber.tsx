import BigNumber from "bignumber.js";

export const BIG_TEN = new BigNumber(10);
export const formatEther = (amount: BigNumber | string | number, decimals: number = 24) => {
    return new BigNumber(amount).times(BIG_TEN.pow(decimals));
};

export const parseEther = (amount: BigNumber | string | number, decimals: number = 24) => {
    return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals)).toNumber();
};