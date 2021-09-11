import { connect } from "react-redux";
import TagForm from "./tag_form";
import { updateTagFormModal } from "../../actions/ui_actions";
import { createTag, removeTagErrors } from "../../actions/tag_actions";

const mapStateToProps = (state) => {
  const revealIndex = state.ui.tag_form ? "reveal-tag-form" : "hide-tag-form";
  return {
    reveal: revealIndex,
    label: "",
    errors: state.errors.tags,
    formType: "Create",
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    updateTagFormModal: () => dispatch(updateTagFormModal()),
    processForm: (tag) => dispatch(createTag(tag)),
    removeErrors: () => dispatch(removeTagErrors()),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(TagForm);
