import React from 'react'
import { Col, Popover } from "antd";
import { CopyrightOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { useSelector } from 'react-redux';

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

const content2 = (
    <b style={{fontSize: "0.8rem"}}>
        Final Update : 2021.02.28 <br/>
        License : MIT License <br/><br/>
        2021, Hyun Uk Lee <br/>
        as0266@naver.com
    </b>
)

function AlertCopyRight() {

    const language = useSelector(state => state.language)
    
    const content = language === "kor" ? (
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
    ) : (
        <b style={{fontSize: "0.8rem"}}>
            This site is based on Japanese Version. <br/><br/>
            Only ☆5 has information.<br/>
            Except Lunatic character, element is determined by character board status.<br/>
            ex) Mariel-Wind, Elga-Earth, Cynthia-Wind<br/><br/>
            Download button is not working on some of iOS devices.<br/><br/>
            If you click download button before the image is completely loaded,<br/>
            the image file can be crashed. So please wait a little bit.
        </b>
    )

    return (
        <Col xs={6} md={4} style={{marginBottom: "10px"}}>
            <div style={{display: "flex"}}>
                <Popover placement="bottom" title={<b>알림</b>} content={content} 
                    trigger="click">
                    <ExclamationCircleOutlined style={{ color: "red", fontSize: "28px", margin: "1rem auto"}}/>
                </Popover>
                <Popover placement="bottom" title={<b>Copyright</b>} content={content2} trigger="click">
                    <CopyrightOutlined style={{ fontSize: "28px", margin: "1rem auto"}}/>
                </Popover>
            </div>
        </Col>
    )
}

export default AlertCopyRight
