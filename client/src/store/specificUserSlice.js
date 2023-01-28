import * as api from '../api/index.js';
const { createSlice } = require('@reduxjs/toolkit');

const specificUserSlice = createSlice({
    name: 'user',
    initialState: { userinfo: {} },
    reducers: {
        addSpecificUserToLocalstorage(state, action) {
            localStorage.setItem('specificUser', JSON.stringify({ ...action?.payload }));
            return { userinfo: {...action?.payload} };
        },
    },

});

export const { addSpecificUserToLocalstorage } = specificUserSlice.actions;
export default specificUserSlice.reducer;

export function getSpecificUserInstore(name, router) {
    return async function getSpecificUserthunk(dispatch, getState) {
        try {
            const { data } = await api.getSpecificUserInapi(name);
            // console.log("getSpecificUserInapi", data);
            dispatch(addSpecificUserToLocalstorage(data[0]));
            // router.push(`/profile/${data[0].name}`);

        } catch (err) {
            console.log("error in getting Details ", err);
            alert(" error in getting Details..");
        }
    };
}

export function followUserInstore(name, router) {
    return async function followUserthunk(dispatch, getState) {
        try {
            const {data} = await api.followUserInapi(name);
            // console.log("followUserInstore", data);
            if(typeof(data)=='string'){
                alert(data);
            }else{
                dispatch(addSpecificUserToLocalstorage(data));
            }
            
            // router.push(`/profile/${data[0].name}`);

        } catch (err) {
            console.log("error in follow user ", err);
            alert(" error in follow..");
        }
    };
}

export function unfollowUserInstore(name, router) {
    return async function unfollowUserthunk(dispatch, getState) {
        try {
            const {data} = await api.unfollowUserInapi(name);
            // console.log("followUserInstore", data);
            if(typeof(data)=='string'){
                alert(data);
            }else{
                dispatch(addSpecificUserToLocalstorage(data));
            }
            
            // router.push(`/profile/${data[0].name}`);

        } catch (err) {
            console.log("error in unfollow user ", err);
            alert(" error in unfollow..");
        }
    };
}