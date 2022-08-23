import { Alert, Avatar, Box, Container, IconButton, Snackbar, Typography } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../Auth'
import Loading from '../components/Loading'
import Login from '../components/Login'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { auth } from '../firebase'
import { TodoContext } from './TodoContext'

export default function Home() {
  const {currentUser} = useAuth()
  const [open, setOpen] = useState(false)
  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [todo, setTodo] = useState({title: "", detail: ""})
  const showAlert = (type, msg) => {
    setAlertType(type)
    setAlertMessage(msg)
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if(reason === "clickaway") {
      return;
    }
    setOpen(false)
  }
  // return <Login />
  // return <Loading type="bubbles" color="yellowgreen" />
  return (
    <TodoContext.Provider value={{showAlert,todo, setTodo}}>
    <Container maxWidth="sm">
      <Container maxWidth="sm">
        <Box sx={{display: 'flex', justifyContent: 'space-between'}} mt={3}>
          <IconButton onClick={() => auth.signOut()}>
            <Avatar src={currentUser.photoURL} />
          </IconButton>
          <Typography variant="h5">
            {currentUser.displayName}
          </Typography>
        </Box>
      </Container>
      <TodoForm/>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <TodoList/>
    </Container>
    </TodoContext.Provider>
  )
}
