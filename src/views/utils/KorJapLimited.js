import { Col, Divider, Row } from 'antd'
import React from 'react'
import data from '../../data/data.json';
import array from "../../data/array.json";
import CharResult from '../Components/ResultPage/CharResult';
import { useSelector } from 'react-redux';
import { chooseLang } from './func';

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function KorJapLimited() {

    const language = useSelector(state => state.language)

    const renderJap = () => {
        const dataJap = data.filter(b => array.japOnly.includes(b.name) && b.id < 300)
        return dataJap.map((item, index) => (
            <CharResult key={index} character={item} lower={1}/>
        ))
    } 

    const renderKor = () => {
        const dataKor = data.filter(b => array.korOnly.includes(b.name) && b.id < 300)
        return dataKor.map((item, index) => (
            <CharResult key={index} character={item} lower={1}/>
        ))
    }

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Divider style={{fontSize:"1rem"}}><b>{chooseLang(language,"일본판에만 있는 캐릭터(원판)")}</b></Divider>
                </Col>
                <Col span={24}>{array.japOnly.length !== 0 ? renderJap() : chooseLang(language,"없음")}</Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Divider style={{fontSize:"1rem"}}><b>{chooseLang(language,"글로벌판에만 있는 캐릭터(원판)")}</b></Divider>
                </Col>
                <Col span={24} style={{marginBottom:"30px"}}>{array.korOnly.length !== 0  ? renderKor() : chooseLang(language,"없음")}</Col>
            </Row>
        </div>
    )
}

export default KorJapLimited
