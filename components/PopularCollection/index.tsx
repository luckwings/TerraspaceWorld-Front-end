import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { SinglePopularCard } from '../SinglePopularCard';
import { LeftArrowIcon, RightArrowIcon } from '../Shared/SvgIcons';
import {
  Container,
  Header,
  TitleTabWrapper,
  TabWrapper,
  Tab,
  SliderWrapper,
  CarouselButtonGroup,
  ArrowButton
} from './styles';
import { getFeaturedCollections, getCollectionStats } from '../../utils/paraApi';
import { parseEther } from '../../utils/bignumber';

export const PopularCollection = () => {
  const [daySelected, setDaySelected] = useState<number | string>(1);
  const carouselRef = useRef<any>();

  const tabList = [
    { key: 1, name: '24 hrs' },
    { key: 7, name: '7 days' },
    { key: 30, name: '30 days' }
  ]

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3.5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3.5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [popularCollections, setPopularCollections] = useState<any[]>([]);

  const getPopularCollections = async () => {
    const collections = await getFeaturedCollections();
    const derivatives = await Promise.all(collections.map(async (data: any) => {
      const { collection: name, collection_id, media, socialMedia } = data;
      const { floor_price, total_card_sale, volume } = await getCollectionStats(collection_id);
      return {
        name,
        photo: `https://ipfs.io/ipfs/${media}`,
        social_media: socialMedia,
        floor_price: parseEther(floor_price),
        total_listed: total_card_sale,
        total_volume: parseEther(volume)
      }
    }))
    setPopularCollections(derivatives);
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
    getPopularCollections();
  }, []);

  return (
    <Container>
      <Header className='container'>
        <TitleTabWrapper>
          <h1>Popular Collections on PARAS</h1>
          <TabWrapper>
            {tabList.map((day, i) => (
              <Tab
                key={i}
                active={daySelected === day.key}
                onClick={() => setDaySelected(day.key)}
              >{day.name}</Tab>
            ))}
          </TabWrapper>
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
            {popularCollections.map((item, i) => (
              <SinglePopularCard key={i} card={item} />
            ))}
          </Carousel>
        </div>
      </SliderWrapper>
    </Container>
  )
}
