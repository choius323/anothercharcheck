import React, { useState, useEffect } from 'react';
import { Tooltip } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { setCharacter } from '../../_actions/actions';
import array from "../data/array.json";
import { chooseLang } from './func';

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

function CharCheck({character}) {
    
    const dispatch = useDispatch();

    const info = JSON.parse(window.localStorage.getItem("characterinfo")) 
               ? JSON.parse(window.localStorage.getItem("characterinfo")) : [];
    const language = useSelector(state => state.language)
        
    const target = info.find(a => a.id === character.id) 
                 ? info.find(a => a.id === character.id) 
                 : { normal: 0, another: false, extra: false }

    const [Normal, setNormal] = useState(array.only5Char.indexOf(character.name) >= 0 ? 0 : target.normal)
    const [Only5Normal, setOnly5Normal] = useState(array.only5Char.indexOf(character.name) >= 0 ? target.normal : 0)
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

    if(array.only5Char.indexOf(character.name) >= 0) {
        return (
            <Tooltip title={chooseLang(language, character.name)}>
                <img onClick={toggleOnly5Normal} className={Only5Normal === 0 ? "gray" : null}
                src={`images/character_base/${character.id}_1.png`} 
                style={{width:70}}/>
            </Tooltip>
        )
    } else if(character.style < 3) {
        return (
            <React.Fragment>
                <Tooltip title={`${chooseLang(language, character.name)}${Normal===2 && character.nonormal ? "(AS)" : ""}`}>
                     <div onClick={toggleNormal} style={{position: "relative", width:70, display: "inline-block"}}>
                        <div className="rank4">{Normal===1 ? "4" : null}</div>
                        <img className={Normal === 0 ? "gray" : null}
                        src={`images/character_base/${character.id}_${Normal===2 ? 1 : 0}.png`} 
                        style={{width:70}}/>
                     </div>
                </Tooltip>
                {character.style > 1 ? 
                <Tooltip title={`${chooseLang(language, character.name)}(AS)`}>
                    <img className={Another ? null : "gray"} onClick={toggleAnother} 
                         src={`images/character_base/${character.id}_2.png`}
                         style={{width:70}} />
                </Tooltip> : null}
            </React.Fragment>
        )
    } else {
        return (
            <Tooltip title={`${chooseLang(language, character.name)}(ES)`}>
                <img className={Extra ? null : "gray"} onClick={toggleExtra} 
                    src={`images/character_base/${character.id}_3.png`}
                    style={{width:70}} />
            </Tooltip>
        )
    }
}

export default CharCheck
