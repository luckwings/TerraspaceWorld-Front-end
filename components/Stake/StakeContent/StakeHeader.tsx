import type { NextPage } from "next";
import Carousel from "react-multi-carousel";
import { HomeHero } from "../../HomeHero";
import { HomeHeroWrapper } from "../styles";

interface StakeHeaderProps {
  overviewStatus: number;
}

const farmsData = [
  {
    title: "Check For Terraspaces Or Partnered NFTs To Stake.",
    description: "Stake NFTs to access analytics and referral commission",
    list: [
      "Explore staking partners and stake their NFT to access dashboard.",
      "Tap-into the Refer-To-Earn program based an amount of staked NFTs.",
      "Earn up to $2000 upon successful referrals of new staking partners.",
      "Access our farm by staking specific NFTs to earn passive token emission.",
    ],
    button1: {
      title: "Live on PARAS",
      link: "https://paras.id/collection/terraspaces.near",
      _blank: true,
    },
    button2: {
      title: "Read Gitbook",
      link: "https://terraspaces.gitbook.io/",
      _blank: true,
    },
  },
  {
    title: "Stake To Access Dashboard And Referral Commission",
    description: "Payouts up to $2000 with 40 Terraspaces NFTs Staked",
    list: [
      "User-friendly analytical dashboard for listings, floor price and volume",
      "Earn referral-based commission with Terraspaces or Partnered NFTs.",
      "Terraspaces can earn maximum $2000 with 40 NFTs staked per referral.",
      "Staking Partners can earn maximum $1000 with 40 NFTs staked per referral.",
    ],
    button1: { title: "Make a Referral", link: "#", _blank: false },
    button2: { title: "Go to Dashboard", link: "/dashboard", _blank: false },
  },
  {
    title: "Refer-To-Earn Commission Via New Staking Partners.",
    description: "Stake multiple NFTs to boost your commission",
    list: [
      "Stake Terraspace NFTs to earn 5% commission from successful referrals.",
      "Stake Partnered NFTs to earn 2.5% commission frome successful referrals.",
      "Each NFT staked enables multiplier of 0.5x to boost commission.",
      "The maximum multiplier is capped st 40 NFTs staked per referral.",
    ],
    button1: {
      title: "Live on PARAS",
      link: "https://paras.id/collection/terraspaces.near",
      _blank: true,
    },
    button2: { title: "Read Gitbooks", link: "https://terraspaces.gitbook.io/", _blank: false },
  },
  
];
const heroData = [
  {
    title: "Explore NEAR Protocol's NFT Market With Ease!",
    description: "Discover popular NFT collections on NEAR",
    list: [
      "Explore staking partners and stake their NFT to access dashboard.",
      "Tap-into the Refer-To-Earn program based an amount of staked NFTs.",
      "Earn up to $2000 upon successful referrals of new staking partners.",
      "Access our farm by staking specific NFTs to earn passive token emission.",
    ],
    button1: {
      title: "Live on PARAS",
      link: "https://paras.id/collection/terraspaces.near",
      _blank: true,
    },
    button2: {
      title: "Read Gitbook",
      link: "https://terraspaces.gitbook.io/",
      _blank: true,
    },
  },
  {
    title: "Check For Terraspaces Or Partnered NFTs To Stake.",
    description: "Stake NFTs to access analytics and referral commission",
    list: [
      "Explore staking partners and stake their NFT to access dashboard.",
      "Tap-into the Refer-To-Earn program based an amount of staked NFTs.",
      "Earn up to $2000 upon successful referrals of new staking partners.",
      "Access our farm by staking specific NFTs to earn passive token emission.",
    ],
    button1: {
      title: "Live on PARAS",
      link: "https://paras.id/collection/terraspaces.near",
      _blank: true,
    },
    button2: {
      title: "Read Gitbook",
      link: "https://terraspaces.gitbook.io/",
      _blank: true,
    },
  },
];
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const StakeHeader: NextPage<StakeHeaderProps> = ({ overviewStatus }) => {
  return (
    <div>
      {overviewStatus !== 3 ? (
        <HomeHeroWrapper className="container">
          <HomeHero data={farmsData[overviewStatus]} />
        </HomeHeroWrapper>
      ) : (
        <HomeHeroWrapper className="container">
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            infinite={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="partner-container"
            showDots={true}
            ssr={true}
            autoPlay={true}
          >
            {heroData.map((item, i) => (
              <HomeHero key={i} data={item} />
            ))}
          </Carousel>
        </HomeHeroWrapper>
      )}
    </div>
  );
};