import axios from "axios";
import { observable, action } from "mobx";
import { RootStore } from ".";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:3001/";
}

class ApiStore {
  @observable data: Viz.Data;
  @observable ok: boolean = false;
  @observable loading: boolean = false;
  @observable error: null | string = null;
  @observable root: RootStore;
  @observable issueForm: boolean = false;
  constructor(store: RootStore) {
    this.root = store;
    this.ok = true;
    window.addEventListener("error", ({ error }) => {
      const errorObj: any = {};

      Object.getOwnPropertyNames(error).forEach(function (key) {
        errorObj[key] = error[key];
      });
      errorObj.stepType = this.root.iterator.step
        ? this.root.iterator.step.type
        : null;
      this.postIssue(JSON.stringify(errorObj));
    });
  }
  @action async runCode(code: string) {
    try {
      code = "\n" + code + "\n";
      this.loading = true;
      const res = await axios.post(
        "/execute",
        { code, language: this.root.language },
        { withCredentials: true }
      );
      const data: Viz.Data = res.data;
      this.root.initialize(data);
      window.localStorage.setItem(
        "data_" + this.root.language,
        JSON.stringify(data)
      );
      this.error = null;
      this.loading = false;
      this.ok = true;
    } catch (e) {
      console.log(e);
      if (e.response) {
        this.error = e.response.data.toString();
      } else {
        this.error = e.message;
      }
      this.loading = false;
    }
  }
  @action async postIssue(description: string) {
    try {
      const code = this.root.viz.code;
      this.loading = true;
      await axios.post("/issues", { code, description });
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
    this.issueForm = false;
  }
  @action startPostingIssue() {
    this.issueForm = true;
    if (this.root.iterator) {
      this.root.iterator.pause();
    }
  }
  @action stopPostingIssue() {
    this.issueForm = false;
  }
}

export default ApiStore;
