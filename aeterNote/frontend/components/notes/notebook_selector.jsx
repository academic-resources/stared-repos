import React from "react";
import { connect } from "react-redux";
import {
  updateNotebookFormModal,
  updateNotebookSelected,
  updateNotebookSelector,
} from "../../actions/ui_actions";

class NotebookSelector extends React.Component {
  render() {
    return (
      <div className={`notebook-options-selection ${this.props.reveal}`}>
        <ul className="notebook-options">
          <div
            className="create-new-notebook"
            onClick={() => this.props.notebookFormModal()}
          >
            Create new notebook
          </div>
          {this.props.notebooks.map((notebook) => {
            return (
              <div key={notebook.id} className="title-item">
                <div className="top-border"></div>
                <li
                  onClick={() => {
                    console.log(notebook.id);
                    this.props.collectNotebook(notebook.id);
                    // console.log(`if this has state...:${this.state.notebook_id}`);
                    this.props.notebookSelector();
                  }}
                >
                  {notebook.title}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    notebookFormModal: () => dispatch(updateNotebookFormModal()),
    notebookSelected: (id) => dispatch(updateNotebookSelected(id)),
    notebookSelector: () => dispatch(updateNotebookSelector()),
  };
};

export default connect(null, mapDispatchToProps)(NotebookSelector);
