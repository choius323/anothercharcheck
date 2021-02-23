import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Row, Col, Popover, Button, Typography } from "antd";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toggleLinked } from '../_actions/actions';

import Downloader from './utils/Downloader';
import DataLoader from './utils/DataLoader';

const { Title } = Typography;

const content = (
    <b style={{fontSize: "0.8rem"}}>
        본 사이트는 일본판 기준입니다. <br/><br/>
        5성 캐릭터만 정보가 제공됩니다.<br/>
        루나틱 캐릭터를 제외하고, 보드의 속성을 기준으로 분류합니다.<br/>
        ex) 마리엘-바람, 엘가-땅, 신시아-바람 <br/><br/>
        iOS 일부 기기에서 다운로드 버튼이 동작하지 않습니다.<br/><br/>
        사진이 모두 로드되지 않은 상태에서 다운로드 버튼을 누르면 <br/>
        이미지 파일이 제대로 생성되지 않을 수 있으니 <br/>
        잠시 기다리신 후 다운로드 기능을 이용해 주시길 바랍니다.
    </b>
)

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function NavBar() {

    const dispatch = useDispatch();

    const Linked = useSelector(state => state.linked)

    const [RealLink, setRealLink] = useState(Linked)

    const toggleLink = () => {
        const newLinked = !Linked;
        dispatch(toggleLinked(newLinked))
        window.localStorage.setItem("linked", newLinked)
        setRealLink(newLinked)
    };

    return (
        <Container fluid style={{ maxWidth:"1200px", textAlign: "center", margin:"1rem auto"}}>
            <Row justify="center" align="middle" style={{marginBottom: "20px"}}>
                <Downloader realLink={RealLink}/>
                <Col xs={12} md={4} style={{marginBottom: "10px"}}>
                    <Link style={{textDecoration: "none"}} to={`/${RealLink ? "" : "result"}`}>
                        <div onClick={toggleLink} className="resultlabel"
                    style={{backgroundColor: "gray", color: "white", fontWeight: 600, height: "35px",
                    lineHeight: "35px", borderRadius: "5px"}}>
                        {RealLink ? "체크표" : "결과"}
                    </div></Link> 
                </Col>
                <Col xs={12} md={4} style={{marginBottom: "10px"}}>
                    <Popover placement="bottom" title={<b>주의사항</b>} content={content} trigger="click">
                        <Button danger>주의사항</Button>
                    </Popover>
                </Col>
                <Col xs={24} md={12} style={{marginBottom: "10px"}}>
                    <a href="https://hu-lee.github.io/anotherdungeon/" target="_blank">
                        <Button style={{ height: "60px", fontSize: "1.7rem", fontWeight: 600}}>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <img src="images/dungeon.png" style={{height: "50px", marginRight: "10px"}} />
                                Another Dungeon
                            </div>
                        </Button>
                    </a>
                </Col>
            </Row>
            <DataLoader />
        </Container>
    )
}

export default NavBar
