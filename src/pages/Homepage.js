import { AppBar, Container, Toolbar, makeStyles, Button, Typography } from '@material-ui/core';
import React, {useState} from 'react'
import ExploreIcon from '@material-ui/icons/Explore';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AllInboxRoundedIcon from '@material-ui/icons/AllInboxRounded';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import Home from './Home';
import MyBookmarks from './MyBookmarks';
import MyPosts from './MyPosts';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => {
  return {
      appbar: {
        position: '-webkit-sticky',
        position: 'sticky',
        top: "64px",
        height: '50px',
        backgroundColor: 'rgb(222, 209, 193)',
        borderBottom: '1px solid rgb(0, 0, 0, 0.1)',
      },
      btn: {
        textDecoration: 'none',
        cursor: 'pointer',
        height: '50px',
        width: '150px',
        border: '0px',
        backgroundColor: 'rgb(222, 209, 193)',
        textTransform: 'none',
        '&:hover': {
            background: "#c3aa94"
        },
      },
      selectedBtn: {
        cursor: 'pointer',
        height: '50px',
        width: '150px',
        border: '0px',
        backgroundColor: '#fffcf5',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
      }
  }
});

export default function Homepage() {
  const { currentUser } = useAuth()
  const classes = useStyles()
  const [selected, setSelected] = useState(0)
  const history = useHistory()
  let { path, url } = useRouteMatch();
  

  function handleExplore() {
    if (selected !== 0) {
      setSelected(0)
      history.push(`${url}`)
    }
  }

  function handleBookmarks() {
    if (selected !== 1) {
      setSelected(1)
      history.push(`${url}/bookmarks`)
    }
  }

  function handleMyposts() {
    if (selected !== 2) {
      setSelected(2)
      history.push(`${url}/myposts`)
    }
  }
  
  function render() {
    if (!currentUser) {
      return <Home />
    }
    return (
      <div >
        <AppBar className={classes.appbar} elevation={0}>
          <Container>
          
           <div style={{display: 'flex'}}>
              <button className={selected === 0 ? classes.selectedBtn : classes.btn} onClick={handleExplore}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Typography variant="h6" style={{marginRight: '5px'}}>
                    Explore
                  </Typography>
                  <ExploreIcon />
                </div>
              </button>
              <button className={selected === 1 ? classes.selectedBtn : classes.btn} onClick={handleBookmarks}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Typography variant="h6" style={{marginRight: '5px'}}>
                    Bookmarks
                  </Typography>
                  <BookmarksIcon />
                </div>
              </button>
              <button className={selected === 2 ? classes.selectedBtn : classes.btn} onClick={handleMyposts}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Typography variant="h6" style={{marginRight: '5px'}}>
                    My Posts
                  </Typography>
                  <AllInboxRoundedIcon />
                </div>
              </button>
              
            </div>
            
          </Container>

        </AppBar>
     
      <Switch>
        <Route exact path={path} component={Home}/>
        <Route exact path={`${path}/myposts`} component={MyPosts}/>
        <Route path={`${path}/bookmarks`}>
          <MyBookmarks />
        </Route>
      </Switch>
    </div>
    )
  }

  return render()
}