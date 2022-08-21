import { Button, TextField } from '@mui/material'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { db } from '../firebase'
import { TodoContext } from '../pages/TodoContext'

const TodoForm = () => {
    const inputAreaRef = useRef()
    // const [todo, setTodo] = useState({title: "", detail: ""})
    const {showAlert, todo, setTodo} = useContext(TodoContext)
    const onSubmit = async() => {
        if(todo?.hasOwnProperty("timestamp")) {
            console.log(1)
            // update the todo
            const docRef = doc(db, "todos", todo.id)
            const todoUpdated = {...todo, timestamp: serverTimestamp()}
            updateDoc(docRef, todoUpdated)
            setTodo({title: "", detail: ""})
            showAlert("info", todo.id)
        } else {
            console.log(2)
            const collectionRef = collection(db, "todos")
            const docRef = await addDoc(collectionRef, {...todo, timestamp: serverTimestamp()})
            setTodo({title: "", detail: ""})
            showAlert("success", docRef.id)
        }

    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if(!inputAreaRef.current.contains(e.target)) {
                console.log("outside")
                setTodo({title: "", detail: ""})
            } else {
                console.log("inside")
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return() => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    },[])

    return (
        <div ref={inputAreaRef}>
            <TextField fullWidth label="title" margin="normal" value={todo.title} onChange={(e) => setTodo({...todo, title:e.target.value})} />
            <TextField fullWidth labael="detail" multiline maxRows={4} value={todo.detail} onChange={(e) => setTodo({...todo, detail:e.target.value})} />
            <Button onClick={onSubmit} variant="contained" sx={{mt: 3}}> {todo.hasOwnProperty("timestamp") ? "update" : "add"}</Button>
        </div>
    )
}

export default TodoForm
