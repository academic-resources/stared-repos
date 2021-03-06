import React, { Component } from "react";
import ValDisplay from "./compose_components/ValDisplay";
import store from "../store";
import { observer } from "mobx-react";

type display = {
  char: string;
  anim: [boolean, boolean];
};

type State = {
  display: display[];
};

@observer
class InvalidScreenWidth extends Component {
  state: State = {
    display: ["O", "O", "P", "S", "!"].map((char) => ({
      char,
      anim: [true, true],
    })),
  };
  i: number = 0;
  timer: any = null;
  componentDidMount() {
    this.startAnim();
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  startAnim() {
    this.timer = setTimeout(() => {
      const newDisplay = [...this.state.display];
      newDisplay[this.i].anim = [true, true];
      this.i = (this.i + 1) % this.state.display.length;
      this.setState(
        {
          display: newDisplay,
        },
        () => {
          this.startAnim();
        }
      );
    }, 500);
  }

  render() {
    return (
      <div className="invalid-screen-width">
        <div className="oops">
          {this.state.display.map((v, i) => {
            const { char, anim } = v;
            return (
              <ValDisplay
                key={i}
                color={store.settings.configColors["Step Slider Track"]}
                size={50}
                anim={anim}
                textDisplay={char}
                highlight={false}
                objectId={char}
              />
            );
          })}
        </div>
        <div className="has-text-white has-text-centered">
          Your screen's width is{" "}
          <span className="has-text-danger has-text-weight-bold">
            {store.windowWidth}
          </span>
          . It needs to be at least{" "}
          <span className="has-text-success has-text-weight-bold">
            {store.minWidth}
          </span>
          .
        </div>
      </div>
    );
  }
}

export default InvalidScreenWidth;
