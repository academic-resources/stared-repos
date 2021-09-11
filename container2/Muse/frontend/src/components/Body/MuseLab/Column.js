import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './Task';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 1rem;
  border-radius: .5rem;
  min-height: 8rem;
  width: 10rem;

  background: #131313;
  box-shadow: inset 8px 8px 16px #080808, inset -8px -8px 16px #1e1e1e;
`;

const Title = styled.h3`
  min-height: 1rem;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 10rem;
  min-width: 5rem;
`;

const Column = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // console.log('column data changed')
  }, [props])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={props.column.id} type='notes'>
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
        </Container>
      )}
    </Draggable>
  )
}

export default Column;
