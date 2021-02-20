import React from 'react'
import { Tooltip } from "antd";
import array from "../data/array.json";

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function CharASView({character}) {
    return (
        <Tooltip title={`${character.name}(AS)`}>
            <img src={`images/character_base/${character.id}_${character.nonormal ? "1" : "2"}.png`} 
            style={{width:70}} className={array.notAS.includes(character.name) ? "half" : null}/>
        </Tooltip>
    )
}

export default CharASView