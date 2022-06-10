import React, { useEffect } from "react";
import { createChart } from "lightweight-charts";
import {
  Container
} from './styles'
import { FloorIcon } from "../DashboardChartView";

function TradingViewLineChart(props: any) {
  const { graphStatus, floorData, listedData, volumeData } = props
  const chartRef = React.useRef<any>();

  useEffect(() => {
    chartRef.current.innerHTML = ''
    const width = chartRef.current.clientWidth
    const height = chartRef.current.clientHeight
    const chart = createChart(chartRef.current, {
      rightPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.2
        },
        borderVisible: false
      },
      leftPriceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.2
        },
        borderVisible: false,
        visible: true
      },
      timeScale: {
        borderVisible: false,
        secondsVisible: true,
        timeVisible: true,
      },
      layout: {
        backgroundColor: '#0a0221',
        textColor: "#ebebf0"
      },
      grid: {
        horzLines: {
          color: "#1e153c"
        },
        vertLines: {
          color: "#0a0221"
        }
      },
      crosshair: {
        vertLine: {
          labelVisible: true
        }
      }
    });
    
    // chart.resize(width, height);
    
    const areaSeries = chart.addAreaSeries({
      topColor: "rgba(115, 251, 211, 0.56)",
      bottomColor: "rgba(0, 150, 136, 0.04)",
      lineColor: "rgb(115, 251, 211)",
      lineWidth: 2,
      visible: graphStatus.floor
    });

    const extraAreaSeries = chart.addLineSeries({
      color: "rgba(255, 255, 255, 0.7)",
      lineWidth: 2,
      priceScaleId: 'left',
      visible: graphStatus.listed
    });

    const volumeSeries = chart.addHistogramSeries({
      color: "rgb(119, 134, 212)",
      priceFormat: {
        type: 'volume',
      },
      priceLineVisible: true,
      priceScaleId: '',
      scaleMargins: {
        top: 0.85,
        bottom: 0,
      },
      visible: graphStatus.volume
    });
    
    floorData?.length && areaSeries.setData(floorData);
    listedData?.length && extraAreaSeries.setData(listedData);
    volumeData?.length && volumeSeries.setData(volumeData);
    
    var toolTipWidth = 100;
    var toolTipHeight = 80;
    var toolTipMargin = 15;
    
    var toolTip = document.createElement('div');
    toolTip.className = 'floating-tooltip-2';
    chartRef.current.appendChild(toolTip);
    
    // update tooltip
    chart.subscribeCrosshairMove(function(param: any) {
      if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
        toolTip.style.display = 'none';
        return;
      }
      const floor = param.seriesPrices.get(areaSeries);
      const listed = param.seriesPrices.get(extraAreaSeries);
      const volume = param.seriesPrices.get(volumeSeries);
      toolTip.style.display = 'block';
      const floorElement = graphStatus.floor ? `<div><span>FLR</span> <span style="color:rgb(115, 251, 211);">${floor ?? '-'}</span></div>` : ''
      const listedElement = graphStatus.listed ? `<div><span>LST</span> <span style="color:rgba(255, 255, 255, 0.7);">${listed ?? '-'}</span></div>` : ''
      const volumeElement = graphStatus.volume ? `<div><span>VOL</span> <span style="color:rgb(119, 134, 212);">${volume ?? '-'}</span></div>` : ''
      if (graphStatus.floor || graphStatus.volume || graphStatus.listed) toolTip.innerHTML = `${floorElement}${listedElement}${volumeElement}`;
    
      let y = param.point.y;
    
      let left = param.point.x + toolTipMargin;
      if (left > width - toolTipWidth) {
        left = param.point.x - toolTipMargin - toolTipWidth;
      }
    
      let top = y + toolTipMargin;
      if (top > height - toolTipHeight) {
        top = y - toolTipHeight - toolTipMargin;
      }
    
      toolTip.style.left = left + 'px';
      toolTip.style.top = top + 'px';
    });
  }, [graphStatus, floorData, listedData, volumeData]);

  return (
    <Container>
      <div ref={chartRef} />
    </Container>
  );
}

export default TradingViewLineChart;
