import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import LoadAnimation from './LoadAnimation';

import axios from 'axios';
import { QrCodeScannerTwoTone } from '@mui/icons-material';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const Posts = ({ posts, loading, eventDetails }) => {
    const classes = useStyles();

    const [fileName, setFileName] = useState("");

    useEffect(() => {
        console.log(posts, loading)
    }, [loading])
    if (loading) {
        return <h2>Loading...</h2>
    }

    console.log("posts is kh ", posts)
    return (
        <>
            <Container maxWidth="md">
                <Grid container spacing={5} alignItems="flex-end" className="divisionGap">
                    {posts?.map((post) => {
                        return (
                            <Grid item key={post.id} xs={12} md={4} >
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={`http://192.168.30.5:5000/admin/getimg/${post.eventId}`}
                                            title="title name"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {post.title}
                                            </Typography>
                                            <div className="d-flex flex-row">
                                                <label>Panel:</label>
                                                {post.organizedBy}
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Link to="/event" className="btn btn-light" onClick={e => eventDetails(post)}>View</Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
};
export default Posts;