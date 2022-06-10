import React from "react";
import { LinkIcon, VerifiedIcon } from "../Shared/SvgIcons";
import {
  Container,
  ContentWrapper,
  InfoWrapper,
  InfoCardWrapper,
  InfoItem,
  DetailWrapper,
  VolumeWrapper,
  InfoCard,
  Title,
  LinkIconbar,
  Letter,
} from "./styles";
import {
  LinkdinIcon,
  Accountplus,
  Circledolar,
} from "../../components/Shared/SvgIcons";
import { TextField } from "@mui/material";
import { textAlign } from "@mui/system";

interface UpcomingDropsCardProps {
  card?: any;
  index?: any;
}

export const UpcomingDropsCard = (props: UpcomingDropsCardProps) => {
  const { card: collection, index } = props;

  return (
    <div>
      <Container>
        <div className="row">
          <div className="col-md-4 drop-card-image">
            <img src="./assets/partners/haven.gif" width={"100%"} height={"100%"} alt="" />
          </div>
          <div className="col-md-8">
            <Title>
              <div className="row">
                <h3>Monarchs By Haven</h3>
              </div>
            </Title>
            <LinkIconbar>
              <a>
                <img
                  draggable={false}
                  src="/assets/img/icons/discord.png"
                  alt=""
                />
              </a>
              <a>
                <img
                  draggable={false}
                  src="/assets/img/icons/twitter.png"
                  alt=""
                />
              </a>
              <a>
                <LinkIcon />
              </a>
            </LinkIconbar>
            <Letter>
              Explore staking partners and stake their NFT to access dashbaord.
              Explore staking partners and stake thier NFT to access dashbaord.
              Explore staking partners and stake their NFT to access dashboard.
            </Letter>
            <div className="flex-container info-padding">
              <div className="inline">
                <div className="inline-item item-left ">
                  <div>Mint Price</div>
                  <div>7 <img src="./assets/img/icons/volume.png" width={"20%"} height={"20%"} alt="" /></div>
                </div>
                <div className="inline-item item-right ">
                  <div>Mint Date</div>
                  <div>20 May 2022</div>
                </div>
              </div>
              <div className="inline">
                <div className="inline-item item-left ">
                  <div>Supply</div>
                  <div>700 NFTs</div>
                </div>
                <div className="inline-item item-right ">
                  <div>Mint Time</div>
                  <div>16:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
