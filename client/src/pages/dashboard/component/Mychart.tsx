
import { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { API_BASE_URL } from '../../../config';
import ApiList from '../../../config/apiList';
import axios from 'axios';

export const Mychart =  () => {
  const currentDate = new Date();
  const [data, setData] = useState<Array<{ year: any; notelisted: number; }>>([]);


  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i);
        const formattedDate = date.toISOString().slice(0, 10);
        try {
          const response = await axios.get(API_BASE_URL + ApiList.getListed, {
            params: {
              date: formattedDate,
            },
          });
          const jsondata = response.data[0];
          if (jsondata && jsondata.listedsum) {
            newData.push({
              year: formattedDate,
              notelisted: parseInt(jsondata.listedsum),
            });
          } else {
            newData.push({
              year: formattedDate,
              notelisted: 0, // 或者添加其他默认值
            });
          }
        } catch (error) {
          console.error(error);
          newData.push({
            year: formattedDate,
            notelisted: 0, // 或者添加其他默认值
          });
        }
      }
      setData(newData);
      newData.sort((a, b) => a.year.localeCompare(b.year));
    };

    fetchData();
  }, []);
  const config = {

      data,
      width: 200, // 设置图像宽度为 600 像素
      height: 300,
      xField: 'year',
      yField: 'notelisted',
      label: {},
      point: {
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#5B8FF9',
          lineWidth: 2,
        },
      },
      tooltip: {
        showMarkers: false,
        title: '实际笔记上榜次数', 
        formatter: (datum:any) => {
          return {
            name: `日期: ${datum.year}`,
            value: `总笔记上榜次数: ${datum.notelisted}`,
            
          };
        },
      },
      state: {
        active: {
          style: {
            shadowBlur: 4,
            stroke: '#000',
            fill: 'red',
          },
        },
      },
      interactions: [
        {
          type: 'marker-active',
        },
      ],
    };
    return <Line {...config} />;
  };