import React, { useEffect, useState, useRef } from 'react';
import * as Tone from 'tone';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

//Components
import { soundLibrary, SequencerLibrary } from './SoundLibrary';
import Column from './Column';

//MUI
import { makeStyles, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import IconButton from '@material-ui/core/IconButton';

//Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';





const Root = styled.div`
  background: #212121;
  width: fit-content;

`

const Container = styled.div`
 display: flex;
 width: fit-content;
//  border: solid red;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #edf2f4;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #edf2f4;
`

const useStyles = makeStyles((props) => ({
  expandIcon: {
    colorPrimary: 'white',
  },
  accordion: {
    backgroundColor: '#212121'
  },
  white: {
    color: '#AFB1D4',
    textAlign: 'center',
    "&::placeholder": {
      color: "#AFB1D4",
      textAlign: "center"
    }
  }
}))





const initialData = () => ({
  tasks: {
  },
  columns: {
    'block-1': {
      id: 'block-1',
      title: 'block-1',
      taskIds: [],
    },
    'block-2': {
      id: 'block-2',
      title: 'block-2',
      taskIds: [],
    },
    'block-3': {
      id: 'block-3',
      title: 'block-3',
      taskIds: [],
    },
    'block-4': {
      id: 'block-4',
      title: 'block-4',
      taskIds: [],
    },
  },
  //facilitate reordering
  columnOrder: ['block-1', 'block-2', 'block-3', 'block-4'],
})

const Sequencer = (props) => {
  const classes = useStyles()

  const currentSequence = props.sequenceState.sequences[props.index];
  const sequenceData = useRef(initialData());
  const [tempSeq, setTempSeq] = useState()
  const buffer = useRef()
  const delay = useRef()

  const [sequenceName, setSequenceName] = useState(props.index ? currentSequence.sequenceTitle : '');
  const [multiplier, setMultiplier] = useState(props.index ? currentSequence.multiplier : 1);
  const [bpm] = useState(props.bpm ? Math.floor(60000 / props.bpm) : 1000);
  const [play, setPlay] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);


  const initializeBuffer = () => {
    const placeHolder = {}
    if (sequenceData.current) {
      Object.values(sequenceData.current.columns).forEach(blockData => {
        blockData.taskIds.forEach(noteId => {
          const { title, library } = sequenceData.current.tasks[noteId]
          placeHolder[title] = soundLibrary[library][title] //file path
        })
      })
    }
    const bufferDict = new Tone.Buffers(placeHolder, () => {
      buffer.current = bufferDict
      setIsLoaded(isLoaded)
    })
  }

  const handleChange = (e, location) => {
    switch (location) {
      case 'name':
        setSequenceName(e.target.value)
        return;
      case 'multiplier':
        setMultiplier(e)
        return;
    }
  }

  const maxColumnId = () => {
    let max = 0;
    sequenceData.current.columnOrder.forEach((column, i) => {
      const currentId = parseInt(column.split('-')[1])
      if (currentId > max) max = currentId
    });

    return max
  }

  const maxTaskId = () => {
    let max = 0;
    sequenceData.current.columnOrder.forEach((column, i) => {
      sequenceData.current.columns[column].taskIds.forEach((task, j) => {
        let currentId = task
        if (task.includes('-')) {
          currentId = parseInt(task.split('-')[2])
          if (currentId > max) {
            max = currentId;
          }
        }
      })
    });
    return max
  }

  const handleNewBlock = () => {
    const newId = `block-${maxColumnId() + 1}`
    const newColumn = {
      id: newId,
      title: newId,
      taskIds: [],
    }

    const newState = {
      ...sequenceData.current,
      columns: {
        ...sequenceData.current.columns,
        [newId]: newColumn,
      },
      columnOrder: [
        ...sequenceData.current.columnOrder,
        newId
      ]
    }
    sequenceData.current = newState
    setTempSeq(sequenceData.current)
  }

  const handleBlockDelete = () => {
    const idToDelete = sequenceData.current.columnOrder[sequenceData.current.columnOrder.length - 1]
    const newState = sequenceData.current;
    newState.columnOrder.pop()
    delete newState.columns[idToDelete]

    if (Object.keys(newState.columns) > 0) {
      sequenceData.current = newState
      setTempSeq(sequenceData.current)
    }
  }

  const handleSubmit = () => {
    setPlay(true, props.handleClose())
    const newBeatPadState = props.sequenceState;
    newBeatPadState.sequences[props.index].sequenceData = sequenceData.current
    newBeatPadState.sequences[props.index].multiplier = multiplier
    newBeatPadState.sequences[props.index].sequenceTitle = (sequenceName !== '') ? sequenceName : 'Sequence Name';

    props.setSequenceState(newBeatPadState)
  }

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    //will do nothing if you try to move into same columm at same place.
    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) return;

    //if trying to move columns
    if (type === 'column') {
      const newColumnOrder = Array.from(sequenceData.current.columnOrder);
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...sequenceData.current,
        columnOrder: newColumnOrder,
      }

      sequenceData.current = newState
      setTempSeq(sequenceData.current)
      return;
    }

    //if moving from library
    if (!sequenceData.current.columnOrder.includes(source.droppableId)) {
      if (source.droppableId === destination.droppableId) return;

      //get basic info
      const finish = sequenceData.current.columns[destination.droppableId];
      let currentId = draggableId.split('-')
      const noteName = `${currentId[1]}`;
      const newId = `${draggableId}-${maxTaskId() + 1}`;

      //get library
      let currentLibrary
      Object.keys(soundLibrary).forEach(libraryName => {
        if (soundLibrary[libraryName][noteName]) {
          currentLibrary = libraryName;
        }
      })

      if (noteName && finish) {
        const newTask = {
          id: newId,
          title: noteName,
          library: currentLibrary,
        }

        const newState = sequenceData.current;
        newState.columns[destination.droppableId].taskIds.push(newId)
        newState.tasks[newId] = newTask;

        sequenceData.current = newState;
        setTempSeq(newState, console.log('tempSeq: ', tempSeq, ' sequenceData: ', sequenceData.current, ' newState: ', newState))
        initializeBuffer()
        return;
      }
      return;
    }

    //if deleteing note
    if (!sequenceData.current.columnOrder.includes(destination.droppableId)) {
      const newState = sequenceData.current;

      const index = newState.columns[source.droppableId].taskIds.indexOf(draggableId);

      newState.columns[source.droppableId].taskIds.splice(index, 1)
      delete newState.tasks[draggableId]

      sequenceData.current = newState
      setTempSeq(sequenceData.current)
      return;
    }

    const start = sequenceData.current.columns[source.droppableId];
    const finish = sequenceData.current.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...sequenceData.current,
        columns: {
          ...sequenceData.current.columns,
          [newColumn.id]: newColumn,
        },
      }

      sequenceData.current = newState
      setTempSeq(sequenceData.current)
      return;
    }

    //removing from old column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    //adding to new column
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    //creating new state with changes
    const newState = {
      ...sequenceData.current,
      columns: {
        ...sequenceData.current.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    sequenceData.current = newState
    setTempSeq(sequenceData.current)
    return;
  }

  function playTrack() {
    let currentBlock = 0;

    (function playBlock() {
      let currentNote = 0
      const currentBlockData = sequenceData.current.columns[sequenceData.current.columnOrder[currentBlock]]

      let noteSpeed = 0
      if (currentBlockData.taskIds.length > 0) {
        noteSpeed = (bpm * multiplier) / currentBlockData.taskIds.length
        play && playNote()
      } else {
        noteSpeed = bpm * multiplier
        currentBlock++
        if (currentBlock < sequenceData.current.columnOrder.length) {
          delay.current = setTimeout(() => play && playBlock(), noteSpeed)
        } else {
          delay.current = setTimeout(() => play && playTrack(), noteSpeed)
        }
      }

      function playNote() {
        const { title } = sequenceData.current.tasks[currentBlockData.taskIds[currentNote]]

        const currentBuffer = buffer.current.get(title)
        const currentSound = new Tone.Player(currentBuffer.get()).toDestination()

        currentSound.start()

        currentNote++;
        if (currentNote < currentBlockData.taskIds.length) {
          delay.current = setTimeout(() => play && playNote(), noteSpeed)
        } else {
          currentBlock++
          if (currentBlock < sequenceData.current.columnOrder.length) {
            delay.current = setTimeout(() => play && playBlock(), noteSpeed)
          } else {
            delay.current = setTimeout(() => play && playTrack(), noteSpeed)
          }
        }
      }
    })()
  }





  useEffect(() => {
    console.log('Sense change in useRef')
  }, [sequenceData.current])

  useEffect(() => {
    if (sequenceData.current) {
      if (play) {
        playTrack()
      } else {
        clearTimeout(delay.current);
      }
    }
  }, [play])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <Root>
      <Header>
        <TextField
          placeholder={"Sequence Name"}
          value={sequenceName}
          onChange={(e) => handleChange(e, 'name')}
          inputProps={{
            className: classes.white
          }}
        />
        <ButtonContainer>
          <Button className={classes.white} onClick={() => handleChange(2, 'multiplier')} >2</Button>
          <Button className={classes.white} onClick={() => handleChange(1, 'multiplier')} >1</Button>
          <Button className={classes.white} onClick={() => handleChange(1 / 2, 'multiplier')} >1/2</Button>
          <Button className={classes.white} onClick={() => handleChange(1 / 4, 'multiplier')} >1/4</Button>
          <Button className={classes.white} onClick={() => handleChange(1 / 8, 'multiplier')} >1/8</Button>
        </ButtonContainer>
      </Header>

      <ButtonContainer style={{ justifyContent: 'center' }}>
        <IconButton onClick={() => sequenceData.current && setPlay(!play)}>
          {(play)
            ? <PauseRoundedIcon className={classes.white} />
            : <PlayArrowRoundedIcon className={classes.white} />}
        </IconButton>
        <IconButton onClick={() => handleNewBlock()}>
          <AddIcon className={classes.white} />
        </IconButton>
        <IconButton onClick={() => handleBlockDelete()}>
          <RemoveIcon className={classes.white} />
        </IconButton>
      </ButtonContainer>

      <DragDropContext
        onDragEnd={handleOnDragEnd}
      >
        <Droppable
          droppableId='track'
          direction='horizontal'
          type='column'
        >
          {(provided) => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {sequenceData.current.columnOrder.map((columnId, index) => {
                const column = sequenceData.current.columns[columnId];
                const tasks = column.taskIds.map(taskId => sequenceData.current.tasks[taskId])

                return <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />;
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>

        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon className={classes.white} />} >
            <Typography className={classes.white}>Library</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SequencerLibrary props={sequenceData.current} />
          </AccordionDetails>
        </Accordion>

      </DragDropContext>
      <ButtonContainer style={{ justifyContent: 'center' }}>
        <Button className={classes.white} onClick={() => handleSubmit()}>Save</Button>
      </ButtonContainer>
    </Root>
  );
}

export default Sequencer;
