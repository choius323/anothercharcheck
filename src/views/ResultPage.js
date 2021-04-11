import { Col, Row, Collapse, Tooltip, Divider } from 'antd'
import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import { useSelector } from 'react-redux';
import array from "./data/array.json";
import data from './data/data.json';
import Char5View from './utils/Char5View';
import CharElementView from './utils/CharElementView';
import CharASView from './utils/CharASVIew';
import KorJapLimited from './utils/KorJapLimited';
import { Helmet } from "react-helmet";
import { chooseLang } from './utils/func';

const { Panel } = Collapse;

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

const elements = ["불", "물", "바람", "땅"]
const elements2 = [ "그림자", "번개", "결정", "없음"]
const elementSort = {
    '불': 1, '물': 2, '바람': 3, '땅': 4, '그림자': 5, '번개': 6, '결정': 7, '없음': 8, 
}

function ResultPage(props) {

    const info = JSON.parse(window.localStorage.getItem("characterinfo")) 
               ? JSON.parse(window.localStorage.getItem("characterinfo")) : [];

    const linked = useSelector(state => state.linked)
    const language = useSelector(state => state.language)

    let parsedData;
    if(language === "jap") {
        parsedData = data.filter(a => !array.korOnly.includes(a.name))
    } else {
        parsedData = data.filter(a => !array.japOnly.includes(a.name))
    }

    useEffect(() => {
        if(!linked)
            props.history.push("/")
    }, [])

    const sortArray = (array) => {
        if(language === "kor")
            array.sort(function(a, b) { // 한글 오름차순
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            });
        else
            array.sort(function(a, b) { // 알파벳 오름차순
                return (chooseLang(language, a.name) > chooseLang(language, b.name))
                 - (chooseLang(language, b.name) > chooseLang(language, a.name));
            });
        array.sort(function(a, b) { // 속성 정렬
            return elementSort[a.element] - elementSort[b.element]
        });
    }

    const renderNo = (isFree) => {
        const infoIDs = info.map(a => a.id%300)
        let dataNo;
        if(isFree)
            dataNo = parsedData.filter(b => !(infoIDs.includes(b.id%300)) && b.id < 300 && b.free)
        else 
            dataNo = parsedData.filter(b => !(infoIDs.includes(b.id%300)) && b.id < 300 && !b.free)
        sortArray(dataNo);
        return dataNo.map((item, index) => (
            <Char5View key={index} character={item} />
        ))
    }
    
    const render45 = (isFree) => {
        const info45 = info.filter(a => {
            if(a.normal !== 1)
                return false;
            if(info.find(b => b.id === a.id+300))
                return !a.another && !info.find(b => b.id === a.id+300).extra
            else
                return !a.another
        })
        const data45 = info45.map(b => parsedData.find(item => item.id === b.id))
        let data45parsed;
        if(isFree)
            data45parsed = data45.filter(b => b.free && !array.only5Char.includes(b.name))
        else
            data45parsed = data45.filter(b => !b.free)
        sortArray(data45parsed);
        return data45parsed.map((item, index) => (
            <Char5View key={index} character={item} lower="0" />
        ))
    }

    const renderElement = (element) => {
        const dataElement = info.map(item => data.find(a => a.id === item.id))
            .filter(b => b.element === element)
        sortArray(dataElement);
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
        sortArray(dataNSFiltered);
        return dataNSFiltered.map((item, index) => (
            <Char5View key={index} character={item} lower="1"/>
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
        sortArray(dataASFiltered);
        return dataASFiltered.map((item, index) => (
            <CharASView key={index} character={item} />
        ))
    }
    
    const renderES = () => {
        const infoES = info.map(a => a.id)
        const dataES = data.filter(b => b.id>300 && !infoES.includes(b.id) && infoES.includes(b.id%300))
        sortArray(dataES);
        return dataES.map((item, index) => (
            <Char5View key={index} character={item} lower="3"/>
        ))
    } 

    return (
        <div style={{maxWidth: "1000px", textAlign: "center" ,margin: "0 auto"}}>
            <Helmet>
                <title>Result - Another Character</title>
            </Helmet>
            <b style={{fontSize:"1.1rem"}}>{chooseLang(language,"제목을 눌러 항목을 펼치고 접을 수 있습니다.")}</b>
            <div className="checker" style={{marginTop: "10px"}}>

            <Collapse defaultActiveKey={['1', '2', '3', '4']} style={{fontSize: "1rem", fontWeight: 600}}
             className="resultlabel">
                <Panel header={`${chooseLang(language,"명함도 없는 캐릭터")} (${renderNo(false).length} + ${renderNo(true).length})`} key="1">
                    <Row justify="center" align="middle" style={{marginBottom:"30px"}}>
                        <Col xs={24} sm={4}><b>Not Free</b></Col>
                        <Col xs={23} sm={20}>{renderNo(false)}</Col>
                        <Divider style={{margin: "15px auto"}}/>
                        <Col xs={24} sm={4}><b>Free</b></Col>
                        <Col xs={23} sm={20}>{renderNo(true)}</Col>
                    </Row>
                </Panel>
                <Panel header={`${chooseLang(language,"4.5성만 있는 캐릭터")} (${render45(false).length} + ${render45(true).length})`} key="2">
                    <Row justify="center" align="middle" justify="center" style={{marginBottom:"30px"}}>
                        <Col xs={24} sm={4}><b>Not Free</b></Col>
                        <Col xs={23} sm={20}>{render45(false)}</Col>
                        <Divider style={{margin: "15px auto"}}/>
                        <Col xs={24} sm={4}><b>Free</b></Col>
                        <Col xs={23} sm={20}>{render45(true)}</Col>
                    </Row>
                </Panel>
                <Panel header={chooseLang(language,"클래스 체인지(개방) 가능 캐릭터")} key="3">
                    {chooseLang(language,"(테일즈 캐릭터는 제외된 결과입니다.)")}
                    <Row align="middle" justify="center" style={{marginTop: "5px"}}>                            
                        <Col xs={24} sm={4}>
                            <Tooltip title={`NS : ${renderNS().length}`}>
                                <h4><b>NS</b></h4>
                            </Tooltip>
                        </Col>
                        <Col xs={23} sm={20} style={{textAlign: "left", marginBottom:"5px"}}>
                            {renderNS()}
                        </Col>
                        <Divider style={{margin: "15px auto"}}/>
                        <Col xs={24} sm={4}>
                            <Tooltip title={`AS : ${renderAS().length}`}>
                                <h4><b>AS</b></h4>
                            </Tooltip>
                        </Col>
                        <Col xs={23} sm={20} style={{textAlign: "left", marginBottom:"5px"}}>
                            {renderAS()}
                        </Col>
                        <Divider style={{margin: "15px auto"}}/>
                        <Col xs={24} sm={4}>
                            <Tooltip title={`ES : ${renderES().length}`}>
                                <h4><b>ES</b></h4>
                            </Tooltip>
                        </Col>
                        <Col xs={23} sm={20} style={{textAlign: "left", marginBottom:"5px"}}>
                            {renderES()}
                        </Col>
                    </Row>
                </Panel>
                <Panel header={chooseLang(language,"보유 5성 캐릭터")} key="4">
                    {elements.map((element, index) => (
                        <Row key={index} align="middle" justify="center" style={{marginBottom:"5px"}}>
                            <Col xs={24} sm={4}>
                                <img className="element" src={`images/elements/${element}.png`} />
                            </Col>
                            <Col xs={23} sm={20} style={{textAlign: "left"}}>
                                {renderElement(element)}
                            </Col>
                            <Divider style={{margin: "15px auto"}}/>
                        </Row>
                    ))}
                    <Row align="middle" justify="center">
                        <Col xs={24} sm={4}>
                            <h4 className="resultlabel"><b>Etc.</b></h4>
                        </Col>
                        <Col xs={23} sm={20} style={{textAlign: "left", marginBottom:"15px"}}>
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
