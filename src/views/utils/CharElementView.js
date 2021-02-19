import React, { useState, useEffect } from 'react';
import { Tooltip } from "antd";


const only5Char = ["레비아", "바이올렛", "스컬", "모르가나", "마나", "알테나", "짚돌이"]

function CharElementView({character, refer}) {

    if(only5Char.indexOf(character.name) >= 0) {
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
