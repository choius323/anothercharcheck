import React from 'react'
import CharCheck from './CharCheck'
import array from "../data/array.json"
import { useSelector } from 'react-redux'

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

const elements = ["불", "물", "바람", "땅"]
const elements2 = [ "그림자", "번개", "결정", "없음"]

function CharWeaponList({data, weapon}) {
    
    const language = useSelector(state => state.language)
    let filtered;

    if(language === "jap") {
        filtered = data.filter(item => item.weapon === weapon && !item.free
             && !array.korOnly.includes(item.name))
    } else {
        filtered = data.filter(item => item.weapon === weapon && !item.free
             && !array.japOnly.includes(item.name))
    }
    

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
