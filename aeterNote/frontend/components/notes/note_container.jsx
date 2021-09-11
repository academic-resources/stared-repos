import React from "react";
import { connect } from "react-redux";
import Note from "./note";
import { updateNote, createNote, fetchNote } from "../../actions/note_actions";
import {
  updateNoteDeleteWarning,
  updateNotebookSelector,
} from "../../actions/ui_actions";

import { fetchNotebooks } from "../../actions/notebook_actions";

import {
  fetchTags,
  addTagging,
  deleteTagging,
} from "../../actions/tag_actions";

const mapStateToProps = (state) => {
  const lockDelete = state.ui.selected_note ? " " : "locked";
  const note = state.ui.selected_note
    ? state.notes[state.ui.selected_note]
    : {
        title: "",
        content: "",
        plain_text: "",
        tag_ids: [],
        notebook_id: state.ui.current_notebook
          ? state.ui.current_notebook
          : Object.keys(state.notebooks)[0],
      };
  const notebook = state.notebooks[note.notebook_id]
    ? state.notebooks[note.notebook_id]
    : { title: "" };
  const notebooks = state.notebooks;
  const revealSelector = state.ui.notebook_selector
    ? "reveal-notebook-selector"
    : "hide-notebook-selector";
  const noteErrors = state.errors.notes;
  const tags = Object.values(state.tags);
  return {
    note: note,
    notebook: notebook,
    notebooks: notebooks,
    tags: tags,
    revealSelector: revealSelector,
    noteErrors: noteErrors,
    lockDelete: lockDelete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNote: (note) => dispatch(updateNote(note)),
    createNote: (note) => dispatch(createNote(note)),
    fetchNote: (noteId) => dispatch(fetchNote(noteId)),
    deleteWarning: () => dispatch(updateNoteDeleteWarning()),
    notebookSelector: () => dispatch(updateNotebookSelector()),
    resetNotebooks: () => dispatch(fetchNotebooks()),
    deleteTagging: (tagging) => dispatch(deleteTagging(tagging)),
    addTagging: (tagging) => dispatch(addTagging(tagging)),
    resetTags: () => dispatch(fetchTags()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
