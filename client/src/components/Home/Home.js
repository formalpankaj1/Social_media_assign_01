import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../store/postslice';
import Form from '../Form/Form.js'
import Posts from '../Posts/Posts';
import useStyles from './styles.js';
import Pagination from '../Pagination';
import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);



    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    // geting pageno for search operation
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    // useEffect(() => {
    //     dispatch(getPost());
    // }, [dispatch, currentId]);

    const searchPost = () => {
        if (search.trim() !== '' || tags.length !== 0) {

            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);

        } else {
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));


    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifycontent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {
                            (!searchQuery && !tags.length) && (
                                <Paper elevation={6} className={classes.pagination} >
                                    <Pagination page={page} currentId={currentId} />
                                </Paper>
                            )
                        }

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;
