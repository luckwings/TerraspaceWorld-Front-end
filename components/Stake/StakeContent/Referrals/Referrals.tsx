import type { NextPage } from "next";
import { listItemSecondaryActionClasses } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { LeftArrowIcon, RightArrowIcon } from "../../../Shared/SvgIcons";
import { Container, VolumeWrapper, InfoCardWrapper } from "../../styles";
import { getNewCollections } from "../../../../utils/paraApi";

interface isNetworkSelectModalOpenProps {
  openModal: any;
}

export const Referrals: NextPage<isNetworkSelectModalOpenProps> = ({
  openModal
}) => {
  const carouselRef = useRef<any>();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4.5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.5,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [publications, setPublications] = useState<any[]>([]);

  const getPublications = async () => {
    const collections = await getNewCollections();
    setPublications(
      collections.map((collection: any) => ({
        name: collection.title,
        photo: `https://ipfs.io/ipfs/${
          collection.thumbnail.split("ipfs://")[1]
        }`,
      }))
    );
  };

  const goToNext = () => {
    const nextSlide = carouselRef.current.state.currentSlide + 1;
    carouselRef.current.goToSlide(nextSlide);
  };

  const gotToPrev = () => {
    const prevSlide = carouselRef.current.state.currentSlide - 1;
    carouselRef.current.goToSlide(prevSlide);
  };

  useEffect(() => {
    getPublications();
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-md-6 col-sm-12 col-sx-12 mt-20 mr-5">
          <div className="t-card p-20">
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
            <InfoCardWrapper className="row">
              <div className="col-sm-4">
                <VolumeWrapper>
                  <span className="title .text-18">Referral Comission: </span>
                  <span className="value"> 5%</span>
                </VolumeWrapper>
              </div>
              <div className="col-sm-4">
                <VolumeWrapper>
                  <span className="title .text-18">Your NFTs Staked: </span>
                  <span className="value"> 10</span>
                </VolumeWrapper>
              </div>
              <div className="col-sm-4">
                <VolumeWrapper>
                  <span className="title .text-18">Staking Multiplier: </span>
                  <span className="value"> 0.5</span>
                </VolumeWrapper>
              </div>
            </InfoCardWrapper>
            <div className="d-flex justify-content-between mt-40">
              <h5 className="t-14">New Staking Partner Fee: $2000 x 5%</h5>
              <div className="d-flex align-items-center">
                <h5 className="t-14 mr-5">Your NFTs Staked: 10 x 0.5</h5>
                {/* <Icon icon="akar-icons:circle-check" color='white' /> */}
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <h5 className="t-18">$100</h5>
              <div className="d-flex align-items-center">
                <h5 className="t-18 mr-5">5</h5>
                {/* <Icon icon="akar-icons:circle-check" color='white' /> */}
              </div>
            </div>
            <div className="d-flex justify-content-between mt-25">
              <h5 className="t-14">Referral Payout: $100 x 5</h5>
              <h5 className="t-14">Staking Multiplier Cap</h5>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <h5 className="t-18">$500</h5>
              <h5 className="t-18">40 NFTs</h5>
            </div>
            <button
              className="cmn-btn-1 f-18 radius-12 mt-35 col-5 w-100"
              onClick={() => openModal()}
            >
              <span>Make a Referral</span>
            </button>
          </div>
        </div>

        <div className="col-md-6 col-sm-12 col-sx-12 mt-20 mr-5">
          <div className="t-card p-20">
            <div className="d-flex align-items-center mt-20">
              <img
                className="-mr-20"
                src="assets/img/dashbaord/stakin-l.png"
                alt="terraspaces image"
                width={45}
                height={45}
              />
              <img
                className="-mr-20"
                src="assets/img/dashbaord/stakin-l.png"
                alt="terraspaces image"
                width={45}
                height={45}
              />
              <img
                className="-mr-20"
                src="assets/img/dashbaord/stakin-l.png"
                alt="terraspaces image"
                width={45}
                height={45}
              />
              <img
                className="-mr-20"
                src="assets/img/dashbaord/stakin-l.png"
                alt="terraspaces image"
                width={45}
                height={45}
              />
              <img
                className="-mr-20"
                src="assets/img/dashbaord/stakin-l.png"
                alt="terraspaces image"
                width={45}
                height={45}
              />
              <img
                className="-mr-20"
                src="assets/img/dashbaord/stakin-l.png"
                alt="terraspaces image"
                width={45}
                height={45}
              />
              <img
                className="mr-10"
                src="assets/img/dashbaord/stakin-l.png"
                alt="terraspaces image"
                width={45}
                height={45}
              />
              <h5 className="mr-5 letter-space-1 t-20">Staking Partners</h5>
              <img
                src="assets/img/icons/verified.svg"
                alt="verified"
                width={24}
                height={24}
              />
            </div>
            <InfoCardWrapper className="row">
              <div className="col-sm-4">
                <VolumeWrapper>
                  <span className="title .text-18">Referral Comission: </span>
                  <span className="value"> 5%</span>
                </VolumeWrapper>
              </div>
              <div className="col-sm-4">
                <VolumeWrapper>
                  <span className="title .text-18">Your NFTs Staked: </span>
                  <span className="value"> 10</span>
                </VolumeWrapper>
              </div>
              <div className="col-sm-4">
                <VolumeWrapper>
                  <span className="title .text-18">Staking Multiplier: </span>
                  <span className="value"> 0.5</span>
                </VolumeWrapper>
              </div>
            </InfoCardWrapper>
            <div className="d-flex justify-content-between mt-40">
              <h5 className="t-14">New Staking Partner Fee: $2000 x 5%</h5>
              <div className="d-flex align-items-center">
                <h5 className="t-14 mr-5">Your NFTs Staked: 10 x 0.5</h5>
                {/* <Icon icon="akar-icons:circle-check" color='white' /> */}
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <h5 className="t-18">$50</h5>
              <div className="d-flex align-items-center">
                <h5 className="t-18 mr-5">5</h5>
                {/* <Icon icon="akar-icons:circle-check" color='white' /> */}
              </div>
            </div>
            <div className="d-flex justify-content-between mt-25">
              <h5 className="t-14">Referral Payout: $50 x 5</h5>
              <h5 className="t-14">Staking Multiplier Cap</h5>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <h5 className="t-18">$250</h5>
              <h5 className="t-18">40 NFTs</h5>
            </div>
            <button
              className="cmn-btn-1 f-18 radius-12 mt-35 col-5 w-100"
              onClick={() => openModal()}
            >
              <span>Make a Referral</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Referrals;
