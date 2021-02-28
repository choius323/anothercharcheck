import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Select} from "antd";
import { setLanguage } from '../../_actions/actions';

const { Option } = Select;

function Language() {

    const dispatch = useDispatch()
    const language = useSelector(state => state.language)

    const changeLang = (value) => {
        dispatch(setLanguage(value))
        window.localStorage.setItem("language", value)
    }

    return (
        <Col xs={24} sm={8} md={8} lg={4} style={{marginBottom: "10px"}}>
            <b>Language Select </b>
            <Select onChange={changeLang} defaultValue={language} style={{margin: "5px auto"}}>
                <Option value="kor">한국어</Option>
                <Option value="jap">日本語</Option>
                <Option value="eng">English</Option>
            </Select>
        </Col>
    )
}

export default Language
