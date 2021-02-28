import React from 'react';
import { Tooltip } from "antd";
import array from "../data/array.json";
import { chooseLang } from './func';
import { useSelector } from 'react-redux';

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function CharElementView({character, refer}) {

    const language = useSelector(state => state.language)

    if(array.only5Char.indexOf(character.name) >= 0) {
        return (
            <Tooltip title={`${chooseLang(language, character.name)}
             - ${chooseLang(language, character.sky)}, ${chooseLang(language,character.weapon)}`}>
                <img src={`images/character_base/${character.id}_1.png`} 
                style={{width:70}}/>
            </Tooltip>
        )
    } else if(character.style < 3) {
        return (
            <React.Fragment>
                {refer.normal === 2 ? 
                <Tooltip title={`${chooseLang(language, character.name)}${character.nonormal ? "(AS)" : ""}
                 - ${chooseLang(language, character.sky)}, ${chooseLang(language,character.weapon)}`}>
                    <img src={`images/character_base/${character.id}_1.png`} 
                    style={{width:70}}
                    className={ (language !== "jap" && (array.notNS.includes(character.name) || array.japOnly.includes(character.name)) )
                        ? "no" : null}/>
                </Tooltip> : null}
                
                {refer.another ? 
                <Tooltip title={`${chooseLang(language, character.name)}(AS) - ${chooseLang(language, character.sky)}, ${chooseLang(language,character.weapon)}`}>
                    <img src={`images/character_base/${character.id}_2.png`}
                         style={{width:70}}
                         className={ (language !== "jap" && array.notAS.includes(character.name))
                        ? "no" : null} />
                </Tooltip> : null}
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                {refer.extra && 
                <Tooltip title={`${chooseLang(language, character.name)}(ES) - ${chooseLang(language, character.sky)}, ${chooseLang(language,character.weapon)}`}>
                    <img src={`images/character_base/${character.id}_3.png`}
                        style={{width:70}} 
                        className={ (language !== "jap" && array.notES.includes(character.name))
                        ? "no" : null}/>
                </Tooltip>
                }
            </React.Fragment>
        )
    }
}

export default CharElementView
