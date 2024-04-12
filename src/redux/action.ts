import { Dispatch } from "redux";
import axios from "axios";
import { GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS, GET_VIDEO_ERROR } from "./actionTypes";

export const getVideos = (page: number) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: GET_VIDEO_REQUEST });
        const res = await axios.get(`https://internship-service.onrender.com/videos?page=${page}&limit=9`);

        const { data } = res.data;
        localStorage.setItem("videos", JSON.stringify(data.posts));

        dispatch({ type: GET_VIDEO_SUCCESS, payload: { videos: data.posts, page: data.page } });
    } catch (error) {
        dispatch({ type: GET_VIDEO_ERROR });
    }
};
