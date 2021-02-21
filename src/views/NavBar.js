import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Row, Col } from "antd";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toggleLinked } from '../_actions/actions';

import Downloader from './utils/Downloader';
import DataLoader from './utils/DataLoader';


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
                <Col xs={12} md={4}>
                    <Link style={{textDecoration: "none"}} to={`/${RealLink ? "" : "result"}`}><div onClick={toggleLink}
                    style={{backgroundColor: "gray", color: "white", fontWeight: 600, height: "35px",
                    lineHeight: "35px", borderRadius: "5px"}}>
                        {RealLink ? "체크표" : "결과"}
                    </div></Link> 
                </Col>
                <Col xs={24} md={16}>
                    <b>
                    4성 이하 캐릭터는 제공되지 않습니다.<br/>
                    루나틱 캐릭터를 제외하고, <br/>
                    보드의 속성을 기준으로 분류합니다.<br/>
                    ex) 마리엘-바람, 엘가-땅, 신시아-바람
                    </b>
                </Col>
            </Row>
            <DataLoader />
        </Container>
    )
}

export default NavBar
