const LOAD_TEMPLATES = "template/LOAD_TEMPLATES";
const CURRENT_TEMPLATE = "template/CURRENT_TEMPLATE";
const CLEAR_TEMPLATES = "template/CLEAR_TEMPLATES";
const LOAD_STYLES = "template/LOAD_STYLES";
const ADD_FIELD = "template/ADD_FIELD";
const REMOVE_FIELD = "template/REMOVE_FIELD";

const template_loading = (templates) => ({
  type: LOAD_TEMPLATES,
  templates,
});

const current_template = (template) => ({
  type: CURRENT_TEMPLATE,
  template,
});

const clear_templates = () => ({
  type: CLEAR_TEMPLATES,
});

const load_styles = (styles) => ({
  type: LOAD_STYLES,
  styles,
});

const add_field = (field) => ({
  type: ADD_FIELD,
  field,
});

const remove_field = (field) => ({
  type: REMOVE_FIELD,
  field,
});

export const getTemplates = () => async (dispatch) => {
  const response = await fetch(`/api/templates/`);
  const res = await response.json();
  dispatch(template_loading(res));
  return res;
};

export const clearTemplates = () => async (dispatch) => {
  await dispatch(clear_templates());
  return;
};

export const loadStyles = () => async (dispatch) => {
  const response = await fetch(`/api/templates/styles`);
  const res = await response.json();
  dispatch(load_styles(res));
  return;
};

export const updateCurrentTemplate = (template) => async (dispatch) =>
  dispatch(current_template(template));

export const addFieldTemplate = (field) => async (dispatch) => {
  dispatch(add_field(field));
};

export const removeFieldTemplate = (field) => async (dispatch) => {
  dispatch(remove_field(field));
};

const templateReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_TEMPLATES: {
      newState = Object.assign({}, state);
      newState.templates = action.templates;
      return newState;
    }
    case CURRENT_TEMPLATE: {
      newState = Object.assign({}, state);
      newState.current = action.template;
      return newState;
    }
    case CLEAR_TEMPLATES: {
      newState = {};
      return newState;
    }
    case LOAD_STYLES: {
      newState = Object.assign({}, state);
      newState.styles = action.styles;
      return newState;
    }
    case ADD_FIELD:
      newState = Object.assign({}, state);
      newState.current.fields.splice(action.field.order, 0, action.field);
      for (
        let i = action.field.order;
        i < newState.current.fields.length;
        i++
      ) {
        newState.current.fields[i].order++;
      }
      return newState;
    case REMOVE_FIELD:
      newState = Object.assign({}, state);
      newState.current.fields.splice(action.field.order, 1);
      for (
        let i = action.field.order - 1;
        i < newState.current.fields.length;
        i++
      ) {
        newState.current.fields[i].order--;
      }
      return newState;
    default:
      return state;
  }
};

export default templateReducer;
