import React from 'react';
import {Container, Table} from 'react-bootstrap'
import NavBar from './NavBar';
import data from '../data.json';
import CharWeaponList from './utils/CharWeaponList';
import CharCheck from './utils/CharCheck';

const weapons = ["지팡이", "검", "도", "도끼", "창", "활", "권갑", "망치"]
const elements = ["불", "물", "바람", "땅"]
const elements2 = [ "음", "뇌", "정"]

function CheckPage() {

    const filtered = data.filter(item => item.free)

    return (
            <Container fluid style={{textAlign: "center", margin:"0 auto"}}>
                <div>
                    <Table className="checker" responsive striped bordered style={{width: 1280, margin: "0 auto"}}>
                        <thead>
                            <tr>
                            <th style={{width: 70}}></th>
                            {elements.map((element, index) => (
                                <th key={index} style={{width: 240}}>
                                    <img style={{width: "20%"}} src={`images/elements/${element}.png`} />
                                </th>
                            ))}
                            <th style={{width: 240}}>
                            {elements2.map((element, index) => (
                                <img key={index} style={{width: "20%"}} src={`images/elements/${element}.png`} />
                            ))}    
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                        {weapons.map((weapon, index) => (
                            <CharWeaponList key={index} data={data} weapon={weapon} />
                        ))}
                        <tr>
                        <td className="align-middle"><b>배포</b></td>
                        <td className="align-middle" colSpan={5}>
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
