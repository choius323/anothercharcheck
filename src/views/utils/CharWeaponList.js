import { Tooltip } from 'antd'
import React from 'react'
import CharCheck from './CharCheck'


function CharWeaponList({data, weapon}) {
    
    const filtered = data.filter(item => item.weapon === weapon && !item.free)
    const elements = ["불", "물", "바람", "땅"]
    const elements2 = [ "음", "뇌", "정"]

    return (
        <tr>
        <th>
            <Tooltip title={weapon}>
                <img style={{width: "100%"}} src={`images/weapons/${weapon}.png`}/>
            </Tooltip>        
        </th>
        {elements.map((element, index) => (
            <th key={index}>
                {filtered.filter(item => item.element === element).map((char, index) => (
                    <CharCheck key={index} character={char} />
                ))}
            </th>
        ))}
        <th>
        {elements2.map((element, index) => (
            <div key={index}>
                {filtered.filter(item => item.element === element).map((char, index) => (
                    <CharCheck key={index} character={char} />
                ))}
            </div>
        ))}
        </th>
        </tr>
    )
}

export default CharWeaponList
