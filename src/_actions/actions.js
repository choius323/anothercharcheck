import * as types from "./types";

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/  

export const toggleLinked = (linked) => ({
    type: types.TOGGLE_LINKED,
    linked
})

export const setCharacter = (array) => ({
    type: types.SET_CHARACTER,
    array
})

export const setLanguage = (language) => ({
    type: types.SET_LANGUAGE,
    language
})