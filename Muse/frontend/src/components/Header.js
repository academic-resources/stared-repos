import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Components
import { AuthContext } from '../context/context';
import LoginForm from './Header/LoginForm';
import SignupForm from './Header/SignUpForm';
// import Settings from './Header/Settings';
import Help from './Header/Help';

//Mui
import { makeStyles, Typography, IconButton, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

//Icons
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
  myColor: {
    color: '#AFB1D4',
  },
  navBar_root: {
    // maxWidth: '1000px',
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateAreas: '\'left middle right\'',
    justifyContent: 'space-between',
    padding: '0.5rem',
    zIndex: '0',
  },
  navBar_left: {
    display: 'flex',
    gridArea: 'left',
    maxWidth: '25rem',
  },
  navBar_middle: {
    // display: 'grid',
    display: 'flex',
    gridArea: 'middle',
  },
  navBar_right: {
    display: 'flex',
    alignItems: 'center',
    gridArea: 'right',
    // maxWidth: '25rem',
  },


  navBar_navContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  navBar_icon: {
    minWidth: '1.5rem',
    maxWidth: '3rem',
  },
  navBar_iconContainer: {
    display: 'grid',
    gridAutoColumns: 'column',
    // gap: '.5rem',
    maxWidth: 'fit-content',
    justifyContent: 'center',
  },
  navBar_iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem',
    // cursor: 'pointer',
  },
  iconButton: {
    '&.MuiIconButton-root': {
      borderRadius: '.5rem',
      padding: '.5rem'
    }
  },
  dialog: {
    width: 'auto',
    height: 'auto',
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const loadedUser = useSelector(state => state.session.user);
  const { authDialog, setAuthDialog } = useContext(AuthContext);

  const [user, setUser] = useState()
  const [whichDialog, setWhichDialog] = useState('');


  useEffect(() => {
    (JSON.stringify(loadedUser) === '{}') ? setUser(null) : setUser(loadedUser)
  }, [loadedUser])

  const navs = [
    {
      title: 'Create',
      redirect: true,
      path: '/board',
      icon: <Typography className={classes.myColor}>Create</Typography>
    },
    {
      title: 'Help',
      redirect: false,
      path: 'help',
      icon: <HelpOutlineIcon className={classes.myColor} />
    },
    {
      title: 'Library',
      redirect: true,
      path: '/library',
      icon: <Typography className={classes.myColor}>Library</Typography>
    }
  ]

  const handleClose = () => {
    setAuthDialog(false);
  }

  const handleMenuClick = (path) => {
    setWhichDialog(path)
    setAuthDialog(true)
  }

  const handleNavClick = (path) => {
    history.push(path)
  }

  const renderDialog = (dialog) => {
    switch (dialog) {
      case 'login':
        return <LoginForm whichDialog={whichDialog} setWhichDialog={setWhichDialog} />
      case 'signup':
        return <SignupForm />
      // case 'settings':
      //   return <Settings getParams={() => getParams()} user={user} setParams={(path) => setParams(path)} />;
      case 'help':
        return <Help />
      default:
        return;
    }
  }

  return (
    <>
      <div className={classes.navBar_root}>

        {/* LEFT */}
        <div className={classes.navBar_left}>
          <Button >
            <Typography className={classes.myColor} >Muse</Typography>
          </Button>
        </div>

        {/* MIDDLE */}
        <div className={classes.navBar_middle}>
          <div className={classes.navBar_navContainer}>
            {navs.map((navItem) => (
              <IconButton
                className={classes.iconButton}
                key={navItem.title}
                title={navItem.title}
                onClick={() => navItem.redirect ? handleNavClick(navItem.path) : handleMenuClick(navItem.path)}
              >
                {navItem.icon}
              </IconButton>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className={classes.navBar_right}>
          <Button
            className={classes.iconButton}
            title={(user) ? 'Profile' : 'Login'}
            onClick={() => (user ? handleNavClick('/profile') : handleMenuClick('login'))}
          >
            <Typography className={classes.myColor}>
              {(user) ? `${user.username}` : 'Login'}
            </Typography>
          </Button>
          {/* </div> */}
        </div>
      </div >
      <Dialog open={authDialog} onClose={handleClose} className={classes.dialog} aria-labelledby="form-dialog-title">
        {renderDialog(whichDialog)}
      </Dialog>
    </>
  );
}

export default Header;
