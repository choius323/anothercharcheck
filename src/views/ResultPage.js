import { Col, Divider, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import data from '../data.json';
import Char45View from './utils/Char45View';
import Char5View from './utils/Char5View';

const japOnly = ["미르샤", "이웨라"]
const korOnly = []

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
        return data45.map((item, index) => (
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

    return (
        <div style={{maxWidth: "1000px", textAlign:"center", margin: "0 auto"}}>
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
                <Row justify="center" style={{marginBottom:"30px"}}>
                    <Col span={24}>
                        <Divider style={{fontSize:"1.2rem"}}><b>일본판에만 있는 캐릭터</b></Divider>
                    </Col>
                    <Col span={24}>{japOnly.length !== 0 ? renderJap() : "없음"}</Col>
                </Row>
                <Row justify="center" style={{marginBottom:"30px"}}>
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
