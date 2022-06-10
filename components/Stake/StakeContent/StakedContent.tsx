import type { NextPage } from "next";
import { Container, VolumeWrapper, InfoCardWrapper } from "../styles";
import { X_PARAS_COLLECTIONS } from "../../../contexts/wallet";

interface StakedContentProps {
  nftContractList: any;
  nftMetadata: any;
  trendingData: any;
  stakedNftCountList: any;
  nftList: any;
  stakeList: any;
  onUnstake: any;
}

export const StakedContent: NextPage<StakedContentProps> = ({
  nftContractList,
  nftMetadata,
  trendingData,
  stakedNftCountList,
  nftList,
  stakeList,
  onUnstake,
}) => {
  return (  
    <Container>
      {nftContractList.map((contract_id: any, contract_index: any) => (
        <div className="owned-r" key={contract_index}>
          <div className="navs-title">
            <div>
              <div className="d-flex align-items-center mb-12">
                <div className="stking-icon mr-12">
                  <img className="mr-8 radius-35 border-white" src={"assets/icons/" + contract_id + ".png"} alt="Near" width={45} height={45} loading="lazy" />
                </div>
                <div className="hero-subs-t d-flex align-items-center">
                  <h3 className="t-20 white-c mr-8">
                    <span>
                      {nftMetadata.get(contract_id) != undefined
                        ? nftMetadata.get(contract_id)?.name
                        : contract_id}
                    </span>
                  </h3>
                  <img src="assets/img/icons/verified.svg" width="24" height="24" alt="verified" />
                </div>
              </div>
              <div className="floor-c d-flex">
                <button type="button" className="floor-btn mr-16">
                  Floor : {trendingData[contract_id]?.floor_price}N
                </button>
                <button type="button" className="floor-btn">
                  Total Floor Value :{" "}
                  {trendingData[contract_id]?.floor_price *
                    (stakedNftCountList.get(contract_id) ?? 0)}
                  N
                </button>
              </div>
            </div>
            <button className="cmn-btn-1 f-18 radius-12 mt-10">
              <span> Unstake All </span>
            </button>
          </div>
          <div className="my-22 hr-line"> </div>
          <div className="t-card-wrapper">
            <div className="row">
              {nftList.get(contract_id)?.map((nftData: any, key: any) => {
                if (stakeList.get(contract_id)?.includes(nftData.token_id))
                  return (
                    <div
                      className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-60"
                      key={key}
                    >
                      <div className="t-card">
                        <div className="t-card-img  mb-12">
                          <img className="stake-img" src={
                              X_PARAS_COLLECTIONS.includes(contract_id)
                                ? "https://ipfs.fleek.co/ipfs/" +
                                  nftData.metadata.media
                                : nftData.metadata.media?.startsWith("http")
                                ? nftData.metadata.media
                                : nftMetadata.get(contract_id)?.base_uri +
                                  "/" +
                                  nftData.metadata.media
                            } alt="staking" loading="lazy" />
                        </div>
                        <div className="t-card-title">
                          <h5 className="t-18-b white-c">
                            {nftData.metadata.title}
                          </h5>
                        </div>
                        <div className="stake-s-v mt-10">
                          <div className="d-flex align-items-center mb-12">
                            <div className="stking-icon mr-12">
                              <img className="mr-8 radius-35" src={"assets/icons/" + contract_id + ".png"} alt="Near" width={32} height={32} loading="lazy" />
                            </div>
                            <div className="hero-subs-t d-flex align-items-center">
                              <h3 className="t-14 neutral-c  mr-8">
                                <span>
                                  {nftMetadata.get(contract_id)?.name}
                                </span>
                              </h3>
                              <img src="assets/img/icons/verified.svg" alt="verified" />
                            </div>
                          </div>
                        </div>
                        <div className="stake-btn mt-20">
                          <button
                            className="cmn-btn-1 h-48 f-18 radius-12 w-100"
                            onClick={() => {
                              onUnstake(contract_id, nftData.token_id);
                            }}
                          >
                            <span>Unstake</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      ))}
    </Container>      
  );
};