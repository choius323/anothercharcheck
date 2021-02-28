import React from 'react'
import { Tooltip } from "antd";
import array from "../data/array.json";
import { useSelector } from 'react-redux';
import { chooseLang } from './func';

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function CharASView({character}) {

    const language = useSelector(state => state.language)

    return (
        <Tooltip title={`${chooseLang(language, character.name)}(AS) - ${chooseLang(language, character.sky)}, ${chooseLang(language,character.weapon)}`}>
            <img src={`images/character_base/${character.id}_${character.nonormal ? "1" : "2"}.png`} 
            style={{width:70}} className={language !== "jap" && array.notAS.includes(character.name) ? "half" : null}/>
        </Tooltip>
    )
}

export default CharASView