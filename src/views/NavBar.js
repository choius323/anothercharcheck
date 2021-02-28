import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Row, Col, Button } from "antd";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toggleLinked } from '../_actions/actions';

import Downloader from './utils/Downloader';
import DataLoader from './utils/DataLoader';
import AlertCopyRight from './utils/AlertCopyRight';
import Language from './utils/Language';

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
                <Col xs={9} md={4} style={{marginBottom: "10px"}}>
                    <Link style={{textDecoration: "none"}} to={`/${RealLink ? "" : "result"}`}>
                        <div onClick={toggleLink} className="resultlabel"
                    style={{backgroundColor: "gray", color: "white", fontWeight: 600, height: "35px",
                    width: "80%", margin: "0 auto", lineHeight: "35px", borderRadius: "5px"}}>
                        {RealLink ? "Checklist" : "Result"}
                    </div></Link> 
                </Col>
                <AlertCopyRight />
                <Col xs={24} sm={16} md={16} lg={8} style={{marginBottom: "10px"}}>
                    <a href="https://hu-lee.github.io/anotherdungeon/" target="_blank">
                        <Button style={{ height: "60px", lineHeight: "45px",fontSize: "1.4rem", fontWeight: 600}}>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <img src="images/dungeon.png" style={{height: "50px", marginRight: "10px"}} />
                                Another Dungeon
                            </div>
                        </Button>
                    </a>
                </Col>
                <Language />
                <DataLoader />
            </Row>      
        </Container>
    )
}

export default NavBar
