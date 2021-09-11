import React from "react";
import SideNav from "../navbars/side_nav_container";
import Notes from "../notes/notes_index_container";
import CreateNotebook from "../notebooks/create_notebook_form_container";
import UpdateNotebook from "../notebooks/update_notebook_form_container";
import NotebookShow from "../notebooks/notebook_show_container";
import DeleteWarning from "../notebooks/notebook_delete_warning";
import Notebooks from "../notebooks/notebooks_index_container";
import NoteShow from "./note_show";
import Tags from "../tags/tags_index_container";
import CreateTag from "../tags/create_tag_form_container";
import TagDeleteWarning from "../tags/tag_delete_warning";

// import ReactQuill from 'react-quill';

// const NoteHome = () => {
class NoteHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="modal-holder">
        <CreateNotebook />
        <DeleteWarning />
        <CreateTag />
        <TagDeleteWarning />

        <main className="notes-main">
          <SideNav />

          <Notes />
          <Notebooks />
          <Tags />

          <div className=" note-show-wrapper">
            <NoteShow />
          </div>
        </main>
      </div>
    );
  }
}

export default NoteHome;

// <img className='logo' src={window.staticImages.logoMain} />
// <article>
//   <p>Tibi gratias ago pro cum stetissent iuxta!</p>
//   <p>-Thanks for stopping by!</p>
//   <p>Check back soon for more elephantastic-features!</p></article>
