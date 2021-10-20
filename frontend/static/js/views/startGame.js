import abstractView from "./abstractView.js";
import { navigateTo } from "../index.js";

export default class extends abstractView {
  constructor(params) {
    super(params);
    this.setTitle("Start Game");
  }

  async animation() {
    const body = document.querySelector("body");

    body.innerHTML = `<div class="tvContainer">
                        <img
                            src="assets/PNG/TV.png"
                            style="width: 100%; height: 100%; background-color: black"
                        />
                        <button class="start-game-btn btn">Start Game</button>
                    </div>`;
    const waitForMs = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const runIntro = async () => {
      body.innerHTML = `<img src="assets/GIF/Console.gif" style="width: 100%; height: auto;" />`;
      let waitTime = await waitForMs(5000);
      body.innerHTML = `<img src="assets/GIF/TV.gif" style="width: 100%; height: 100%" />`;
      waitTime = await waitForMs(3000);
      body.innerHTML = `<img src="assets/GIF/TV-Suck.gif" style="width: 100%; height: 100%" />`;
      waitTime = await waitForMs(1250);
      navigateTo("/mummy");
    };

    document.querySelector(".start-game-btn").addEventListener("click", () => {
      runIntro();
    });
  }
}
