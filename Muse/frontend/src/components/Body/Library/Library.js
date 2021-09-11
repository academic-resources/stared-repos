import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: '#feeafa',
  },
});

const BoardTables = ({ boards }) => {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path)
  }

  return (
    <TableBody>
      {
        Object.keys(boards).map((board) => (
          <TableRow key={board}>

            <TableCell component="th" scope="row">
              <Typography><Button onClick={() => handleClick(`/board/${boards[board].id}`)}>
                {boards[board].title}
              </Button></Typography>
            </TableCell>
            <TableCell align="right">{boards[board].user_id}</TableCell>
            <TableCell align="right">{boards[board].date_created}</TableCell>
          </TableRow>
        ))
      }
    </TableBody>
  )
}

const LibraryPage = () => {
  const classes = useStyles()
  const [isLoaded, setIsLoaded] = useState(false)
  const list_of_boards = useSelector(state => state.session.boards)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded && (
    <>
      {
        (list_of_boards && Object.keys(list_of_boards).length > 0)
          ? (<TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Board</TableCell>
                  <TableCell align="right">Artist Id</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <BoardTables boards={list_of_boards} />
            </Table>
          </TableContainer>
          )
          : <Typography>No Boards to show. Please create a board first.</Typography>
      }
    </>
  );
}

export default LibraryPage;
