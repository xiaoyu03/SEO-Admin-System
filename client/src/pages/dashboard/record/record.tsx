import React, { useEffect, useState } from "react";
import { Table, Progress } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { getRecord } from "../api";
import "../keyword/progress.css";
// import { getRecord } from "../api/index";

type DataSource = {
  time: string;
  author: string;
  KolReNum: number;
  SoNum: number;
  progress: number;
  title: string;
  KolEmNum: string;
  KolRate: string;
  status: string;
  keyword: string;
  keyopinio: string;
  datetime: Date;
};

const columns: ColumnsType<DataSource> = [
  {
    title: "关键词",
    dataIndex: "keyword",
    key: "keyword",
    width: "10%",
    align: "center",
  },
  {
    title: "SO需求收录KOL数量",
    dataIndex: "SoNum",
    width: "8%",
    align: "center",
  },

  {
    title: "KOL发布",
    dataIndex: "KolReNum",
    width: "6%",
    align: "center",
  },

  {
    title: "KOL收录",
    dataIndex: "KolEmNum",
    width: "8%",
    align: "center",
  },

  {
    title: "收录率",
    dataIndex: "KolRate",
    width: "8%",
    align: "center",
    render: (text, record) => (
      <Progress
        percent={record.progress}
        status="active"
        strokeColor={{ "0%": "#108ee9", "70": "#87d068" }}
        className="progress-custom"
      />
    ),
  },

  // {
  //   title: "收录状态",
  //   dataIndex: "status",
  //   filters: [
  //     {
  //       text: "已收录",
  //       value: "已收录",
  //     },
  //     {
  //       text: "未收录",
  //       value: "未收录",
  //     },
  //   ],
  //   onFilter: (value: string | number | boolean, { status }) => {
  //     if (status && typeof status === 'string') {
  //       return status.startsWith(value.toString());
  //     }
  //     return false;
  //   },
  //   width: "5%",
  // },

  // {
  //   title: "KOL/KOC",
  //   dataIndex: "keyopinio",
  //   filters: [
  //     {
  //       text: "KOL",
  //       value: "KOL",
  //     },
  //     {
  //       text: "KOC",
  //       value: "KOC",
  //     },
  //   ],
  //   onFilter: (value: string | number | boolean, { keyopinio }) => {
  //     if (keyopinio && typeof keyopinio === 'string') {
  //       return keyopinio.startsWith(value.toString());
  //     }
  //     return false;
  //   },
  //   width: "2%",
  // },
  {
    title: "收录时间",
    dataIndex: "datetime",
    align: "center",
    // render: (time) => {
    //   const formattedTime = new Intl.DateTimeFormat("zh-CN", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //   }).format(new Date(time));
    //   return formattedTime;
    // },
    filters: [
      {
        text: "2023",
        value: "2023",
      },
      {
        text: "2022",
        value: "2022",
      },
      {
        text: "2021",
        value: "2021",
      },
    ],
    onFilter: (value: string | number | boolean, { time }) => {
      if (time && typeof time === "string") {
        return time.startsWith(value.toString());
      }
      return false;
    },
    width: "8%",
  },

  // {
  //   title: 'Age',
  //   dataIndex: 'age',
  //   sorter: (a, b) => a.age - b.age,
  // },
];

const onChange: TableProps<DataSource>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const MyRecord = () => {
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecord();
        const returnedData = (response as unknown) as Array<any>;
        console.log(returnedData);
        const newData: DataSource[] = [];
        for (const data of returnedData) {
          const kpirate = Number(
            ((data.KolEmNum / data.KolReNum) * 100).toFixed(2)
          );
          newData.push({
            time: data.recordtime,
            SoNum: data.SoNum,
            KolReNum: data.KolReNum,
            author: data.author,
            KolEmNum: data.KolEmNum,
            KolRate: data.KolRate,
            title: data.note_title,
            status: data.note_status,
            keyword: data.keyword,
            keyopinio: data.KOLandKOC,
            datetime: data.datetime,
            progress: kpirate,
          });
        }
        setDataSource(newData);
        console.log(returnedData.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Table columns={columns} dataSource={dataSource} onChange={onChange} />
  );
};

export default MyRecord;