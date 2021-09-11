import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Components
import Splash from './Body/Splash';
import MusicLab from './Body/MuseLab/MusicLab';
import LibraryPage from './Body/Library/Library';
import { DialogContext } from '../context/context'

//MUI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (user)
          ? (<Component user={user} {...rest} />)
          : (<Redirect to='/login' />)
      }}
    />
  )
};

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: '#212121',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '9px 9px 18px #131313, -9px -9px 18px #2f2f2f',
  },
  section: {

  }
}))

const Body = (props) => {
  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false)
  const [dialogContext, setDialogContext] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [props.user])

  return isLoaded && (
    <DialogContext.Provider value={{ dialogContext, setDialogContext }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper className={classes.paper} elevation={0}>
          <Switch>
            {/* <Route exact path='/' render={props => <Splash {...props} />} /> */}
            <Route exact path='/board/:boardId' render={props => <MusicLab {...props} user={props.user} />} />
            <Route exact path='/library' render={props => <LibraryPage {...props} />} />
            <Route path='*' render={props => <MusicLab {...props} />} />
            {/* <ProtectedRoute exact user={user} path="/search" component={SavedMaps} /> */}
          </Switch>
        </Paper>
      </div>
    </DialogContext.Provider>
  )
}

export default Body
