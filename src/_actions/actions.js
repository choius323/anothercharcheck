import * as types from "./types";

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/  

export const setAddChar = (char) => ({
    type: types.SET_NONE,
    char
})

export const setDeleteChar = (char) => ({
    type: types.SET_45,
    char
})

export const setNo5Char = (char) => ({
    type: types.SET_NO5,
    char
})