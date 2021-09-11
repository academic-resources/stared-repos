import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

//Components
import { soundLibrary } from './SoundLibrary';
import styled from 'styled-components';

//MUI
import { makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const NeonButton = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

color: #255784;
background-color: ${props => props.play ? '#0ff0fc' : '#AFB1D4'};
// background: #2196f3;
text-transform: uppercase;
letter-spacing: none;
font-size: 24px;
overflow: hidden;
border-radius: 0.5rem;

width: 10rem;
height: 10rem;

box-shadow: ${props => props.play ? '0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3' : 0};
transition: 0.2s;
`

const Span1 = styled.span`
  background: white;
  height: 1rem;
  width: 100%;

  position: relative;
  top: 1;
`

const BeatButton = (props) => {
  const currentSequence = useRef(props.sequenceState.sequences[props.index])
  const buffer = useRef()
  const delay = useRef();

  const { sequenceData } = currentSequence.current

  const [multiplier, setMultiplier] = useState(currentSequence.current.multiplier ? currentSequence.current.multiplier : 1);
  const [play, setPlay] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);

  function initializeBuffer() {
    const placeHolder = {}
    if (sequenceData) {
      Object.values(sequenceData.columns).forEach(blockData => {
        blockData.taskIds.forEach(noteId => {
          const { title, library } = sequenceData.tasks[noteId]
          placeHolder[title] = soundLibrary[library][title] //file path
        })
      })
    }
    const bufferDict = new Tone.Buffers(placeHolder, () => {
      buffer.current = bufferDict

    })
  }

  const useStyles = makeStyles(() => ({
    button: (props, play) => ({
      width: '10rem',
      height: '10rem',
      backgroundColor: `${props.sequenceState.sequences[props.index].color}`,
      boxShadow: `${play ? ('0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3') : 0}`
    })
  }));
  const classes = useStyles(props, play);

  function playTrack() {
    let currentBlock = 0;

    (function playBlock() {
      let currentNote = 0
      const currentBlockData = sequenceData.columns[sequenceData.columnOrder[currentBlock]]

      let noteSpeed = 0
      if (currentBlockData.taskIds.length > 0) {
        noteSpeed = ((props.bpm ? Math.floor(60000 / props.bpm) : 1000) * multiplier) / currentBlockData.taskIds.length
        playNote()
      } else {
        noteSpeed = (props.bpm ? Math.floor(60000 / props.bpm) : 1000) * multiplier
        currentBlock++
        if (currentBlock < sequenceData.columnOrder.length) {
          delay.current = setTimeout(playBlock, noteSpeed)
        } else {
          delay.current = setTimeout(() => playTrack(), noteSpeed)
        }
      }

      function playNote() {
        const { title } = sequenceData.tasks[currentBlockData.taskIds[currentNote]]
        const currentSound = new Tone.Player(buffer.current.get(title)).toDestination()
        currentSound.start()

        currentNote++;
        if (currentNote < currentBlockData.taskIds.length) {
          delay.current = setTimeout(playNote, noteSpeed)
        } else {
          currentBlock++
          if (currentBlock < sequenceData.columnOrder.length) {
            delay.current = setTimeout(playBlock, noteSpeed)
          } else {
            delay.current = setTimeout(() => playTrack(), noteSpeed)
          }
        }
      }
    })()
  }

  useEffect(() => {
    if (play) {
      playTrack()
    } else {
      clearTimeout(delay.current);
    }
  }, [play])

  useEffect(() => {
    setMultiplier(currentSequence.current.multiplier)
    if (sequenceData) {
      initializeBuffer()
    }
    setIsLoaded(true)
  }, [props])

  useEffect(() => {
    if (sequenceData) {
      initializeBuffer()
    }
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <>
      {/* <Button className={classes.button} onClick={() => sequenceData ? setPlay(!play) : props.setOpenDialog(props.index)}>
        {
          // (!isLoaded)
          //   ? <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          (sequenceData)
            ? <Typography>{sequenceName}</Typography>
            : <AddIcon />
        }
      </Button> */}
      <NeonButton play={play} onClick={() => sequenceData ? setPlay(!play) : props.setOpenDialog(props.index)}>
        {/* <Span1 /> */}
        {(sequenceData)
          ? <Typography>{currentSequence.current.sequenceTitle}</Typography>
          : <AddIcon />
        }
      </NeonButton>
    </>
  );
}

export default BeatButton;
