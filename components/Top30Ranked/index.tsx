import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { SingleExploreCard } from '../SingleExploreCard';
import { LeftArrowIcon, RightArrowIcon } from '../Shared/SvgIcons';
import {
  Container,
  Header,
  TitleTabWrapper,
  SliderWrapper,
  CarouselButtonGroup,
  ArrowButton
} from './styles';
import { SingleRankCard } from '../SingleRankCard';
import { getCollectionData, getCollectionStats, getHistoricalCollections, getTopCollections } from '../../utils/paraApi';
import { parseEther } from '../../utils/bignumber';

export const Top30Ranked = () => {
  const carouselRef = useRef<any>();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [top30Collections, setTop30Collections] = useState<any[]>([]);

  const getTop30Collections = async () => {

    const _collections = await getHistoricalCollections();
    console.log(_collections);
    const collections = await getTopCollections();
    const derivatives = await Promise.all(collections.map(async (data: any) => {
      const { collection_id } = data;
      const { floor_price, total_card_sale, volume } = await getCollectionStats(collection_id);
      const { collection: name, media, socialMedia } = await getCollectionData(collection_id);
      return {
        name,
        photo: `https://ipfs.io/ipfs/${media}`,
        social_media: socialMedia,
        floor_price: parseEther(floor_price),
        total_listed: total_card_sale,
        total_volume: parseEther(volume)
      }
    }))
    setTop30Collections(derivatives);
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
    getTop30Collections();
  }, []);

  return (
    <Container>
      <Header className='container'>
        <TitleTabWrapper>
          <h1>Top 30 Ranked Over Last 7 Days</h1>
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
          <div className='row'>
            <div className="col-md-4">
              {top30Collections.slice(0, 5).map((item, i) => (
                <SingleRankCard key={i} index={i + 1} card={item} />
              ))}
            </div>
            <div className="col-md-4">
              {top30Collections.slice(5, 10).map((item, i) => (
                <SingleRankCard key={i} index={i + 6} card={item} />
              ))}
            </div>
            <div className="col-md-4">
              {top30Collections.slice(10, 15).map((item, i) => (
                <SingleRankCard key={i} index={i + 11} card={item} />
              ))}
            </div>
          </div>
          <div className='row'>
            <div className="col-md-4">
              {top30Collections.slice(15, 20).map((item, i) => (
                <SingleRankCard key={i} index={i + 16} card={item} />
              ))}
            </div>
            <div className="col-md-4">
              {top30Collections.slice(20, 25).map((item, i) => (
                <SingleRankCard key={i} index={i + 21} card={item} />
              ))}
            </div>
            <div className="col-md-4">
              {top30Collections.slice(25, 30).map((item, i) => (
                <SingleRankCard key={i} index={i + 26} card={item} />
              ))}
            </div>
          </div>
        </Carousel>
      </SliderWrapper>
    </Container>
  )
}
