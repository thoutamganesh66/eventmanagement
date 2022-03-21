import {useState, useEffect} from 'react'
import {DropzoneAreaBase} from "material-ui-dropzone";
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import './admin.css'
import CustomToolbar from '../Components/CustomToolbar'
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Admin = () => {
    const history = useHistory();
    const main=async()=>{
		let transport = axios.create({withCredentials:true});
		let res = await transport.get('http://localhost:5000/admin/verifyadmin')
		if(res.status != 200){
			history.push('/')
		}
	}
    const panels = ['food', 'arts and culture', 'sports', 'academic', 'training and placements', 'rnd', 'hostel and health']
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

    useEffect(() => {
        main();
    }, [])
    const handleAdd = newFiles => {
        newFiles = newFiles.filter(file => !files.find(f => f.data === file.data));
        setFiles([...files, ...newFiles]);
    };

    const handleDelete = deleted => {
        setFiles(files.filter(f => f !== deleted));
    };

    const submitHandler = (e) => {
        console.log(description)
        e.preventDefault();
        const uploadData = new FormData();;
        uploadData.append('title', title);
        uploadData.append('description', description);
        uploadData.append('contactDetails', contact);
        uploadData.append('organizedBy', organiser);
        uploadData.append('status', status);
        uploadData.append('date', document.getElementById('dat').value);
        uploadData.append('file', files[0].file, files[0].file.name);

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
        <div className="container">

            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                placeholder="Enter title name"
                value={title} onChange={e => onTitleChange(e)}
            />
            <div className="flex-row">
                <div className="select">
                    <select value={organiser} onChange={e => onOrganiserChange(e)}>
                        {panels.map((item) => {
                            return <option value={item} key={item}>{item}</option>
                        })}
                    </select>
                </div>
                <input type="date" id="dat" />
            </div>
            <div className="flex-row">

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="contact"
                    label="Contact"
                    name="contact"
                    placeholder="Enter contact number"
                    value={contact} onChange={e => onContactChange(e)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    placeholder="Enter email"
                    autoComplete="email"
                />
            </div>
            <DropzoneAreaBase
                type="file"
                name="files"
                fileObjects={files}
                onAdd={handleAdd}
                onDelete={handleDelete}
                dropzoneClass="box"
            />
            <CustomToolbar description={description} setDescription={setDescription} />
            <div className="submit">
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e) => submitHandler(e)}
                >
                    Upload
                </Button>
            </div>
        </div>
    );
}
export default Admin
