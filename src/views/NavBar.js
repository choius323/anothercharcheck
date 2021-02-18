import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'


function NavBar() {
    return (
        <Container fluid style={{textAlign: "center", margin:"1rem auto"}}>
            <Row>
                <Col>다운로드</Col>
                <Col xs={9}>
                    다운로드 버튼을 눌러 파일을 다운로드 받을 수 있습니다.<br/>
                    4성 이하 캐릭터는 제공되지 않습니다.<br/>
                    신속성 캐릭터를 제외하고, 보드에 있는 저항 속성을 기준으로 속성을 분류합니다.<br/>
                    (예를 들어, 마리엘은 바람속성으로 분류됩니다.)
                </Col>
                <Col>결과</Col>
            </Row>
        </Container>
    )
}

export default NavBar
