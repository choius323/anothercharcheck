import React from 'react'
import { Tooltip } from "antd";
import array from "../data/array.json";

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function Char5View({character, lower}) {
    return (
        <Tooltip title={character.name}>
            <img src={`images/character_base/${character.id}_${lower ? "0" : "1"}.png`} 
            style={{width:70}} className={array.japOnly.includes(character.name) ? "half" : null}/>
        </Tooltip>
    )
}

export default Char5View