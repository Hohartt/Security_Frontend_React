import styles from "../css/Newnews_detail.module.css";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Axios from "axios";

const Customerservice_detail = () => {
  const location = useLocation();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [date, setDate] = React.useState("");

  let id = location.state[0].params;

  useEffect(() => {
    Axios.get("/api/v1/user/cont/counsels/" + id, {
      params: { loginId: sessionStorage.getItem("loginId") },
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        "Authorization-refresh": localStorage.getItem("jwtRefreshToken"),
      },
    })

      .then((res) => {
        console.log(res.data.data);
        setTitle(res.data.data.title);
        setContent(res.data.data.content.replace(/\./g, "."));
        setDate(res.data.data.createDate.substr(0, 10));
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  return (
    <div>
      <Row>
        <Row>
          <img className={styles.notice} src="img/customer.png" />
        </Row>
        <Col>
          <div className={styles.c_text}>제목 : {title}</div>
        </Col>
        <Col>
          <div className={styles.c_d_text}>{date}</div>
        </Col>
      </Row>
      <Row>
        <div className={styles.m_text}>
          <Row>
            내용 :<br />
            <br />
            {content}
          </Row>

          <Row></Row>
        </div>
      </Row>
      <Row></Row>

      <Row>
        <a href="/customerservice">
          <Button variant="primary" className={styles.c_button1}>
            목록
          </Button>{" "}
        </a>
      </Row>
    </div>
  );
};

export default Customerservice_detail;
