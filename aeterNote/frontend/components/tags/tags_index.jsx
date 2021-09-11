import React from "react";
import TagIndexItem from "./tags_index_item";

class TagsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    // this.forceUpdate();
  }

  componentDidMount() {
    this.props.fetchTags();
  }

  render() {
    const { tags } = this.props;
    const { reveal } = this.props;
    const { revealModal } = this.props;
    const { updateTagFormModal } = this.props;
    const { updateTagSelected } = this.props;
    const { deleteWarning } = this.props;
    const { tagTab } = this.props;

    return (
      <div>
        <div
          className={`tagmodalbg ${revealModal}`}
          id="tags"
          onClick={() => tagTab()}
        >
          <div className={`tags ${reveal}`}>
            <header>
              <h3>TAGS</h3>
              <button onClick={() => updateTagFormModal()}>
                <img src={window.staticImages.grayTagPlus} />
              </button>
            </header>

            <ul className="tags-ul">
              {tags.map((tag) => {
                return <TagIndexItem key={tag.id} tag={tag} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TagsIndex;
