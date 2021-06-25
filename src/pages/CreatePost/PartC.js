import React, { useState } from "react";
import { Container, makeStyles, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory }  from 'react-router-dom'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { convertToRaw } from "draft-js";
import TextEditor from "../../components/texteditor/TextEditor";

const useStyles = makeStyles(theme => ({
  editor: {
    marginLeft: "-6rem",
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: "relative",
    left: "102px"
  },
  button: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
}))

export const PartC = ({ values, setValues, setActiveStep, editorState, setEditorState, uid }) => {

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { currentUser, currentUserData, setCurrentUserData } = useAuth()
  const history = useHistory()
  const docRef = db.collection("users").doc(currentUser.uid)
  const [loading, setLoading] = useState(false)
  
  const handleSave = async () => {
    const content = convertToRaw(editorState.getCurrentContent())
    await setValues({ ...values, description: content })
  }

  const handlePrev = () => {
    setActiveStep(step => step - 1)
  }

  const handleOpen = () => {
    handleSave()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {
      type,
      category,
      title,
      skills,
      education,
      location,
      start,
      end,
      current,
      total,
      description,
    } = values

    const commitment = start.toString().substring(4,15) + " - " + end.toString().substring(4,15)

    let images = []

    async function setImages() {
      const entityMap = description.entityMap
      for (const entity in entityMap) {
        const src = entityMap[entity].data.src
        console.log(src)
        const first = src.indexOf('%2F') + 3
        const last = src.indexOf('?')
        images.push(src.slice(first, last))
      }
    }

    await setImages() 

    setLoading(true)
    
    await db.collection("posts").add({
      type,
      category,
      title,
      skills,
      education,
      location,
      start,
      end,
      commitment,
      current,
      total,
      description,
      author: currentUser.uid,
      name: currentUserData.basicInfo.firstName + " " + currentUserData.basicInfo.lastName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(
      post => {
        const postObj = { id: post.id, imageuid: uid, images: images }
        docRef.update({
          posts: firebase.firestore.FieldValue.arrayUnion(postObj)
        })
        const posts = [...currentUserData.posts]
        posts.push(postObj)
        console.log("deleted post")
        setCurrentUserData({
            ...currentUserData, 
            posts
        })
    })
    
    history.push('/loading')
  }

  const props = { editorState, setEditorState, uid }

  return(
        <Container component="main">
            <div className={classes.editor}>
                <TextEditor {...props}/>
            </div>
            <div className={classes.buttons}>
                <Button 
                    className={classes.button}
                    variant="contained"
                    color="secondary" 
                    onClick={handlePrev}
                    >
                    Back
                </Button>
                <Button 
                    className={classes.button}
                    variant="contained"
                    color="primary" 
                    onClick={handleOpen}
                    >
                    Post
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  Post Submission Confirmation
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Click 'Back' to review and edit your post or 'Post' to confirm
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Back
                  </Button>
                  <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    Post
                  </Button>
                </DialogActions>
            </Dialog>
        </Container>
   
  )
}