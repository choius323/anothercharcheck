import React, {useState, useEffect} from 'react'
import {Container} from 'react-bootstrap'
import { Row, Col, Button} from "antd";
import { Link } from 'react-router-dom'
import domtoimage from 'dom-to-image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLinked } from '../_actions/actions';

function NavBar() {

    const dispatch = useDispatch();

    const Linked = useSelector(state => state.linked)
    
    const [RealLink, setRealLink] = useState(Linked)

    const handleSaveClick = () => {
        domtoimage.toJpeg(document.querySelector('.checker'), { quality: 1 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = `character${RealLink ? "_result" : ""}.png`;
            link.href = dataUrl;
            link.click();
        });
    }

    const toggleLink = () => {
        const newLinked = !Linked;
        dispatch(toggleLinked(newLinked))
        window.localStorage.setItem("linked", newLinked)
        setRealLink(newLinked)
    };

    useEffect(() => {
    }, [Linked])

    return (
        <Container fluid style={{ maxWidth:"1200px", textAlign: "center", margin:"1rem auto"}}>
            <Row justify="center" align="middle">
                <Col xs={12} md={4}>
                    <Button type="primary" onClick={handleSaveClick} style={{margin:"1rem"}}>Download</Button>
                </Col>
                <Col xs={12} md={4}>
                    <Link style={{textDecoration: "none"}} to={`/${RealLink ? "" : "result"}`}><div onClick={toggleLink}
                    style={{backgroundColor: "gray", color: "white", fontWeight: 600, height: "50px",
                    lineHeight: "50px", borderRadius: "5px"}}>
                        {RealLink ? "체크표" : "결과"}
                    </div></Link> 
                </Col>
                <Col xs={24} md={16}>
                    <b>
                    4성 이하 캐릭터는 제공되지 않습니다.<br/>
                    루나틱 캐릭터를 제외하고, <br/>
                    보드의 속성을 기준으로 분류합니다.<br/>
                    ex) 마리엘-바람, 엘가-땅, 신시아-바람
                    </b>
                </Col>
            </Row>
        </Container>
    )
}

export default NavBar
