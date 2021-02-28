import React from 'react'
import { Tooltip } from "antd";
import array from "../data/array.json";
import { chooseLang } from './func';
import { useSelector } from 'react-redux';

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function Char5View({character, lower}) {

    const language = useSelector(state => state.language)

    return (
        <Tooltip title={`${chooseLang(language, character.name)}${lower === "3" ? "(ES)" : ""} - ${chooseLang(language, character.sky)}, ${chooseLang(language,character.weapon)}`}>
            <img src={`images/character_base/${character.id}_${lower ? lower : "1"}.png`} 
            className={ (lower === "1" && language !== "jap" && array.notNS.includes(character.name) )
                       || (lower === "3" && language !== "jap" && array.notES.includes(character.name) ) 
                       ? "half" : null}/>
        </Tooltip>
    )
}

export default Char5View