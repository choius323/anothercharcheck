import React from 'react';
import { Tooltip } from "antd";
import array from "../data/array.json";

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function CharElementView({character, refer}) {

    if(array.only5Char.indexOf(character.name) >= 0) {
        return (
            <Tooltip title={character.name}>
                <img src={`images/character_base/${character.id}_1.png`} 
                style={{width:70}}/>
            </Tooltip>
        )
    } else if(character.style < 3) {
        return (
            <React.Fragment>
                {refer.normal === 2 ? 
                <Tooltip title={character.name}>
                    <img src={`images/character_base/${character.id}_1.png`} 
                    style={{width:70}}/>
                </Tooltip> : null}
                
                {refer.another ? 
                <Tooltip title={`${character.name}(AS)`}>
                    <img src={`images/character_base/${character.id}_2.png`}
                         style={{width:70}} />
                </Tooltip> : null}
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                {refer.extra && 
                <Tooltip title={`${character.name}(ES)`}>
                    <img src={`images/character_base/${character.id}_3.png`}
                        style={{width:70}} />
                </Tooltip>
                }
            </React.Fragment>
        )
    }
}

export default CharElementView
