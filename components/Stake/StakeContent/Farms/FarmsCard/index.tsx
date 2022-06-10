import React from "react";
import { VerifiedIcon, LinkIcon } from "../../../../Shared/SvgIcons";
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Checkcircle } from "../../../../Shared/SvgIcons";
import {
  Container,
  DetailWrapper,
  InfoWrapper,
  InfoItem,
  SocialList,
  InfoCardWrapper,
  InfoCard,
  InnerContainer,
  VolumeWrapper,
} from "./styles";

interface FarmsCardProps {
  card?: any;
  index?: any;
}

const FarmsCard = (props: FarmsCardProps) => {
  const { card, index } = props;

  return (
    <Container>
      <InfoCard>
          <div className="d-flex align-items-center mt-20">
            <img
              className="mr-10"
              src="assets/img/dashbaord/stakin-l.png"
              alt="terraspaces image"
              width={45}
              height={45}
            />
            <h5 className="mr-5 letter-space-1 t-20">Terraspaces</h5>
            <img
              src="assets/img/icons/verified.svg"
              alt="verified"
              width={24}
              height={24}
            />
          </div>
          <div className="floor-c d-flex justify-content-between mt-10">
            <button type="button" className="floor-btn">
              Total Staked: 10
            </button>
            <button type="button" className="floor-btn">
              Your NFTs Staked: 2
            </button>
          </div>
          <div className="d-flex justify-content-between mt-40">
            <h6 className="t-14">NFT Type: Kryptonite</h6>
            <h6 className="t-14">Reward Tokens</h6>
          </div>
          <div className="d-flex justify-content-between mt-1">
            <img
              className="mr-10"
              src="assets/img/dashbaord/stakin-l.png"
              alt="terraspaces image"
              width={27}
              height={27}
            />
            <h6 className="t-18">$USN</h6>
          </div>
          <div className="d-flex justify-content-between mt-20">
            <h6 className="t-14">Rewards: Monthly</h6>
            <div className="d-flex align-items-center">
              <h6 className="t-14 mr-5">Automatic Airdrops</h6>
              <div className="ml-10">
                <Checkcircle />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-1">
            <h6 className="t-20">7 $USN: NFT</h6>
            <div className="d-flex align-items-center">
              <h6 className="t-14 mr-5">Dashboard Access</h6>
              <div className="ml-10">
                <Checkcircle />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-20">
            <h6 className="t-14">Total Supply</h6>
            <h6 className="t-14">Staking Cap</h6>
          </div>
          <div className="d-flex justify-content-between mt-1">
            <h6 className="t-20">777</h6>
            <h6 className="t-20">777</h6>
          </div>
          <div className="d-flex mt-30">
            <div className="col-6 pr-10">
              <button className="cmn-btn-1 f-18 radius-12 mt-10 col-6 w-100">
                <span>Stake</span>
              </button>
            </div>
            <div className="col-6 pl-10">
              <button className="cmn-btn-1 f-18 radius-12 mt-10 col-6 w-100 outline-btn">
                <span>Unstake</span>
              </button>
            </div>
          </div>
          <button className="cmn-btn-1 f-18 radius-12 mt-10 col-6 w-100">
            <span>Claim Rewards</span>
          </button>
      </InfoCard>
    </Container>
  );
};

export default FarmsCard;
