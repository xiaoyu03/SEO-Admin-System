import { useState } from "react";
import { Divider, Row, Col, Card } from "antd";
import { getList } from "../api/Index";

let targetNotes = 11;
export const Datacardall = () => {
  const [notesNum, setNotesNum] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const fetchData = async () => {
    const response = await getList();
    const returnedData = response as unknown as Array<any>;

    if (returnedData.length > 0) {
      setTime(returnedData[0].time);
      setNotesNum(returnedData.length);
    } else {
      setTime(0);
      setNotesNum(0);
    }
  };
  fetchData();

  return (
    <div>
      <p style={{ marginTop: "20px", fontSize: "14px" }}>
        <Divider orientation="left" plain>
          全部采集笔记汇总
        </Divider>
      </p>
      <Row gutter={30}>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              总关键词数量:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{targetNotes}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              总KOL发布:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{notesNum}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              总达成:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{((notesNum / targetNotes) * 100).toFixed(2) + "%"}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              总收录率:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;
              {(100 - (notesNum / targetNotes) * 100).toFixed(2) + "%"}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              总KOC发布:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{time}分钟
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              总笔记数量:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}秒
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};


