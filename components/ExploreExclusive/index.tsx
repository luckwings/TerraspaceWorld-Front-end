import React, { useRef } from 'react';
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

const exploreList = [
  { name: 'Antisocial Ape Club', photo: '/assets/partners/asac.jpg', description: 'A collection of 3333 pixel art ape NFTs stored an the NEAR blockchain', para_link: "https://paras.id/collection/asac.near" },
  { name: 'Boo Monsters', photo: '/assets/partners/boomonsters.png', description: 'A limited collection of Boo Monsters roaming the blockchain', para_link: "https://paras.id/collection/boo-monster-by-omarbibznear" },
  { name: 'Mara Gen1', photo: '/assets/partners/mara.png', description: '1000 unique Mara holding one of these gives access to loads of benefits from MARADAO.', para_link: "https://paras.id/collection/mara-smartcontract.near" },
  { name: 'Nearnauts', photo: '/assets/partners/nearnaut.png', description: 'NEARNauts is a generative NFT project on the NEAR network consisting of 7777 randomly generated Nauts of varying rarity.', para_link: "https://paras.id/collection/nearnautnft.near" },
  { name: 'Mr. Brown', photo: '/assets/partners/mrbrown.jpeg', description: 'Mr. Brown is a middle-aged insurance clerk with 4,200 imagined identities living inside his head. He gets lost in them every day, sometimes even forgetting which one is real. Even though the mental borders between identities are thin, no two identities are alike. Each Mr. Brown is unique and stored on the NEAR blockchain.', para_link: "https://paras.id/collection/mrbrownproject.near" },
  { name: 'The Dons', photo: '/assets/partners/thedons.jpg', description: 'A collection of 3,500 Mafia Bosses coming to take over NEAR Protocol. Blood makes you related. Loyalty makes you family.', para_link: "https://paras.id/collection/nft.thedons.near" },
  { name: 'Monarchs By Haven', photo: '/assets/partners/haven.gif', description: 'Monarchs is a collection of 333 NFTs rewriting history on the NEAR Protocol.', para_link: "https://paras.id/collection/mint.havendao.near" }
]

export const ExploreExclusive = () => {
  const carouselRef = useRef<any>();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2.5,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2.5,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.3,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const goToNext = () => {
    const nextSlide = carouselRef.current.state.currentSlide + 1;
    carouselRef.current.goToSlide(nextSlide)
  }

  const gotToPrev = () => {
    const prevSlide = carouselRef.current.state.currentSlide - 1;
    carouselRef.current.goToSlide(prevSlide)
  }

  return (
    <Container>
      <Header className='container'>
        <TitleTabWrapper>
          <h1>Explore Our Exclusive Staking Partners</h1>
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
            {exploreList.map((item, i) => (
              <SingleExploreCard key={i} card={item} />
            ))}
          </Carousel>
        </div>
      </SliderWrapper>
    </Container>
  )
}
