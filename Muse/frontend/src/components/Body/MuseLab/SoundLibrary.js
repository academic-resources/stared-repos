import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import Task from './Task';

//Sounds
import keys1 from './sounds/keys-guitars/keys/keys1.wav';
import keys2 from './sounds/keys-guitars/keys/keys2.wav';
import keys3 from './sounds/keys-guitars/keys/keys3.wav';
import keys4 from './sounds/keys-guitars/keys/keys4.wav';
import keys5 from './sounds/keys-guitars/keys/keys5.wav';
import keys6 from './sounds/keys-guitars/keys/keys6.wav';
import keys7 from './sounds/keys-guitars/keys/keys7.wav';

import hat1 from './sounds/percussions/hat.mp3';
import claves1 from './sounds/percussions/claves.mp3';
import triangle1 from './sounds/percussions/triangle.mp3';
import shaker1 from './sounds/percussions/shaker.mp3';
import crash1 from './sounds/percussions/crash.mp3';
import conga1 from './sounds/percussions/conga.mp3';
import conga2 from './sounds/percussions/conga2.mp3';
import tom1 from './sounds/percussions/tom.mp3';
import tom2 from './sounds/percussions/tom2.mp3';

import snare1 from './sounds/808-snares/snare.wav';
import snare2 from './sounds/808-snares/snare2.wav';
import rim1 from './sounds/808-snares/rim.wav';
import clap1 from './sounds/808-snares/clap.wav';
import snap1 from './sounds/808-snares/snap.wav';

import kick1 from './sounds/808-snares/kick.wav';
import kick2 from './sounds/808-snares/kick2.wav';
import kick8081 from './sounds/808-snares/808s/8081wkick.wav';
import kick8082 from './sounds/808-snares/808s/8082wkick.wav';
import kick8083 from './sounds/808-snares/808s/8083wkick.wav';
import kick8084 from './sounds/808-snares/808s/8084wkick.wav';
import kick8085 from './sounds/808-snares/808s/8085wkick.wav';

import rest1 from './sounds/rest.wav'

export const soundLibrary = {
  'Chords': {
    'Chords_1': keys1,
    'Chords_2': keys2,
    'Chords_3': keys3,
    'Chords_4': keys4,
    'Chords_5': keys5,
    'Chords_6': keys6,
    'Chords_7': keys7,
  },
  'Percussions': {
    'Hat_1': hat1,
    'Claves_1': claves1,
    'Triangle_1': triangle1,
    'Shaker_1': shaker1,
    'Crash_1': crash1,
    'Conga_1': conga1,
    'Conga_2': conga2,
    'Tom_1': tom1,
    'Tom_2': tom2,
  },
  'Snares': {
    'Snare_1': snare1,
    'Snare_2': snare2,
    'Rim_1': rim1,
    'Clap_1': clap1,
    'Snap_1': snap1,
  },
  '808': {
    'Kick_1': kick1,
    'Kick_2': 'https://drive.google.com/file/d/1IZr9siTmFWzGEETz8FeCz3_PXIi-MTWE/view?usp=sharing',
    '808_1': kick8081,
    '808_2': kick8082,
    '808_3': kick8083,
    '808_4': kick8084,
    '808_5': kick8085,
  },
  'Misc': {
    'Rest_1': rest1,
  },
}

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 1rem;
  border-radius: .5rem;  
  width: 45rem;

  background: #212121;
  box-shadow: inset 8px 8px 16px #080808, inset -8px -8px 16px #1e1e1e;
`;

const ColumnContainer = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 10rem;
`;

const Column = (props) => {

  return (
    <TaskContainer>
      <Droppable droppableId={props.column.id} type='notes' direction='horizontal'>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </TaskContainer>
  );
}


export const initializeSequencerLibrary = () => {
  const columns = {}
  const allTasks = {}

  Object.keys(soundLibrary).map((library, i) => {
    const tasks = {}

    Object.keys(soundLibrary[library]).map((note, j) => {
      const newId = `${library}-${note}`
      tasks[newId] = {
        id: newId,
        title: note,
        library: library
      }
      allTasks[newId] = {
        id: newId,
        title: note,
        library: library,
      }
    })

    columns[library] = {
      id: library,
      title: library,
      taskIds: Object.keys(tasks)
    }
  });

  const columnOrder = Object.keys(columns);
  const noteLibrary = {
    tasks: allTasks,
    columns: columns,
    columnOrder: columnOrder,
  }

  return noteLibrary
}

export const SequencerLibrary = () => {
  const [noteLibrary, setNoteLibrary] = useState(initializeSequencerLibrary());

  const slides = [
    { title: 'First Library', description: 'Lorem ipsum' },
    { title: 'Second Library', description: 'Lorem ipsum' },
  ];

  return (
    <Slider>
      {noteLibrary.columnOrder.map((columnId, index) => {
        const column = noteLibrary.columns[columnId];
        const tasks = column.taskIds.map(taskId => noteLibrary.tasks[taskId])

        return (
          <ColumnContainer key={column.id}>
            <div style={{ color: '#AFB1D4' }}>{columnId}</div>
            <Column
              column={column}
              tasks={tasks}
              index={index}
            />
          </ColumnContainer>
        )
      })}
    </Slider>
  );
}
