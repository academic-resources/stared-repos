import React, { useState } from 'react';
import styled from 'styled-components'

import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  width: 3rem;
  margin: .5rem;
  padding: 1rem;
  border-radius: .25rem;

  text-align: center;
  background: linear-gradient(145deg, #232323, #1e1e1e);

  box-shadow:  8px 8px 16px #080808,
             -8px -8px 16px #1e1e1e;

  color: #AFB1D4;
`

const Task = (props) => {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.task.title}
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
