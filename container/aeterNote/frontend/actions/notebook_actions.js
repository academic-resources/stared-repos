import * as APIUtil from "../util/notebook_api_util";

export const RECEIVE_NOTEBOOKS = 'RECEIVE_NOTEBOOKS';
export const RECEIVE_NOTEBOOK = 'RECEIVE_NOTEBOOK';
export const REMOVE_NOTEBOOK = 'REMOVE_NOTEBOOK';
export const RECEIVE_NOTEBOOK_ERRORS = 'RECEIVE_NOTEBOOK_ERRORS';
export const REMOVE_NOTEBOOK_ERRORS = 'REMOVE_ERRORS';

const receiveNotebooks = notebooks => {
  return {
    type: RECEIVE_NOTEBOOKS,
    notebooks
  };
};

const receiveNotebook = notebook => {
  return {
    type: RECEIVE_NOTEBOOK,
    notebook
  };
};

const removeNotebook = notebookId => {
  return {
    type: REMOVE_NOTEBOOK,
    notebookId
  };
};

const receiveNotebookErrors = errors => {
  return {
    type: RECEIVE_NOTEBOOK_ERRORS,
    errors
  };
};

export const removeNotebookErrors = () => {
  return {
    type: REMOVE_NOTEBOOK_ERRORS
  };
};

export const fetchNotebooks = () => dispatch => {
  return APIUtil.fetchNotebooks().then(
      notebooks => dispatch(receiveNotebooks(notebooks)),
      errors => dispatch(receiveNotebookErrors(errors.responseJSON))
    );
};

export const fetchNotebook = id => dispatch => {
  return APIUtil.fetchNotebook(id).then(
      notebook => dispatch(receiveNotebook(notebook)),
      errors => dispatch(receiveNotebookErrors(errors.responseJSON))
    );
};

export const createNotebook = notebook => dispatch => {
  return APIUtil.createNotebook(notebook).then(
      newNotebook => dispatch(receiveNotebook(newNotebook)),
      errors => dispatch(receiveNotebookErrors(errors.responseJSON))
    );
};

export const updateNotebook = notebook => dispatch => {
  return APIUtil.updateNotebook(notebook).then(
      newNotebook => dispatch(receiveNotebook(newNotebook)),
      errors => dispatch(receiveNotebookErrors(errors.responseJSON))
    );
};

export const deleteNotebook = notebookId => dispatch => {
  return APIUtil.deleteNotebook(notebookId).then(
      notebook => dispatch(removeNotebook(notebookId)),
      errors => dispatch(receiveNotebookErrors(errors.responseJSON))
    );
};
