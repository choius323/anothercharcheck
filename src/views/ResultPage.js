import { Col, Divider, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import data from '../data.json';
import Char45View from './utils/Char45View';
import Char5View from './utils/Char5View';
import CharElementView from './utils/CharElementView';

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

const japOnly = ["미르샤", "이웨라"]
const korOnly = []

const elements = ["불", "물", "바람", "땅"]
const elements2 = [ "음", "뇌", "정"]

function ResultPage() {

    const info = JSON.parse(window.localStorage.getItem("characterinfo")) 
               ? JSON.parse(window.localStorage.getItem("characterinfo")) : [];

    const renderNo = () => {
        const infoIDs = info.map(a => a.id)
        const dataNo = data.filter(b => !(infoIDs.includes(b.id%300)) && b.id < 300 && !b.free)
        return dataNo.map((item, index) => (
            <Char5View key={index} character={item} />
        ))
    } 

    const render45 = () => {
        const info45 = info.filter(a => a.normal === 1 && !a.another && !a.extra)
        const data45 = info45.map(b => data.find(item => item.id === b.id))
        const data45parsed = data45.filter(b => !b.free)
        return data45parsed.map((item, index) => (
            <Char45View key={index} character={item} />
        ))
    }

    const renderJap = () => {
        const dataJap = data.filter(b => japOnly.includes(b.name) && b.id < 300)
        return dataJap.map((item, index) => (
            <Char5View key={index} character={item} />
        ))
    } 

    const renderKor = () => {
        const dataKor = data.filter(b => korOnly.includes(b.name) && b.id < 300)
        return dataKor.map((item, index) => (
            <Char5View key={index} character={item} />
        ))
    } 

    const renderElement = (element) => {
        const dataElement = info.map(item => data.find(a => a.id === item.id)).filter(b => b.element === element)
        return dataElement.map((c, index) => (
            <CharElementView key={index} character={c} refer={info.find(i => i.id === c.id)} />
        ))
    }

    return (
        <div style={{maxWidth: "1000px", textAlign: "center" ,margin: "0 auto"}}>
            <div className="checker">
                <Row justify="center" style={{marginBottom:"30px"}}>
                    <Col span={24}>
                        <Divider style={{fontSize:"1.2rem"}}><b>명함도 없는 캐릭터(배포 제외)</b></Divider>
                    </Col>
                    <Col span={24}>{renderNo()}</Col>
                </Row>
                <Row justify="center" style={{marginBottom:"30px"}}>
                    <Col span={24}>
                        <Divider style={{fontSize:"1.2rem"}}><b>4.5성만 있는 캐릭터(배포 제외)</b></Divider>
                    </Col>
                    <Col span={24}>{render45()}</Col>
                </Row>
                <Row align="middle">
                    <Col span={24}>
                        <Divider style={{fontSize:"1.2rem"}}><b>보유 5성 캐릭터</b></Divider>
                    </Col>
                </Row>
                {elements.map((element, index) => (
                    <Row key={index} align="middle" style={{marginBottom:"5px"}}>
                        <Col span={4}>
                            <img style={{width: "40px"}}src={`images/elements/${element}.png`} />
                        </Col>
                        <Col span={20} style={{textAlign: "left"}}>
                            {renderElement(element)}
                        </Col>
                    </Row>
                ))}
                <Row align="middle" style={{marginBottom:"30px"}}>
                    <Col span={4}>
                        <h4><b>기타</b></h4>
                    </Col>
                    <Col span={20} style={{textAlign: "left"}}>
                        {elements2.map((element) => renderElement(element))}
                    </Col>
                </Row>
                <Row style={{marginBottom:"30px"}}>
                    <Col span={24}>
                        <Divider style={{fontSize:"1.2rem"}}><b>일본판에만 있는 캐릭터</b></Divider>
                    </Col>
                    <Col span={24}>{japOnly.length !== 0 ? renderJap() : "없음"}</Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Divider style={{fontSize:"1.2rem"}}><b>글로벌판에만 있는 캐릭터</b></Divider>
                    </Col>
                    <Col span={24}>{korOnly.length !== 0  ? renderKor() : "없음"}</Col>
                </Row>
            </div>
        </div>
    )
}

export default ResultPage
