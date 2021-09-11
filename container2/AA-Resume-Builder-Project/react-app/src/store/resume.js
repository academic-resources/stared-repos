const LOAD_RESUMES = "resume/LOAD_RESUMES";
const CLEAR_RESUMES = "resume/CLEAR_RESUMES";
const EDIT_RESUMES = "resume/EDIT_RESUMES";
const DELETE_RESUME = "resume/DELETE_RESUME";
const ADD_FIELD = "resume/ADD_FIELD";
const REMOVE_FIELD = "resume/REMOVE_FIELD";

const resume_loading = (resumes) => ({
  type: LOAD_RESUMES,
  resumes,
});

const clear_resumes = () => ({
  type: CLEAR_RESUMES,
});

const edit_resumes = (resume) => ({
  type: EDIT_RESUMES,
  resume,
});

const delete_resume = (id) => ({
  type: DELETE_RESUME,
  id,
});

const add_field = (field) => ({
  type: ADD_FIELD,
  field,
});

const remove_field = (field) => ({
  type: REMOVE_FIELD,
  field,
});

export const getResumes = () => async (dispatch) => {
  const response = await fetch(`/api/resumes/`);
  const res = await response.json();
  dispatch(resume_loading(res));
};

export const getOneResume = (id) => async (dispatch) => {
  const response = await fetch(`/api/resumes/${id}`);
  const res = await response.json();
  dispatch(resume_loading(res));
};

export const deleteAResume = (id) => async (dispatch) => {
  const response = await fetch(`/api/resumes/delete/${id}`, {
    method: "DELETE",
  });
  const res = await response.json();
  dispatch(delete_resume(res));
};

export const clearResumes = () => async (dispatch) => {
  await dispatch(clear_resumes());
  return;
};

export const saveResumes = (resumeData) => async (dispatch) => {
  const response = await fetch(`/api/resumes/save`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(resumeData),
  });
};

export const editResumes = (resumeId) => async (dispatch) => {
  const response = await fetch(`/api/resumes/edit/${resumeId}`);
  const res = await response.json();
  dispatch(edit_resumes(res));
  return res;
};

export const addFieldSaved = (field) => async (dispatch) => {
  dispatch(add_field(field));
};

export const removeFieldSaved = (field) => async (dispatch) => {
  dispatch(remove_field(field));
};

const resumeReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_RESUMES:
      newState = {};
      newState.resume = action.resumes;
      return newState;
    case CLEAR_RESUMES:
      newState = {};
      return newState;
    case EDIT_RESUMES:
      newState = {};
      newState.resume = action.resume;
      return newState;
    case DELETE_RESUME:
      newState = {};
      newState.resume = action.id;
      return newState;
    case ADD_FIELD:
      newState = Object.assign({}, state);
      newState.resume.fields.splice(action.field.order, 0, action.field);
      for (let i = action.field.order; i < newState.resume.fields.length; i++) {
        newState.resume.fields[i].order++;
      }
      return newState;
    case REMOVE_FIELD:
      newState = Object.assign({}, state);
      newState.resume.fields.splice(action.field.order, 1);
      for (
        let i = action.field.order - 1;
        i < newState.resume.fields.length;
        i++
      ) {
        newState.resume.fields[i].order--;
      }
      return newState;
    default:
      return state;
  }
};

export default resumeReducer;
