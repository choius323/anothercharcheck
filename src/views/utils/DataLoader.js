import React, {useState, useEffect} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Row, Col, Button, Tabs, Mentions, Input} from "antd";
import { setCharacter, toggleLinked } from '../../_actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const { TabPane } = Tabs;
const { TextArea } = Input;

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function DataLoader() {
    
    const dispatch = useDispatch();
    const [Data, setData] = useState("")

    let info = useSelector(state => state.info)

    if(JSON.parse(window.localStorage.getItem("characterinfo")))
        info = JSON.parse(window.localStorage.getItem("characterinfo"))

    const onChange = (e) => {
        setData(e.target.value)
    }

    const loadData = () => {
        try {
            const Parsed = JSON.parse(Data)
            const isValid = typeof Parsed === 'object'
            console.log(isValid)
            if(isValid){
            window.localStorage.setItem("characterinfo", Data)
            dispatch(setCharacter(Data))
            alert("데이터 로드에 성공하였습니다.")
            window.location.reload();
        }
        } catch (err) {
            alert("데이터 로드에 실패하였습니다. 다시 한 번 확인해 주세요. " + err)
            return;
        }
    }
    
    return (
        <Row justify="center">
            <Col span={20} style={{marginBottom: "30px"}}>
                <Tabs type="card" className="resultlabel">
                    <TabPane tab="데이터 복사" key="1">
                        <Mentions style={{ width: '70%', height: "40px", marginRight: "20px" }} placeholder={JSON.stringify(info)} readOnly />
                        <CopyToClipboard text={JSON.stringify(info)}
                            onCopy={() => alert("체크표 데이터가 복사되었습니다.")}>
                            <Button style={{ height: "40px"}}>Copy</Button>
                        </CopyToClipboard>
                        
                    </TabPane>
                    <TabPane tab="데이터 로드" key="2">
                        <TextArea style={{ width: '70%', height: "40px", marginRight: "20px" }} value={Data} onChange={onChange} placeholder="가지고 있는 데이터를 입력하세요"/>
                        <Button style={{ height: "40px"}} onClick={loadData}>Load</Button>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}

export default DataLoader
