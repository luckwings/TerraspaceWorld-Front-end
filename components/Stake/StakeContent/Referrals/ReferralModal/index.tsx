import React from "react";
import { Icon } from "@iconify/react";
import {
  ModalContainer,
  BodyContainer,
  IconContent,
  TimelineContent,
  DetailContent,
  ModalInput,
  InputContent,
} from "./styles";

const ReferralModal = () => {
  return (
    <ModalContainer>
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="t-36">Make New Referral</h1>
        <button className="cmn-btn-1 f-18 radius-12 p-15">
          <span className="mr-5">Wallet</span>
          <img src="assets/img/icons/Wallet1.svg" alt="wallet" />
        </button>
      </div>
      <BodyContainer className="row">
        <div className="col-md-4 col-xs-12">
          <div className="d-flex align-items-center">
            <img
              className="mr-10"
              src="assets/img/dashbaord/stakin-l.png"
              alt="terraspaces image"
              width={42}
              height={42}
            />
            <h5 className="mr-5 letter-space-1 t-20">Terraspaces</h5>
            <img
              src="assets/img/icons/verified.svg"
              alt="verified"
              width={24}
              height={24}
            />
          </div>
          <h4 className="mt-20">How it works</h4>
          <div className="timeline">
            <TimelineContent>
              <div className="d-flex align-items-center mt-30">
                <IconContent>
                  <Icon
                    icon="icon-park-outline:mail-review"
                    color="white"
                    width="22"
                    height="22"
                  />
                </IconContent>
                <div>
                  <p className="text-18 bold">Share Form Link</p>
                  <p className="text-14 mt-10">
                    Invite new collections as partners by sharing the
                    application form.
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center mt-30">
                <IconContent>
                  <Icon
                    icon="akar-icons:link-chain"
                    color="white"
                    width="22"
                    height="22"
                  />
                </IconContent>
                <div>
                  <p className="text-18 bold">Share Referral Wallet</p>
                  <p className="text-14 mt-10">
                    Share this connected wallet as your referral link with new
                    collection.
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center mt-30">
                <IconContent>
                  <Icon
                    icon="icons8:add-user"
                    color="white"
                    width="22"
                    height="22"
                  />
                </IconContent>
                <div>
                  <p className="text-18 bold">Submit Referral</p>
                  <p className="text-14 mt-10">
                    Submit new referral once application form and wallet is
                    shared.
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center mt-30">
                <IconContent>
                  <Icon
                    icon="ant-design:dollar-circle-outlined"
                    color="white"
                    width="22"
                    height="22"
                  />
                </IconContent>
                <div>
                  <p className="text-18 bold">Earn $USN Rewards</p>
                  <p className="text-14 mt-10">
                    Get $USN rewards after approved collection has applied and
                    onboarded.
                  </p>
                </div>
              </div>
            </TimelineContent>
          </div>
        </div>
        <div className="col-md-8 col-xs-12">
          <DetailContent>
            <div className="floor-c row value-group">
              <div className="col-md-4 col-xs-12 p-1">
                <button type="button" className="floor-btn">
                  Referral Commission: 5%
                </button>
              </div>
              <div className="col-md-4 col-xs-12 p-1">
                <button type="button" className="floor-btn">
                  Your NFTs Staked: 10
                </button>
              </div>
              <div className="col-md-4 col-xs-12 p-1">
                <button type="button" className="floor-btn">
                  Staking Multiplier: 0.5
                </button>
              </div>
            </div>
            <div className="row mt-30">
              <div className="col-md-3 col-xs-6 p-1">
                <p className="text-14 font-light">Submitted Referrals</p>
                <p className="text-18 bold mt-1">5</p>
              </div>
              <div className="col-md-3 col-xs-6 p-1">
                <p className="text-14 font-light">Pending Referrals</p>
                <p className="text-18 bold mt-1">3</p>
              </div>
              <div className="col-md-3 col-xs-6 p-1">
                <p className="text-14 font-light">Approved Referrals</p>
                <p className="text-18 bold mt-1">2</p>
              </div>
              <div className="col-md-3 col-xs-6 p-1">
                <p className="text-14 font-light">Amount Earned</p>
                <p className="text-18 bold mt-1">$500</p>
              </div>
            </div>
            <div className="floor-c row mt-20">
              <div className="col-md-6 col-xs-12 p-1">
                <p className="text-16">Your Referral Wallet</p>
                <InputContent>
                  <ModalInput placeholder="zerotime.near" />
                  <Icon icon="bx:copy" color="#a194bb" width="22" height="22" />
                </InputContent>
              </div>
              <div className="col-md-6 col-xs-12 p-1">
                <p className="text-16">Your Referral Link</p>
                <InputContent>
                  <ModalInput placeholder="https://terrspaces.io/apply" />
                  <Icon icon="bx:copy" color="#a194bb" width="22" height="22" />
                </InputContent>
              </div>
            </div>
            <div className="floor-c row mt-20 p-1">
              <p className="text-16 p-1">Collection Name*</p>
              <InputContent>
                <ModalInput placeholder="Enter collection name" />
              </InputContent>
            </div>
            <label className="checkbox-container mt-20">
              <input type="checkbox" />
              I have shared the application form and referral wallet to invited
              collection.
              {/* <span className="checkmark" /> */}
            </label>
            <button className="cmn-btn-1 f-18 radius-12 w-100 mt-50">
              <span>Submit Referral</span>
            </button>
            <p className="text-14 p-1">
              Note: You may only submit once every 24 hours.
            </p>
          </DetailContent>
        </div>
      </BodyContainer>
    </ModalContainer>
  );
};

export default ReferralModal;
