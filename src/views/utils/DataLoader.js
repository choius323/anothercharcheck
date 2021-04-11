import React, { useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Col, Button, Tabs, Mentions, Input} from "antd";
import { setCharacter } from '../../_actions/actions';
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
            if(isValid){
            window.localStorage.setItem("characterinfo", Data)
            dispatch(setCharacter(Data))
            alert("Data Load Success")
            window.location.reload();
        }
        } catch (err) {
            alert("Data Load Failed." + err)
            return;
        }
    }
    
    return (
            <Col xs={24} md={20} style={{marginBottom: "30px"}}>
                <Tabs type="card" className="resultlabel">
                    <TabPane tab="DATA COPY" key="1">
                        <Mentions style={{ width: '70%', height: "40px", marginRight: "15px" }} placeholder={JSON.stringify(info)} readOnly />
                        <CopyToClipboard text={JSON.stringify(info)}
                            onCopy={() => alert("Data copied to clipboard")}>
                            <Button style={{ height: "40px"}}>Copy</Button>
                        </CopyToClipboard>
                        
                    </TabPane>
                    <TabPane tab="DATA LOAD" key="2">
                        <TextArea style={{ width: '70%', height: "40px", marginRight: "15px" }} value={Data} onChange={onChange} 
                        placeholder="Insert your data"/>
                        <Button style={{ height: "40px"}} onClick={loadData}>Load</Button>
                    </TabPane>
                </Tabs>
            </Col>
    )
}

export default DataLoader
