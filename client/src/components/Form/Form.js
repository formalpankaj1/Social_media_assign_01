import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import useStyles from './styles.js';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, updatePost } from "../../store/postslice.js";
import { useHistory } from "react-router-dom";

/*
Could not find a declaration file for module 'react-file-base64'. 'c:/Users/Saurabh Joshi/Desktop/Memories Project/client/node_modules/react-file-base64/build/build.min.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/react-file-base64` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-file-base64';`ts(7016)
*/

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', SelectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(addPost({...postData, name: user?.result?.name},history)); 
      clear();
    } else {
      dispatch(updatePost(currentId, {...postData,name: user?.result?.name}));
      clear();
    }

  }

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', SelectedFile: '' });
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, SelectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
}

export default Form;