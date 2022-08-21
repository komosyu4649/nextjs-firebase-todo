import { IconButton, ListItem, ListItemText } from '@mui/material'
import moment from 'moment/moment'
import React, { useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { TodoContext } from '../pages/TodoContext';

const Todo = ({id,title,timestamp,detail}) => {
    const {showAlert,todo, setTodo} = useContext(TodoContext)
    const deleteTodo = async(id,e) => {
        e.stopPropagation()
        const docRef = doc(db, "todos", id)
        await deleteDoc(docRef)
        showAlert("error", id)
    }
    return (
        <ListItem onClick={() => setTodo({id,title,timestamp,detail})}
                  key={id} 
                  sx={{mt: 3, boxShadow: 3}} 
                  style={{backgroundColor: "#fafafa"}} 
                  secondaryAction={
                    <>
                        <IconButton onClick={(e) => deleteTodo(id, e)}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    </>
                 }
        >
            <ListItemText primary={title} secondary={moment(timestamp).format("MMMM dd, yyyy")} />
        </ListItem>
    )
}

export default Todo
