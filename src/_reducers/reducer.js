import * as types from "../_actions/types";

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/  

const initialState = []

const counter = (state=initialState, action) => {
    switch(action.type) {
        case types.SET_NONE:
            return state.filter(item => item !== action.char)
        case types.SET_45:
            return {
                ...state,
                language: action.language
            }
        case types.SET_NO5:
            return {
                ...state,
                garul_time: garuls[action.garul_time]
            }
        default: 
            return state;
    }
}

export default counter;