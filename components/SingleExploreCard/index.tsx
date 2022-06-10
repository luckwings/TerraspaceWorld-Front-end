import React from 'react';
import Link from 'next/link';
import { VerifiedIcon } from '../Shared/SvgIcons';
import {
  Container,
  InnerContainer,
  FooterWrapper,
  TitleWrapper,
  Description,
  ButtonWrapper
} from './styles';

interface SingleExplorecardProps {
  card?: any;
}

export const SingleExploreCard = (props: SingleExplorecardProps) => {
  const { card } = props;

  return (
    <Container>
      <InnerContainer>
        <img draggable={false} src={card?.photo} alt='' />
        <FooterWrapper>
          <TitleWrapper>
            <h2>{card?.name}</h2>
            <VerifiedIcon />
          </TitleWrapper>
          <Description>{card?.description}</Description>
          <ButtonWrapper>
            <button className='primary-btn'>
              <a href={card?.para_link} target="_blank" rel='noreferrer' style={{ color: "white" }}>
                <span>View on PARAS</span>
              </a>
            </button>
            <button className='primary-btn-naked'>
              <Link href="/stake">
                <span>Stake Your NFTs</span>
              </Link>
            </button>
          </ButtonWrapper>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
