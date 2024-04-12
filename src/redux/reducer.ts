import { GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS, GET_VIDEO_ERROR } from "./actionTypes"

export interface Initial {
    videos: [],
    currentPage: number,
    isLoading: boolean,
    isError: boolean
}
const init: Initial = {
    videos: [],
    currentPage: 0,
    isLoading: false,
    isError: false
}

interface Action {
    type: string,
    payload: { videos: [], page: number }
}

const reducer = (state = init, { type, payload }: Action) => {
    switch (type) {
        case GET_VIDEO_REQUEST:
            return { ...state, isLoading: true }
        case GET_VIDEO_SUCCESS:
            return { ...state, videos: payload.videos, currentPage: payload.page, isLoading: false, isError: false }
        case GET_VIDEO_ERROR:
            return { ...state, isError: true, isLoading: false }
        default: return state
    }
}

export default reducer
