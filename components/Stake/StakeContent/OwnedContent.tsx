import type { NextPage } from "next";
import { Container, VolumeWrapper, InfoCardWrapper } from "../styles";
import { X_PARAS_COLLECTIONS } from '../../../contexts/wallet';

interface OwnedContentProps {
    nftContractList: any;
    nftMetadata: any;
    trendingData: any;
    totalNftCountList: any;
    nftList: any;
    stakeList: any;
    onStake: any;
}

export const OwnedContent : NextPage<OwnedContentProps> = ({
    nftContractList,
    nftMetadata,
    trendingData,
    totalNftCountList,
    nftList,
    stakeList,
    onStake
}) => {
    return (
        <Container>
            {
                nftContractList.map((contract_id: any, contract_index: number) => (
                <div className="owned-r" key={contract_index}>
                {/* ---------------------------- */}
                    {/* <div className="stake-btn stake-btn-abs d-inline-block ">
                    <button className="cmn-btn-1 f-18 redius-12">
                        <span> Stake All </span>
                    </button>
                    </div> */}
                {/* ---------------------------- */}

                <div className="navs-title d-flex justify-content-between align-items-center">
                    <div >
                    <div className="d-flex align-items-center mb-12">
                        <div className="stking-icon mr-12">
                        <img className="mr-8" src={"assets/icons/" + contract_id + ".png"} alt="Near" width={32} height={32} loading="lazy" />
                        </div>
                        <div className="hero-subs-t d-flex align-items-center">
                        <h3 className="t-20 white-c mr-8">
                            <span>{nftMetadata.get(contract_id) != undefined ? nftMetadata.get(contract_id)?.name : contract_id}</span>
                        </h3>
                        <img src="assets/img/icons/verified.svg" width="20" height="20" alt="verified" />
                        </div>
                    </div>
                    <div className="floor-c d-flex">
                        <button type="button" className="floor-btn mr-16">Floor : {trendingData[contract_id]?.floor_price}N</button>
                        <button type="button" className="floor-btn">
                        Total Floor Value :
                        {trendingData[contract_id]?.floor_price * (totalNftCountList.get(contract_id) ?? 0)}N</button>
                    </div>
                    </div>
                    <div>
                    <button className="cmn-btn-1 f-18 redius-12">
                        <span> Stake All </span>
                    </button>
                    </div>
                </div>
                <div className="my-22 hr-line">
                
                </div>
                <div className="t-card-wrapper">
                    <div className="row">
                    {
                        nftList.get(contract_id)?.map((nftData: any, key: number) => {
                        if (stakeList.get(contract_id)?.includes(nftData.token_id))
                            return (
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-60" key={key}>
                                <div className="t-card">
                                <div className="t-card-img  mb-12">
                                    <img className="stake-img" src={X_PARAS_COLLECTIONS.includes(contract_id) ? ("https://ipfs.fleek.co/ipfs/" + nftData.metadata.media) : (nftData.metadata.media?.startsWith('http') ? nftData.metadata.media : (nftMetadata.get(contract_id)?.base_uri + '/' + nftData.metadata.media))} alt="staking" loading="lazy" />
                                </div>
                                <div className="t-card-title">
                                    <h5 className="t-18-b white-c">{nftData.metadata.title}</h5>
                                </div>
                                <div className="stake-s-v mt-30">
                                    <div className="d-flex align-items-center mb-12">
                                    <div className="stking-icon mr-12">
                                        <img className="mr-8" src={"assets/icons/" + contract_id + ".png"} alt="Near" width={32} height={32} loading="lazy" />
                                    </div>
                                    <div className="hero-subs-t d-flex align-items-center">
                                        <h3 className="t-14 neutral-c  mr-8">
                                        <span>{nftMetadata.get(contract_id)?.name}</span>
                                        </h3>
                                        <img src="assets/img/icons/verified.svg" alt="verified" />
                                    </div>
                                    </div>
                                </div>
                                <div className="stake-btn mt-20">
                                    <button className="cmn-btn-1 h-48 f-18 redius-12" onClick={() => { onStake(contract_id, nftData.token_id) }}>
                                    <span> stake </span>
                                    </button>
                                </div>
                                </div>
                            </div>
                            )
                        })
                    }
                    </div>
                </div>
                </div>
            ))
            }
        </Container>
    )
}