import React from "react";

class TagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  componentWillReceiveProps() {
    this.setState({ label: "" });
  }

  handleSubmit(e) {
    e.preventDefault();
    const tag = Object.assign({}, this.state);
    this.props
      .processForm(tag)
      .then((newTag) => this.props.updateTagFormModal());
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  render() {
    const { reveal } = this.props;
    const { updateTagFormModal } = this.props;
    return (
      <div className={`form-modal ${reveal}`}>
        <div className="container">
          <img className="plus-logo" src={window.staticImages.grayTagPlus} />
          <h3>
            {`${this.props.formType.toUpperCase()} TAG`}
            <div className="bottom-border" />
          </h3>
          <form className="notebook-form" onSubmit={this.handleSubmit}>
            <ul className="errors">
              {this.props.errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>

            <input
              className="title"
              type="text"
              placeholder="Label your tag"
              value={this.state.label}
              onChange={this.update("label")}
            />
            <div className="form-buttons">
              <button
                className="notebook-button notebook-cancel"
                onClick={(e) => {
                  e.preventDefault();
                  updateTagFormModal();
                }}
              >
                Cancel
              </button>
              <input
                className="notebook-button notebook-submit"
                type="submit"
                value={`${this.props.formType}`}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TagForm;
