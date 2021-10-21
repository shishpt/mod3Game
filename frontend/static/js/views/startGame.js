/*
  The startGame view is loaded when the page is opened
  Here is a kind of "flowchart" of what the code is doing
  * setTitle is used from the abstractView to set the title of the current view
  * Running the animation
    * The animation in the startscreen is abit different since it has a button with an eventListener to start the game
    * The button fires off the aminimation part and then it uses a function from the router to navigate to the next view,
      in this case to mummy
*/

import abstractView from "./abstractView.js";
import { navigateTo } from "../index.js";
import { waitForMs } from "../index.js";

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
