import React from 'react';
import { VerifiedIcon, LinkIcon } from '../Shared/SvgIcons';
import {
  Container,
  DetailWrapper,
  InfoWrapper,
  InfoItem,
  SocialList,
  InfoCardWrapper,
  InfoCard,
  InnerContainer
} from './styles';

interface SinglePopularCardProps {
  card?: any;
}

export const SinglePopularCard = (props: SinglePopularCardProps) => {
  const { card } = props;
  const { name, photo, social_media, floor_price, total_volume, total_listed } = card;
  const { discord, twitter, website } = social_media;

  return (
    <Container>
      <InnerContainer>
        <DetailWrapper>
          <img draggable={false} src={photo} alt='' />
          <InfoWrapper>
            <InfoItem>
              <span>{name}</span>
              <VerifiedIcon />
            </InfoItem>
            <SocialList>
              <a href={discord ? `https://discord.gg/${discord}` : "#"} target='_blank' rel="noreferrer">
                <img draggable={false} src='/assets/img/icons/discord.png' alt='' />
              </a>
              <a href={twitter ? `https://twitter.com/${twitter}` : "#"} target='_blank' rel="noreferrer">
                <img draggable={false} src='/assets/img/icons/twitter.png' alt='' />
              </a>
              <a href={website || "#"} target='_blank' rel="noreferrer">
                <LinkIcon />
              </a>
            </SocialList>
          </InfoWrapper>
        </DetailWrapper>
        <InfoCardWrapper className='row'>
          <div className="col-md-4">
            <InfoCard>
              <p>Floor</p>
              <p>{floor_price}</p>
            </InfoCard>
          </div>
          <div className="col-md-4">
            <InfoCard>
              <p>Volume</p>
              <p>{total_volume.toFixed(2)}</p>
            </InfoCard>
          </div>
          <div className="col-md-4">
            <InfoCard>
              <p>Listing</p>
              <p>{total_listed}</p>
            </InfoCard>
          </div>
        </InfoCardWrapper>
      </InnerContainer>
    </Container>
  )
}
