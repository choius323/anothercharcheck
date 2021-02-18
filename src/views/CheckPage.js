import React from 'react';
import {Container, Table} from 'react-bootstrap'
import NavBar from './NavBar';
import data from '../data.json';
import CharWeaponList from './utils/CharWeaponList';
import CharCheck from './utils/CharCheck';

function CheckPage() {

    const weapons = ["지팡이", "검", "도", "도끼", "창", "활", "권갑", "망치"]
    const filtered = data.filter(item => item.free)

    return (
            <Container fluid style={{textAlign: "center", margin:"0 auto"}}>
                <div className="checker">
                    <Table responsive striped bordered style={{width: 1280, margin: "0 auto"}}>
                        <thead>
                            <tr>
                            <th style={{width: 70}}></th>
                            <th style={{width: 240}}>불</th>
                            <th style={{width: 240}}>물</th>
                            <th style={{width: 240}}>바람</th>
                            <th style={{width: 240}}>땅</th>
                            <th style={{width: 240}}>신속성</th>
                            </tr>
                        </thead>
                        <tbody>
                        {weapons.map((weapon, index) => (
                            <CharWeaponList key={index} data={data} weapon={weapon} />
                        ))}
                        <tr>
                        <td>배포</td>
                        <td colSpan={5}>
                            {filtered.map((char, index) => <CharCheck key={index} character={char}/>)}
                        </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </Container>
    )
}

export default CheckPage
