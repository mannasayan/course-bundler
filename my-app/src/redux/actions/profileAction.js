import axios from 'axios'
import { server } from '../store'

export const updateProfile = (name, email) => async (dispatch) => {
    try {
        dispatch({ type: "updateProfileRequest" })

        const { data } = await axios.put(`${server}/updateprofile`, {
            name, email,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )

        dispatch({
            type: "updateProfileSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "updateProfileFail",
            payload: error.response.data.message
        })

    }
}

export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({ type: "changePasswordRequest" })

        const { data } = await axios.put(`${server}/changepassword`, {
            oldPassword, newPassword
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )

        dispatch({
            type: "changePasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "changePasswordFail",
            payload: error.response.data.message
        })

    }
}

export const updateProfilePicture = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "updateProfilePictureRequest" })

        const { data } = await axios.put(`${server}/updateprofilepicture`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        )

        dispatch({
            type: "updateProfilePictureSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "updateProfilePictureFail",
            payload: error.response.data.message
        })

    }
}


export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: "forgotPasswordRequest" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }

        const { data } = await axios.post(`${server}/forgotpassword`,
            { email },
            config,
        )

        dispatch({
            type: "forgotPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "forgotPasswordFail",
            payload: error.response.data.message
        })

    }
}

export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({ type: "resetPasswordRequest" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
        const { data } = await axios.put(`${server}/resetpassword/${token}`, {
            password
        },
            config,
        )

        dispatch({
            type: "resetPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "resetPasswordFail",
            payload: error.response.data.message
        })

    }
}

export const addToPlaylist = (id) => async (dispatch) => {
    try {
        dispatch({ type: "addToPlaylistRequest" })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
        const { data } = await axios.post(
            `${server}/addtoplaylist`,{id},config)

        dispatch({
            type: "addToPlaylistSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "addToPlaylistFail",
            payload: error.response.data.message
        })

    }
}

export const removeFromPlaylist = (id) => async (dispatch) => {
    try {
        dispatch({ type: "removeFromRequest" })

        const config = {
            withCredentials: true,
        }
        const { data } = await axios.delete(
            `${server}/removefromplaylist?id=${id}`,config)

        dispatch({
            type: "removeFromSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "removeFromFail",
            payload: error.response.data.message
        })

    }
}
