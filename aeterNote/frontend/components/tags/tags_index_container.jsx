import { connect } from "react-redux";
import {
  fetchTags,
  fetchTag,
  createTag,
  updateTag,
  deleteTag,
} from "../../actions/tag_actions";
import {
  updateTagFormModal,
  updateTagSelected,
  updateTagDeleteWarning,
  updateTagTab,
} from "../../actions/ui_actions";
import TagsIndex from "./tags_index";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
  let revealIndex;
  if (state.ui.tag_tab === null) {
    revealIndex = "hidden";
  } else if (state.ui.tag_tab) {
    revealIndex = "reveal-tag-index";
  } else {
    revealIndex = "hide-tag-index";
  }
  const revealModal = state.ui.tag_tab
    ? "reveal-tag-modal-bg"
    : "hide-tag-modal-bg";

  return {
    reveal: revealIndex,
    revealModal: revealModal,
    tags: Object.values(state.tags),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    updateTagFormModal: () => dispatch(updateTagFormModal()),
    updateTagSelected: (notebookId) => dispatch(updateTagSelected(notebookId)),
    deleteWarning: () => dispatch(updateTagDeleteWarning()),
    tagTab: () => dispatch(updateTagTab()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TagsIndex)
);
