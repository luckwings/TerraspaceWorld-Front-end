import Link from "next/link";
import {
  VerifiedIcon,
  CheckedIcon,
  LinkIcon,
  SoundIcon,
} from "../Shared/SvgIcons";
import {
  ExploreNearWrapper,
  TextWrapper,
  TerraSpaceWrapper,
  CheckListWrapper,
  CheckItem,
  ButtonWrapper,
  ImageWrapper,
  ImageContent,
  DetailInfoWrapper,
  DetailLeftWrapper,
  InfoWrapper,
  InfoItem,
  DetailRightWrapper,
} from "./styles";

interface HomeHeroProps {
  data?: any;
}

export const HomeHero = (props: HomeHeroProps) => {
  const { data } = props;

  return (
    <ExploreNearWrapper>
      <TextWrapper>
        <TerraSpaceWrapper>
          <span>Terraspaces</span>
          <VerifiedIcon />
        </TerraSpaceWrapper>
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <CheckListWrapper className="row">
          {data?.list.map((item: any, i: number) => (
            <div className="col-md-6 col-sm-6 col-12" key={i}>
              <CheckItem>
                <CheckedIcon />
                <p>{item}</p>
              </CheckItem>
            </div>
          ))}
        </CheckListWrapper>
        <ButtonWrapper>
          {data.button1._blank ? (
            <button className="primary-btn">
              <a
                href={data.button1.link}
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                <span>{data.button1.title}</span>
              </a>
              <SoundIcon />
            </button>
          ) : (
            <button className="primary-btn">
              <Link href={data.button1.link}>
                <span>{data.button1.title}</span>
              </Link>
              <SoundIcon />
            </button>
          )}
          {data.button2._blank ? (
            <button className="primary-btn-naked">
              <a
                href={data.button2.link}
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                <span>{data.button2.title}</span>
              </a>
            </button>
          ) : (
            <button className="primary-btn-naked">
              <Link href={data.button2.link}>
                <span>{data.button2.title}</span>
              </Link>
            </button>
          )}
        </ButtonWrapper>
      </TextWrapper>
      <ImageWrapper>
        <ImageContent>
          <img
            draggable={false}
            src="/assets/img/home/collection3.png"
            alt=""
          />
          <DetailInfoWrapper>
            <DetailLeftWrapper>
              <img
                draggable={false}
                src="/assets/img/home/collection3.png"
                alt=""
              />
              <InfoWrapper>
                <InfoItem>
                  <span>Terraspaces</span>
                  <VerifiedIcon />
                </InfoItem>
                <InfoItem className="link">
                  <a href="https://Terraspaces.Near">Terraspaces.Near</a>
                  <LinkIcon />
                </InfoItem>
              </InfoWrapper>
            </DetailLeftWrapper>
            <DetailRightWrapper>
              <a
                href="https://discord.gg/3Usk73ep"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  draggable={false}
                  src="/assets/img/icons/discord.png"
                  alt=""
                />
              </a>
              <a
                href="https://twitter.com/terraspaces"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  draggable={false}
                  src="/assets/img/icons/twitter.png"
                  alt=""
                />
              </a>
            </DetailRightWrapper>
          </DetailInfoWrapper>
        </ImageContent>
      </ImageWrapper>
    </ExploreNearWrapper>
  );
};
