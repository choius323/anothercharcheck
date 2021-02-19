import React, { useState, useEffect } from 'react';
import { Tooltip } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { setCharacter, deleteCharacter } from '../../_actions/actions';

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

const only5Char = ["레비아", "바이올렛", "스컬", "모르가나", "마나", "알테나", "짚돌이"]

function CharCheck({character}) {
    
    const dispatch = useDispatch();

    const info = JSON.parse(window.localStorage.getItem("characterinfo")) 
               ? JSON.parse(window.localStorage.getItem("characterinfo")) : [];
        
    const target = info.find(a => a.id === character.id) 
                 ? info.find(a => a.id === character.id) 
                 : { normal: 0, another: false, extra: false }

    const [Normal, setNormal] = useState(only5Char.indexOf(character.name) >= 0 ? 0 : target.normal)
    const [Only5Normal, setOnly5Normal] = useState(only5Char.indexOf(character.name) >= 0 ? target.normal : 0)
    const [Another, setAnother] = useState(target.another)
    const [Extra, setExtra] = useState(target.extra)


    const saveCharacter = () => {
        const characterInfo = JSON.parse(window.localStorage.getItem("characterinfo")) 
                            ? JSON.parse(window.localStorage.getItem("characterinfo")) : [];
        let newArray;
        const char = {
            id: character.id,
            normal: Only5Normal + Normal,
            another: Another,
            extra: Extra
        };
        if(char.normal === 0 && !char.another && !char.extra) {
            newArray = characterInfo.filter(a => a.id !== char.id)
        } else {
            newArray = [...characterInfo.filter(a => a.id !== char.id), char]
        }
        window.localStorage.setItem("characterinfo", JSON.stringify(newArray))
        dispatch(setCharacter(newArray))
    }
    const toggleNormal = () => {
        setNormal((Normal+1)%3)
    }

    const toggleOnly5Normal = () => {
        setOnly5Normal((Only5Normal+1)%2)
    }

    const toggleAnother = () => {
        setAnother(!Another)
    }

    const toggleExtra = () => {
        setExtra(!Extra)
    }

    useEffect(() => {
        saveCharacter();
    }, [Normal, Only5Normal, Extra, Another])

    if(only5Char.indexOf(character.name) >= 0) {
        return (
            <Tooltip title={character.name}>
                <img onClick={toggleOnly5Normal} className={Only5Normal === 0 ? "gray" : null}
                src={`images/character_base/${character.id}_1.png`} 
                style={{width:70}}/>
            </Tooltip>
        )
    } else if(character.style < 3) {
        return (
            <React.Fragment>
                <Tooltip title={`${character.name}${Normal===2 && character.nonormal ? "(AS)" : ""}`}>
                    <img onClick={toggleNormal} className={Normal === 0 ? "gray" : null}
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
