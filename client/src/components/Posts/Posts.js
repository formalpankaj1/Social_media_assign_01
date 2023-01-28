import React from "react";
import Post from "./Post/Post";
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles.js'
import { useSelector } from "react-redux";


const Posts = ({ setCurrentId }) => {
    const { isLoading, posts } = useSelector((state) => state.posts) // []=>[{posts:[],currentPage: , numberOfPages: }]
    const classes = useStyles();

    if (!posts.length && !isLoading) return 'No posts';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.Container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )

    );
}

export default Posts;