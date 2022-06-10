import moment from 'moment';
import React from 'react';
import { VerifiedIcon, LinkIcon, HeartIcon } from '../Shared/SvgIcons';
import {
  Container,
  InnerContainer,
  FooterWrapper,
  TitleWrapper,
  DateIconWrapper,
  DateBox,
  SocialList,
  FavoriteBox
} from './styles';

interface SingleExplorecardProps {
  card?: any;
}

export const SingleCommunityCard = (props: SingleExplorecardProps) => {
  const { card } = props;
  const {name, image_link, mint_date, discord, twitter, website} = card;
  return (
    <Container>
      <InnerContainer>
        <img draggable={false} src={image_link} alt='' />
        <FooterWrapper>
          <TitleWrapper>
            <h2>{name}</h2>
            <VerifiedIcon />
          </TitleWrapper>
          <div>
            <DateIconWrapper>
              <DateBox className='date-box'>{mint_date ? moment(mint_date).format('MMM DD | HH:mm') : "Coming soon" }</DateBox>
              <SocialList>
                <a href={discord || '#'} target='_blank' rel="noreferrer">
                  <img draggable={false} src='/assets/img/icons/discord.png' alt='' />
                </a>
                <a href={twitter || '#'} target='_blank' rel="noreferrer">
                  <img draggable={false} src='/assets/img/icons/twitter.png' alt='' />
                </a>
                <a href={website || '#'} target='_blank' rel="noreferrer">
                  <LinkIcon />
                </a>
              </SocialList>
            </DateIconWrapper>
            <FavoriteBox className='favorite-box'>
              <HeartIcon />
              <span>{card.vote_count}</span>
            </FavoriteBox>
          </div>
        </FooterWrapper>
      </InnerContainer>
    </Container>
  )
}
