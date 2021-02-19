import * as types from "../_actions/types";

/*-- 
SPDX-FileCopyrightText: © 2021 Hyun Uk Lee <as0266@naver.com>

SPDX-License-Identifier: MIT
--*/  

const initialState = {
    linked: window.localStorage.getItem("linked") === "true" || false,
    info: []
}

const counter = (state=initialState, action) => {
    switch(action.type) {
        case types.TOGGLE_LINKED:
            return {
                ...state,
                linked: action.linked
            }
        case types.SET_CHARACTER:
            return {...state, info: action.array}
        case types.DELETE_CHARACTER:
            return {...state, info: state.info.filter(a => a.id !== action.id)}
        default: 
            return state;
    }
}

export default counter;