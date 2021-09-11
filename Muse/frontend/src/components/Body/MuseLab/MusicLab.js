import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import * as sessionActions from '../../../store/actions/session';
import styled from 'styled-components';
import Modal from 'react-modal'

//Components
import BeatButton from './BeatButton';
import Sequencer from './Sequencer';
// import { setInitialDemoState } from './/test';

//MUI
import { Button, Dialog, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '43rem',
    height: '43rem',
  },
  createButton: {
    width: '10rem',
    height: '10rem',
    backgroundColor: 'white',
  },
  title: {
    color: '#AFB1D4',
    textAlign: 'center',
    "&::placeholder": {
      color: "#AFB1D4",
      textAlign: "center"
    }
  },
  bpm: {
    color: '#AFB1D4',
    textAlign: 'center',
    width: '5rem',
  },
}));

const setInitialState = () => {
  const initialState = {}
  initialState['sequences'] = {}
  for (let i = 0; i < 16; i++) {
    const state = {
      sequenceTitle: '',
      sequenceData: null,
      multiplier: 1,
      // color: '#293847',
      color: '#AFB1D4',
    }

    initialState['sequences'][i] = state
  }
  initialState['projectName'] = ''
  initialState['bpm'] = Math.floor(60000 / 857)
  return initialState
}

const MusicLab = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { boardId } = useParams()
  const [beatPads] = useState(16);
  const user = useSelector(state => state.session.user)

  const [sequenceState, setSequenceState] = useState(props.beatPadData ? props.beatPadData : setInitialState());
  const [openDialog, setOpenDialog] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [bpm, setBpm] = useState(sequenceState.bpm ? sequenceState.bpm : 60)

  //DIALOG Functions
  const handleClose = () => {
    setOpenDialog(null);
  }

  const handleChange = (e, target) => {
    switch (target) {
      case 'bpm':
        sequenceState.bpm = e.target.value
        setSequenceState(sequenceState)
        setBpm(e.target.value)
        break;
      case 'projectName':
        sequenceState.projectName = e.target.value
        setSequenceState(sequenceState)
        setProjectName(e.target.value)
        break;
    }
  }

  const handleSave = () => {
    // dispatch(sessionActions.saveBoard(user.id, setInitialDemoState()))
    dispatch(sessionActions.saveBoard(user.id, sequenceState))
  }

  useEffect(() => {
    (async function loadBoardData() {
      if (boardId) {
        try {
          const res = await fetch(`/api/board/${boardId}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (res.ok) {
            const data = await res.json();
            setSequenceState(data)
            setBpm(Math.floor(60000 / data.bpm))
            setProjectName(data.projectName)
          }
        }
        catch (e) {
          console.error(e)
        }
      }
      setIsLoaded(true)
    })();
  }, []);

  return isLoaded && (
    <Root>
      <Header>
        <div style={{ display: 'flex', alignContent: 'center', }}>
          <Typography style={{ color: '#AFB1D4', marginTop: '.2rem', }}>BPM:</Typography>
          <TextField
            value={bpm}
            onChange={e => handleChange(e, 'bpm')}
            type="number"
            InputProps={{
              classes: { input: classes.bpm }
            }}
          />
        </div>
        <TextField
          value={projectName}
          onChange={e => handleChange(e, 'projectName')}
          placeholder={'Board Name'}
          InputProps={{
            classes: { input: classes.title }
          }}
        />
        <Button onClick={() => handleSave()}><Typography style={{ color: '#AFB1D4' }}>Save</Typography></Button>
      </Header>

      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={1}
        className={classes.grid}
      >
        {Object.values(sequenceState.sequences).map((sequenceKeys, i) => (
          <Grid item key={i}>
            <BeatButton
              index={i}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              // setSequenceState={setSequenceState}
              sequenceState={sequenceState}
              bpm={bpm}
            />
          </Grid>
        ))}
      </Grid>
      {/* <Dialog
        open={(openDialog !== null) ? true : false}
        onBackdropClick={() => setOpenDialog(null)}
        fullWidth={true}
        maxWidth={'md'}
      >
        {
          (openDialog !== null) && (
            <Sequencer
              index={openDialog}
              bpm={bpm}
              setSequenceState={setSequenceState}
              sequenceState={sequenceState}
              handleClose={handleClose}
            />
          )
        }
      </Dialog> */}
      <Modal
        isOpen={(openDialog !== null) ? true : false}
        onRequestClose={() => setOpenDialog(null)}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(62, 62, 62, .8)'
          },
          content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            inset: '5% 20%',
            padding: '0',
            backgroundColor: '#212121',
            border: '0',
            borderRadius: '1rem',
          }
        }}
      >
        {
          (openDialog !== null) && (
            <Sequencer
              index={openDialog}
              bpm={bpm}
              setSequenceState={setSequenceState}
              sequenceState={sequenceState}
              handleClose={handleClose}
            />
          )
        }
      </Modal>
    </Root>
  );
}

export default MusicLab;
