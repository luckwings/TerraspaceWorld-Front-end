import React, { useEffect, useState } from "react";
import moment from "moment";
// Import Highcharts
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";

HighchartsMore(Highcharts);


const TradingHighChart = () => {
  const [options, setOptions] = useState<any>()

  useEffect(() => {
    const _options = {
      chart: {
        type: 'bubble',
        zoomType: 'xy',
        backgroundColor: 'transparent'
      },
      legend: {
        enabled: false
      },
      title: {
        floating: false,
        text: ''
      },
      subTitle: {
        floating: false,
        text: ''
      },
      credits: {
        enabled: false
      },
      caption: {
        floating: false,
        text: ''
      },
      yAxis: {
        gridLineColor: '#1e153c',
        opposite: true,
        title: {
          enabled: false
        },
        labels: {
          style: {
            color: '#ebebf0'
          }
        }
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%e %b',
          year: '%b'
        },
        tickWidth: 0,
        lineColor: '#1e153c',
        labels: {
          style: {
            color: '#ebebf0'
          }
        },
      },
      tooltip: {
        useHTML: true,
        className: 'high-chart-tooltip',
        backgroundColor: '#0a0221',
        borderColor: '#1e153c',
        xDateFormat: '%A, %b %e',
        formatter: function (): any {     
          const header = `<div class='x-value'>${moment((this as any).x).format('MMM DD HH:MM')}</div><div class='y-value'>${(this as any).y} SOL</div>`        
          return header
        }
      },
      series: [
        {
          type: "bubble",
          data: [].map((row: { amount: string, marketplace: string, timestamp: string}) => {
            return [parseInt(row.timestamp), parseFloat(row.amount), 1]
          }),
          marker: {
            fillColor: 'rgb(74, 143, 231)',
            lineWidth: 0,
            fillOpacity: 0.8,
            states: {
              hover: {
                lineWidthPlus: 2,
                lineColor: 'rgb(74, 143, 231)'
              }
            }
          },
          minSize: 10,
          maxSize: 16
        }
      ]
    };
    setOptions(_options)
  }, [])


  return (
    <>
      {options && <HighchartsReact highcharts={Highcharts} options={options} />}
    </>
  )
}

export default TradingHighChart;
