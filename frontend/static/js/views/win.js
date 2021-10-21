import abstractView from "./abstractView.js";
import { navigateTo } from "../index.js";
import { waitForMs } from "../index.js";

export default class extends abstractView {
  constructor(params) {
    super(params);
    this.setTitle("WINNER!");
  }

  async animation() {
    const body = document.querySelector("body");

    body.innerHTML = ``;

    body.innerHTML = `<img src="assets/GIF/Fight-Won.gif" style="width: 100%; height: auto;" />`;
    let waitTime = await waitForMs(7000);
  }
}
