import React from 'react'
import { Tooltip } from "antd";
import array from "../../../data/array.json";
import { chooseLang } from '../../utils/func';
import { useSelector } from 'react-redux';

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/ 

/**
 * @summary - Result 페이지에서 캐릭터를 표시해 주는 컴포넌트 
 * @property 
 *  character - 캐릭터 정보
 *  lower - 스타일에 따른 분류 태그.
 *          0 - 4.5성, 1 - 5성, 2 - AS, 3 - ES
 *  elementSort - 보유 5성 캐릭터에서는 속성별로 캐릭터를 보여주므로 
 *                이 곳에 컴포넌트를 표시하는지 여부
 * 
 * @param
 *  language - 언어 설정 (Redux에서 가져옴)
 *  nameTag - 각 lower에 해당하는 이름태그와 
 *  arrayTag - 각 lower에 해당하는 예외처리 대상 캐릭터들
 *  
 *  styleClass - 캐릭터 컴포넌트에 클래스명을 붙여 스타일을 부여
 */
function CharResult({character, lower, elementSort=false}) {

    const language = useSelector(state => state.language)

    const nameTag = ["", "", "(AS)", "(ES)"]
    const arrayTag = ["notNS", "notAS", "notES"]

    let styleClass = `${chooseLang("eng", character.element).toLowerCase()} check`
    if(lower > 0 && language !== "jap" && array[arrayTag[lower-1]].includes(character.name))
        styleClass += (elementSort ? " no" : " half")

    return (
        <Tooltip title={`${chooseLang(language, character.name)}${nameTag[lower]}
                       - ${chooseLang(language, character.sky)}, ${chooseLang(language,character.weapon)}`}>
            <img src={`images/character_base/${character.id}_${character.nonormal
                      ? Math.max(0, lower-1) : lower}.png`} 
            className={styleClass}/>
        </Tooltip>
    )
}

export default CharResult