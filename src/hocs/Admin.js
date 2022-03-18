import React, { useState, useEffect } from 'react';
import { DropzoneAreaBase } from "material-ui-dropzone";
import './admin.css';
import UploadIMG from '../assets/UploadIMG.png'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 6),
    },
    formControl: {
        margin: theme.spacing(1),
        width: 200
    },
    indeterminateColor: {
        color: "#f50057"
    },
    selectAllText: {
        fontWeight: 500
    },
    selectedAll: {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.08)"
        }
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    },
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "center"
    },
    variant: "menu"
};


const Admin = () => {
    const classes = useStyles();

    const [files, setFiles] = useState([]);
    const [uploaded, isUploaded] = useState(false);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const onContactChange = (e) => {
        setContact(e.target.value);
    }
    const onOrganiserChange = (e) => {
        setOrganiser(e.target.value);
    }
    const onStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [organiser, setOrganiser] = useState("");
    const [status, setStatus] = useState("");

    const handleAdd = newFiles => {
        newFiles = newFiles.filter(file => !files.find(f => f.data === file.data));
        setFiles([...files, ...newFiles]);
    };

    const handleDelete = deleted => {
        setFiles(files.filter(f => f !== deleted));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const uploadData = new FormData();;
        uploadData.append('title', title);
        uploadData.append('description', description);
        uploadData.append('contactDetails', contact);
        uploadData.append('organizedBy', organiser);
        uploadData.append('status', status);
        uploadData.append('date', document.getElementById('dat').value);
        uploadData.append('file', files[0].file, files[0].file.name);

        // uploadData['file'] = files[0].file;
        // uploadData['title'] = title;
        // uploadData['description'] = description;
        // uploadData['contactDetails'] = contact;
        // uploadData['organizedBy'] = organiser;
        // uploadData['status'] = status;

        const url = 'http://192.168.30.5:5000/admin/addevent';

        //test
        console.log(uploadData);
        console.log(title);

        axios.post(url, uploadData, {
            headers: {
                'content-type': 'multipart/form-data',

            }
        })
            .then(res => {
                console.log(res.data);
                isUploaded(true);
                window.alert("Upload Successful");
            })
            .catch(err => console.log(err))
    }

    if (uploaded) {
        return <Redirect to='/' />
    }

    return (
        <div className="container bodycolor">
            <div className="d-flex flex-column">
                <div className="img ">
                    <img src={UploadIMG} />
                </div>
            </div>
            <div className="text-center">
                <label className="uploadfilename">Event Tite:</label>
                <TextField id="name" name="name" label="Enter event title" value={title} onChange={e => onTitleChange(e)} />
            </div>
            <div className="d-flex flex-column">
                <div className='text-center'>
                    <label className="uploadfilename">Event Description:</label>
                </div>
                <div className='dropbox p-2'>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Minimum 3 rows"
                        style={{ width: 200 }}
                        value={description}
                        onChange={e => onDescriptionChange(e)}
                    />
                </div>
            </div>
            <div className="text-center">
                <label className="uploadfilename">Contact Details:</label>
                <TextField id="name" name="name" label="Enter phone no" value={contact} onChange={e => onContactChange(e)} />
            </div>
            <div className="d-flex flex-column">
                <div className='text-center'>
                    <label className="uploadfilename">Event Poster:</label>
                </div>
                <div className="dropbox p-2">
                    <DropzoneAreaBase
                        type="file"
                        name="files"
                        fileObjects={files}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        dropzoneClass="box"
                    />
                </div>
            </div>
            <div className="text-center">
                <label className="uploadfilename">Orgainsed by:</label>
                <TextField id="name" name="name" label="Enter panel name" value={organiser} onChange={e => onOrganiserChange(e)} />
            </div>
            <div className="text-center">
                <label className="uploadfilename">Date:</label>
                {/* <TextField id="name" name="name" label="Enter Status" value={status} onChange={e => onStatusChange(e)} /> */}
                <input type="date" id="dat"></input>
            </div>
            <div className="center">
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => submitHandler(e)}
                >
                    Upload
                </Button>
            </div>
        </div>
    );

};

export default Admin;