import React from 'react'
import { VerifiedIcon } from '../Shared/SvgIcons'
import {
  Container,
  ContentWrapper,
  InfoWrapper,
  InfoItem,
  DetailWrapper,
  VolumeWrapper,
  InfoCard
} from './styles'

interface SingleRankCardProps {
  card?: any;
  index?: any;
}

export const SingleRankCard = (props: SingleRankCardProps) => {
  const { card: collection, index } = props;

  return (
    <Container>
      <span>{index ?? 1}</span>
      <ContentWrapper>
        <DetailWrapper>
          <img draggable={false} src={collection?.photo} alt='' />
          <InfoWrapper>
            <InfoItem>
              <span>{collection?.name}</span>
              <VerifiedIcon />
            </InfoItem>
            <VolumeWrapper>
              <span className='title'>7 day volume:</span>
              <span className='value'>+15.30%</span>
            </VolumeWrapper>
          </InfoWrapper>
        </DetailWrapper>
        <div className='row'>
          <div className="col-md-4 col-sm-4">
            <InfoCard>
              <p className='title'>Floor Price</p>
              <p className='value'>{collection?.floor_price} N</p>
            </InfoCard>
          </div>
          <div className="col-md-4 col-sm-4">
            <InfoCard>
              <p className='title'>Listed</p>
              <p className='value'>{collection?.total_listed}</p>
            </InfoCard>
          </div>
          <div className="col-md-4 col-sm-4">
            <InfoCard>
              <p className='title'>Volume</p>
              <p className='value'>{collection?.total_volume.toFixed(2)} N</p>
            </InfoCard>
          </div>
        </div>
      </ContentWrapper>
    </Container>
  )
}