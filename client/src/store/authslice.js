import * as api from '../api/index.js';
const { createSlice } = require('@reduxjs/toolkit');

const authslice = createSlice({
    name: 'user',
    initialState: { authData: null },
    reducers: {
        auth_addUserToLocalstorage(state, action) {
            // console.log("action in auth_addUser : ", action.payload);
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

            return { ...state, authData: action?.payload };

        },
        auth_logout_remove_from_localstorage(state, action) {
            localStorage.clear();
            return { ...state, authData: action?.payload };
        }
    },

});

export const { auth_addUserToLocalstorage, auth_logout_remove_from_localstorage } = authslice.actions;
export default authslice.reducer;

export function signin(formdata, router) {
    return async function signinThunk(dispatch, getState) {
        try {

            const { data } = await api.signIn(formdata);
            // console.log("signin", data);

            dispatch(auth_addUserToLocalstorage(data));
            router.push('/');

        } catch (err) {
            console.log(err);
            alert("invalid credentials");
        }
    };
}

export function register(formdata, router) {
    return async function registeerThunk(dispatch, getState) {
        try {
            const { data } = await api.registerInapi(formdata);
            // console.log("register", data);

            dispatch(auth_addUserToLocalstorage(data));
            // router.push('/');

        } catch (err) {
            console.log("error in register ", err);
            alert(" User already exist..");
        }
    };
}
