import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { LeftArrowIcon, RightArrowIcon } from '../Shared/SvgIcons';
import { SingleMarketCapCard } from '../SingleMarketCapCard';
import {
  Container,
  Header,
  TitleTabWrapper,
  SliderWrapper,
  CarouselButtonGroup,
  ArrowButton
} from './styles';
import { getHistoricalCollections, getNearPrice } from '../../utils/paraApi';

export const TopMarketCap = () => {
  const carouselRef = useRef<any>();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4.5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.5,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [topMCAPCollections, setTopMCAPCollections] = useState<any[]>([]);

  const getTopMCAPCollections = async () => {
    const near_usd_value = await getNearPrice();
    const collections = await getHistoricalCollections();
    const derivatives = collections.sort((a: any, b: any) => b.est_market_cap - a.est_market_cap).slice(0, 10).map((data: any) => {
      const { collection_info, est_market_cap } = data;
      const { collection_name, media, discord, twitter, website } = collection_info;
      return {
        name: collection_name,
        photo: media,
        social_media: { discord, twitter, website },
        est_market_cap: est_market_cap * near_usd_value
      }
    })
    setTopMCAPCollections(derivatives);
  }

  const goToNext = () => {
    const nextSlide = carouselRef.current.state.currentSlide + 1;
    carouselRef.current.goToSlide(nextSlide)
  }

  const gotToPrev = () => {
    const prevSlide = carouselRef.current.state.currentSlide - 1;
    carouselRef.current.goToSlide(prevSlide)
  }

  useEffect(() => {
    getTopMCAPCollections();
  }, [])

  return (
    <Container>
      <Header className='container'>
        <TitleTabWrapper>
          <h1>Top marketcap Projects</h1>
        </TitleTabWrapper>
        <CarouselButtonGroup>
          <ArrowButton onClick={gotToPrev}>
            <LeftArrowIcon />
          </ArrowButton>
          <ArrowButton onClick={goToNext} active={true}>
            <RightArrowIcon />
          </ArrowButton>
        </CarouselButtonGroup>
      </Header>
      <SliderWrapper className='container'>
        <div>
          <Carousel
            ref={(el) => (carouselRef.current = el)}
            swipeable={true}
            draggable={true}
            responsive={responsive}
            infinite={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", 'desktop']}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="partner-container"
            showDots={false}
            arrows={false}
            autoPlay={true}
            ssr={true}
          >
            {topMCAPCollections.map((item, i) => (
              <SingleMarketCapCard key={i} card={item} />
            ))}
          </Carousel>
        </div>
      </SliderWrapper>
    </Container>
  )
}
