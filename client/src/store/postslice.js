// import { fetchPosts } from '../api';
import * as api from '../api/index.js';
const { createSlice } = require('@reduxjs/toolkit');


const postslice = createSlice({
    name: 'product',
    initialState: { isLoading: true, posts: [] },
    reducers: {
        startLoading(state, action) {
            return { ...state, isLoading: true };
        },
        endLoading(state, action) {
            return { ...state, isLoading: false };
        },
        addALLPosts(state, action) {
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        },
        fetchPostsBySearchInstore(state, action) {
            return { ...state, posts: action.payload }
        },
        addPostToStore(state, action) {
            return { ...state, posts: [...state.posts, action.payload] };
        },
        addSinglePost(state, action) {
            return { ...state, post: action.payload };
        },
        updatePostToStore(state, action) {
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        },
        removePost(state, action) {
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        },
        likePostUpdateInStore(state, action) {
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        }
    },

});

export const { addALLPosts, addSinglePost, startLoading, endLoading, addPostToStore, updatePostToStore, removePost, likePostUpdateInStore, fetchPostsBySearchInstore } = postslice.actions;
export default postslice.reducer;

// Thunks

export function getSinglePost(id) {
    return async function getPostThunk(dispatch, getState) {
        try {
            dispatch(startLoading());
            const { data } = await api.fetchPost(id);
            dispatch(addSinglePost(data));
            dispatch(endLoading());
        } catch (err) {
            console.log("error in getPost ", err);
        }
    };
}


export function getPost(page) {
    return async function getPostThunk(dispatch, getState) {
        try {
            dispatch(startLoading());
            const { data } = await api.fetchPosts(page);
            dispatch(addALLPosts(data));
            dispatch(endLoading());
        } catch (err) {
            console.log("error in getPost ", err);
        }
    };
}



export function getPostsBySearch(searchQuery) {
    return async function getPostThunk(dispatch, getState) {
        try {
            dispatch(startLoading());
            const { data: { data } } = await api.fetchPostsBySearch(searchQuery);


            dispatch(fetchPostsBySearchInstore(data));
            dispatch(endLoading());

        } catch (err) {

            console.log("error in getPost ", err);

        }
    };
}


export function addPost(postData, history) {
    return async function addPostThunk(dispatch, getState) {
        try {
            const { data } = await api.createPost(postData);
            dispatch(addPostToStore(data));
            history.push(`/posts/${data._id}`);
        } catch (err) {
            console.log("error in addPost ", err);
        }
    };
}

export function updatePost(currentId, postData) {
    return async function updatePostThunk(dispatch, getState) {
        try {
            const { data } = await api.updatePost(currentId, postData);
            dispatch(updatePostToStore(data));
        } catch (err) {
            console.log("error in updatePost ", err);
        }
    };
}

export function deletePost(Id) {
    return async function deletePostThunk(dispatch, getState) {
        try {
            await api.deletePostInapi(Id);
            dispatch(removePost(Id));

        } catch (err) {
            console.log("error in updatePost ", err);
        }
    };
}

export function likePost(Id) {
    return async function likePostThunk(dispatch, getState) {
        try {

            const { data } = await api.likePostInapi(Id);
            dispatch(likePostUpdateInStore(data));

        } catch (err) {
            console.log("error in likePost is : ", err);
        }
    }
}