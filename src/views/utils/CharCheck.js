import React, { useState, useEffect } from 'react';
import { Tooltip } from "antd";
import { useDispatch } from 'react-redux';

function CharCheck({character}) {
    

    const [Normal, setNormal] = useState(0)
    const [Another, setAnother] = useState(false)
    const [Extra, setExtra] = useState(false)

    const toggleNormal = () => {
        setNormal((Normal+1)%3)
    }

    const toggleAnother = () => {
        setAnother(!Another)
    }

    const toggleExtra = () => {
        setExtra(!Extra)
    }

    if(character.style < 3) {
        return (
            <React.Fragment>
                <Tooltip title={`${character.name}${Normal===2 && character.nonormal ? "(AS)" : ""}`}>
                    <img onClick={toggleNormal} className={`cha_fs_${character.id} ${Normal === 0 ? "gray" : null}`}
                    src={`images/character_base/${character.id}_${Normal===2 ? 1 : 0}.png`} 
                    style={{width:70}}/>
                </Tooltip>
                {character.style > 1 ? 
                <Tooltip title={`${character.name}(AS)`}>
                    <img className={Another ? null : "gray"} onClick={toggleAnother} 
                         src={`images/character_base/${character.id}_2.png`}
                         style={{width:70}} />
                </Tooltip> : null}
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Tooltip title={`${character.name}(ES)`}>
                    <img className={Extra ? null : "gray"} onClick={toggleExtra} 
                         src={`images/character_base/${character.id}_3.png`}
                         style={{width:70}} />
                </Tooltip>
            </React.Fragment>
        )
    }
}

export default CharCheck
