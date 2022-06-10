import React, { useEffect, useState } from 'react';
import { TradingViewLineChart } from '../TradingViewLineChart';
import { transactionData } from "../dumy";

import {
  Container,
  HeaderWrapper,
  InfoWrapper,
  ArrowIconButton,
  ChartInfoWrapper,
  NotificationIconButton,
  InfoItem,
  ContentWrapper,
  ChartHeader,
  FloorButton,
  ChartContentWrapper,
  HideShowWrapper,
  HideShowItem,
} from './styles';

interface Props {
  token?: any;
};

export const DashboardChartView = ({ token }: Props) => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [graphStatus, setGraphStatus] = useState({ floor: true, volume: true, listed: true })
  const [floorData, setFloorData] = useState<any[]>([]);
  const [listedData, setListedData] = useState<any[]>([]);
  const [volumeData, setVolumeData] = useState<any[]>([]);

  useEffect(() => {
    if (token && token.account_id) {
      (async () => {
        console.log("getting transaction data...");
        // const api = 'https://api.terraspaces.io';
        const api = process.env.NEXT_PUBLIC_API;
        const getAPI = async () => {
          const statisticDataEndpoint = `${api}/statistic_data`;
          const result = await fetch(statisticDataEndpoint, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ account_id: token.account_id })
          });
          return (await result.json())
        };
        const result = await getAPI();
        // const result = transactionData;
        const floorData = result.map((data: any) => ({ time: new Date(data.created_at).getTime() / 1000, value: data.floor_price }));
        const listedData = result.map((data: any) => ({ time: new Date(data.created_at).getTime() / 1000, value: data.total_listed }));
        const volumeData = result.map((data: any) => ({ time: new Date(data.created_at).getTime() / 1000, value: data.instant_volume }));
        setFloorData(floorData);
        setListedData(listedData);
        setVolumeData(volumeData);
      })();
    }
  }, [token]);
  return (
    <Container>
      <HeaderWrapper expand={isCollapse}>
        <InfoWrapper>
          <ArrowIconButton expand={isCollapse} onClick={() => setIsCollapse(prev => !prev)}>
            <RightArrowIcon />
          </ArrowIconButton>
          <img src={token?.icon} alt='' />
          <a href={`https://paras.id/collection/${token?.account_id}`} target='_blank' rel="noreferrer">
            <span>{token?.name}</span>
          </a>
        </InfoWrapper>
        <ChartInfoWrapper>
          {isCollapse ? (
            <NotificationIconButton>
              <NotifyIcon />
            </NotificationIconButton>
          ) : (
            <>
              <InfoItem>
                FLOOR <span>{floorData.length > 0 && floorData[floorData.length - 1].value.toFixed(3)}</span>
              </InfoItem>
              <InfoItem>
                VOLUME <span>{volumeData.length > 0 && (volumeData[volumeData.length - 1].value / 1000).toFixed(2)}K</span>
              </InfoItem>
              <InfoItem>
                LISTED <span>{listedData.length > 0 && listedData[listedData.length - 1].value.toFixed(3)}</span>
              </InfoItem>
            </>
          )}
        </ChartInfoWrapper>
      </HeaderWrapper>
      {isCollapse && (
        <ContentWrapper>
          <ChartHeader>
            <HideShowWrapper>
              <HideShowItem bgColor='rgb(115, 251, 211)' inActive={!graphStatus?.floor}>
                <div />
                <span className='title'>Floor</span>
                <span className='value'>{floorData.length > 0 && floorData[floorData.length - 1].value.toFixed(3)}</span>
                <button onClick={() => setGraphStatus({ ...graphStatus, floor: !graphStatus.floor })}>
                  {graphStatus?.floor ? <EyeIcon /> : <EyeThroughIcon />}
                </button>
              </HideShowItem>
              <HideShowItem bgColor='rgba(255, 255, 255, 0.7)' inActive={!graphStatus?.listed}>
                <div />
                <span className='title'>Listed</span>
                <span className='value'>{listedData.length > 0 && listedData[listedData.length - 1].value.toFixed(3)}</span>
                <button onClick={() => setGraphStatus({ ...graphStatus, listed: !graphStatus.listed })}>
                  {graphStatus?.listed ? <EyeIcon /> : <EyeThroughIcon />}
                </button>
              </HideShowItem>
              <HideShowItem bgColor='rgb(119, 134, 212)' inActive={!graphStatus?.volume}>
                <div />
                <span className='title'>Volume</span>
                <span className='value'>{volumeData.length > 0 && (volumeData[volumeData.length - 1].value / 1000).toFixed(2)}K</span>
                <button onClick={() => setGraphStatus({ ...graphStatus, volume: !graphStatus.volume })}>
                  {graphStatus?.volume ? <EyeIcon /> : <EyeThroughIcon />}
                </button>
              </HideShowItem>
            </HideShowWrapper>
          </ChartHeader>
          <ChartContentWrapper>
            <TradingViewLineChart graphStatus={graphStatus} floorData={floorData} listedData={listedData} volumeData={volumeData} />
          </ChartContentWrapper>
        </ContentWrapper>
      )}
    </Container>
  )
}

export const RightArrowIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-1hkd4f7">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
}

export const NotifyIcon = () => {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="price-alert-btn css-1xitzj7" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <title>Set price alert</title>
      <path d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path>
    </svg>
  )
}

export const FloorIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="styled-crosshairs css-10scxvy"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
  )
}

export const EyeIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-176vukc">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
    </svg>
  )
}

export const EyeThroughIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-176vukc">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
      </path><line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  )
}
