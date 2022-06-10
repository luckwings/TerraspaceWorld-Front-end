import React from 'react';
import { VerifiedIcon, LinkIcon } from '../Shared/SvgIcons';
import {
  Container,
  InnerContainer,
  FooterWrapper,
  TitleWrapper,
  SocialList
} from './styles';

interface SingleCollectionCardProps {
  card?: any;
}

export const SingleCollectionCard = (props: SingleCollectionCardProps) => {
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
          <SocialList>
            <a href='https://discord.com' target='_blank' rel="noreferrer">
              <img draggable={false} src='/assets/img/icons/discord.png' alt='' />
            </a>
            <a href='https://twitter.com' target='_blank' rel="noreferrer">
              <img draggable={false} src='/assets/img/icons/twitter.png' alt='' />
            </a>
            <a href='https://twitter.com' target='_blank' rel="noreferrer">
              <LinkIcon />
            </a>
          </SocialList>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
