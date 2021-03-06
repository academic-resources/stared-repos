import { observable, action, computed } from "mobx";
import { RootStore } from ".";

class Token {
  index: number;
  char: string;
  code: CodeStore;
  constructor(char: string, idx: number, code: CodeStore) {
    this.char = char;
    this.index = idx;
    this.code = code;
  }
  @computed get highlight() {
    const { start, end } = this.code;
    const sliceable = !(start === undefined || end === undefined);

    if (sliceable && this.index >= start && this.index < end) {
      return true;
    }
    return false;
  }
}

class CodeStore {
  @observable tokenMap: Array<Token> = [];
  root: RootStore;
  @observable start: void | number;
  @observable end: void | number;
  @observable expression: string;
  @observable value: any = undefined;
  constructor(store: RootStore) {
    this.root = store;
    this.setCode(store.viz.code);
  }
  @action setCode(code: string) {
    this.tokenMap = code.split("").map((char, i) => new Token(char, i, this));
  }
  @action update() {
    const name = this.root.iterator.name;
    if (name && this.root.settings.config["Code Display"]) {
      const [start, end] = name;
      this.start = start;
      this.end = end;
      if (this.root.allowRender) {
        const first = document.querySelector(".token-" + this.start);
        if (first) {
          first.scrollIntoView();
        }
      }
      this.expression = this.root.viz.code.slice(start, end);
      this.value = this.root.iterator.step.value;
    } else {
      if (this.root.iterator.index === 0) {
        this.start = undefined;
        this.end = undefined;
      }
    }
  }
}

export default CodeStore;
