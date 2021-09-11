import * as APIUtil from "../util/note_api_util";

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const RECEIVE_NOTE_ERRORS = 'RECEIVE_NOTE_ERRORS';
export const REMOVE_NOTE_ERRORS = 'REMOVE_NOTE_ERRORS';

const receiveNotes = notes => {
  return {
    type: RECEIVE_NOTES,
    notes
  };
};

const receiveNote = note => {
  return {
    type: RECEIVE_NOTE,
    note
  };
};

const removeNote = noteId => {
  return {
    type: REMOVE_NOTE,
    noteId
  };
};

const receiveNoteErrors = errors => {
  return {
    type: RECEIVE_NOTE_ERRORS,
    errors
  };
};

export const removeNoteErrors = () => {
  return {
    type: REMOVE_NOTE_ERRORS
  };
};

export const fetchNotes = () => dispatch => {
  return APIUtil.fetchNotes().then(
      notes => dispatch(receiveNotes(notes)),
      errors => dispatch(receiveNoteErrors(errors.responseJSON))
    );
};

export const fetchNote = id => dispatch => {
  return APIUtil.fetchNote(id).then(
      note => dispatch(receiveNote(note)),
      errors => dispatch(receiveNoteErrors(errors.responseJSON))
    );
};

export const createNote = note => dispatch => {
  return APIUtil.createNote(note).then(
      newNote => dispatch(receiveNote(newNote)),
      errors => dispatch(receiveNoteErrors(errors.responseJSON))
    );
};

export const updateNote = note => dispatch => {
  return APIUtil.updateNote(note).then(
      newNote => dispatch(receiveNote(newNote)),
      errors => dispatch(receiveNoteErrors(errors.responseJSON))
    );
};

export const deleteNote = noteId => dispatch => {
  return APIUtil.deleteNote(noteId).then(
      note => dispatch(removeNote(noteId)),
      errors => dispatch(receiveNoteErrors(errors.responseJSON))
    );
};
