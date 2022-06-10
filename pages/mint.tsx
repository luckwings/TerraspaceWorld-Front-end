import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { WalletContext, NFT_CONTRACT_ID, MAX_GAS } from '../contexts/wallet'
import { useContext, useEffect, useState } from 'react'
import { parseNearAmount } from 'near-api-js/lib/utils/format'

const Mint: NextPage = () => {
    const { wallet, signIn } = useContext(WalletContext)
    const [nftSupply, setNftSupply] = useState(0);

    const onWallet = async () => {
        signIn();
    }

    const onMint = async () => {
        const contributor_0: String[] = await wallet?.account().viewFunction(NFT_CONTRACT_ID, "get_contributor_0");
        const contributor_4 = await wallet?.account().viewFunction(NFT_CONTRACT_ID, "get_contributor_4");
        const contributor_7 = await wallet?.account().viewFunction(NFT_CONTRACT_ID, "get_contributor_7");

        let mint_price = "9";
        if (contributor_0.includes(wallet?.getAccountId())) {
            mint_price = "0";
        }
        else if (contributor_4.includes(wallet?.getAccountId())) {
            mint_price = "4";
        }
        else if (contributor_7.includes(wallet?.getAccountId())) {
            mint_price = "7";
        }

        await wallet?.account().functionCall(
            NFT_CONTRACT_ID,
            "nft_mint",
            {
            },
            MAX_GAS,
            parseNearAmount(mint_price)
        )
    }

    const updateNftSupply = async () => {
        const supply = await wallet?.account().viewFunction(NFT_CONTRACT_ID, "nft_total_supply");
        setNftSupply(supply);
    }

    useEffect(() => {
        if (wallet && wallet.isSignedIn())
            updateNftSupply();
    }, [wallet]);

    useEffect(() => {
        if (wallet && wallet.isSignedIn())
            updateNftSupply();
    }, []);

    return (
        <main className="mint-page position-relative fix">
            <section className="mint-area pt-100">
                <div className="container">
                    <div className="mint-wrapper">
                        <div className="row f-row-reverse ">
                            <div className="col-lg-5 col-xl-5 d-flex align-items-center pb-30">
                                <div className="mint-info">
                                    <div className="mint-t pb-25">
                                        <h3 className="t-30 white-c">Mint NFT</h3>
                                    </div>
                                    <div className="mint-c pb-20">
                                        <p className="t-16">
                                            Generative dystopian NFTs meet utility via proof-of-staking to access analytics dashboard. Genesis collection of 777 abstract #NFTs. Powered by #NEARProtocol
                                        </p>
                                    </div>
                                    <div className="mint-c pb-20">
                                        <h5 className="t-20">
                                            First Landmark Project on NEAR.
                                        </h5>
                                    </div>

                                    <div className="mint-c pb-20">
                                        <p className="t-16">
                                            WL Mint Price: <a target="_blank" rel="noreferrer" href="https://discord.gg/terraspaces">Check Discord</a>

                                        </p>
                                        <p className="t-16"> Mint Price: 9N</p>
                                    </div>
                                    <div className="mint-c ">
                                        <h5 className="t-20">
                                            {nftSupply}/777 Minted
                                        </h5>
                                    </div>
                                    <div className="d-inline-block pt-45">
                                        {
                                            wallet?.isSignedIn() ?
                                                <button className="cmn-btn redius-12 f-18" onClick={onMint}>
                                                    <span>Mint</span>
                                                </button>
                                                :
                                                <button className="cmn-btn redius-12 f-18" onClick={onWallet}>
                                                    <span>Connect Wallet</span>
                                                    <img src="assets/img/icons/Wallet1.svg" alt="wallet" />
                                                </button>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-7 col-xl-6 offset-xl-1  text-center pb-30">
                                <div className="stak-img text-center">
                                    <img src="assets/img/mint/mint.png" alt="mint" loading="lazy" />
                                    <div className="stak-img-abs">
                                        <img src="assets/img/vector/vector2.png" alt="Vector" loading="lazy" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vector-abs">
                    <img src="assets/img/vector/Vector.png" alt="Vector" loading="lazy" />
                </div>
            </section>
        </main>
    )
}

export default Mint
