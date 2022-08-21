import { collection, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Todo from './Todo'

const TodoList = () => {
    const [todos, setTodos] = useState([])
    console.log(todos)
    useEffect(() => {
        const collectionRef = collection(db, "todos")
        const q = query(collectionRef, orderBy("timestamp", "desc"))
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setTodos(QuerySnapshot.docs.map((doc => ({...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime()}))))
        })
        return unsubscribe;

    },[])
    return (
        <div>
            {todos.map(todo => 
                <Todo key={todo.id} 
                id={todo.id}
                title={todo.title} 
                detail={todo.detail} 
                timestamp={todo.timestamp} />
                )}
        </div>
    )
}

export default TodoList
