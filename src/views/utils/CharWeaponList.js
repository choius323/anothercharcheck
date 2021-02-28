import React from 'react'
import CharCheck from './CharCheck'

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

const elements = ["불", "물", "바람", "땅"]
const elements2 = [ "음", "뇌", "정"]

function CharWeaponList({data, weapon}) {
    
    const filtered = data.filter(item => item.weapon === weapon && !item.free)

    return (
        <tr>
        <th className="align-middle">
                <img style={{width: "100%"}} src={`images/weapons/${weapon}.png`}/>
        </th>
        {elements.map((element, index) => (
            <th key={index} className="align-middle">
                {filtered.filter(item => item.element === element).map((char, index) => (
                    <CharCheck key={index} character={char} />
                ))}
            </th>
        ))}
        <th className="align-middle">
        {elements2.map((element) => (

                filtered.filter(item => item.element === element).map((char, index) => (
                    <CharCheck key={index} character={char} />
                ))
        ))}
        </th>
        </tr>
    )
}

export default CharWeaponList
