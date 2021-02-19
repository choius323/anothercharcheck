import React from 'react'
import { Tooltip } from "antd";

function Char45View({character}) {
    return (
        <Tooltip title={character.name}>
            <img src={`images/character_base/${character.id}_0.png`} 
            style={{width:70}}/>
        </Tooltip>
    )
}

export default Char45View
