import { Col, Divider, Row, Collapse, Tooltip } from 'antd'
import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import { useSelector } from 'react-redux';
import array from "./data/array.json";
import data from './data/data.json';
import Char5View from './utils/Char5View';
import CharElementView from './utils/CharElementView';
import CharASView from './utils/CharASVIew';
import KorJapLimited from './utils/KorJapLimited';

const { Panel } = Collapse;

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

const elements = ["불", "물", "바람", "땅"]
const elements2 = [ "음", "뇌", "정"]

function ResultPage(props) {

    const info = JSON.parse(window.localStorage.getItem("characterinfo")) 
               ? JSON.parse(window.localStorage.getItem("characterinfo")) : [];

    const linked = useSelector(state => state.linked)

    useEffect(() => {
        if(!linked)
            props.history.push("/")
    }, [])

    const renderNo = () => {
        const infoIDs = info.map(a => a.id%300)
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
            <Char5View key={index} character={item} lower="0" />
        ))
    }


    const renderElement = (element) => {
        const dataElement = info.map(item => data.find(a => a.id === item.id))
            .filter(b => b.element === element)
        return dataElement.map((c, index) => (
            <CharElementView key={index} character={c} refer={info.find(i => i.id === c.id)} />
        ))
    }

    const renderNS = () => {
        const infoNS = info.filter(a => {
            if(a.normal === 2)
                return false;
            if(info.find(b => b.id === a.id%300))
                return info.find(b => b.id === a.id%300).normal !== 2
            else 
                return true
        })
        const dataNS = [...new Set(infoNS.map(a => data.find(b => b.id === a.id%300)))]
        const dataNSFiltered = dataNS.filter(c => !array.only5Char.includes(c.name) && c.style <= 2 && !c.nonormal)
        return dataNSFiltered.map((item, index) => (
            <Char5View key={index} character={item} />
        ))
    } 

    const renderAS = () => {
        const infoAS = info.filter(a => {
            if(a.another) 
                return false;
            if(info.find(b => b.id === a.id%300))
                return !info.find(b => b.id === a.id%300).another
            else 
                return true
        })
        const dataAS = [...new Set(infoAS.map(a => data.find(b => b.id === a.id%300)))]
        const dataASFiltered = dataAS.filter(c => c.style === 2 
            || (c.style === 1 && c.nonormal && info.find(d => d.id === c.id).normal !== 2))
        return dataASFiltered.map((item, index) => (
            <CharASView key={index} character={item} />
        ))
    }
    
    const renderES = () => {
        const infoES = info.map(a => a.id)
        const dataES = data.filter(b => b.id>300 && !infoES.includes(b.id) && infoES.includes(b.id%300))
        return dataES.map((item, index) => (
            <Char5View key={index} character={item} lower="3"/>
        ))
    } 

    return (
        <div style={{maxWidth: "1000px", textAlign: "center" ,margin: "0 auto"}}>
            <Divider style={{fontSize:"1.1rem"}}><b>제목을 눌러 항목을 펼치고 접을 수 있습니다.</b></Divider>
            <div className="checker">

            <Collapse defaultActiveKey={['1', '2', '3', '4']} style={{fontSize: "1rem", fontWeight: 600}}
             className="resultlabel">
                <Panel header={`명함도 없는 캐릭터(배포 제외) (${renderNo().length})`} key="1">
                    <Row justify="center" style={{marginBottom:"30px"}}>
                        <Col span={24}>{renderNo()}</Col>
                    </Row>
                </Panel>
                <Panel header={`4.5성만 있는 캐릭터(배포 제외) (${render45().length})`} key="2">
                    <Row justify="center" style={{marginBottom:"30px"}}>
                        <Col span={24}>{render45()}</Col>
                    </Row>
                </Panel>
                <Panel header="클래스 체인지(개방) 가능 캐릭터" key="3">
                    (테일즈 캐릭터는 제외된 결과입니다.)
                    <Row align="middle">                            
                        <Col span={4}>
                            <Tooltip title={`NS : ${renderNS().length}`}>
                                <h4><b>NS</b></h4>
                            </Tooltip>
                        </Col>
                        <Col span={20} style={{textAlign: "left", marginBottom:"5px"}}>
                            {renderNS()}
                        </Col>
                        <Col span={4}>
                            <Tooltip title={`AS : ${renderAS().length}`}>
                                <h4><b>AS</b></h4>
                            </Tooltip>
                        </Col>
                        <Col span={20} style={{textAlign: "left", marginBottom:"5px"}}>
                            {renderAS()}
                        </Col>
                        <Col span={4}>
                            <Tooltip title={`ES : ${renderES().length}`}>
                                <h4><b>ES</b></h4>
                            </Tooltip>
                        </Col>
                        <Col span={20} style={{textAlign: "left", marginBottom:"5px"}}>
                            {renderES()}
                        </Col>
                    </Row>
                </Panel>
                <Panel header="보유 5성 캐릭터" key="4">
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
                    <Row align="middle">
                        <Col span={4}>
                            <h4 className="resultlabel"><b>기타</b></h4>
                        </Col>
                        <Col span={20} style={{textAlign: "left", marginBottom:"15px"}}>
                            {elements2.map((element) => renderElement(element))}
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
            </div>
            <KorJapLimited />
        </div>
    )
}

export default withRouter(ResultPage)
