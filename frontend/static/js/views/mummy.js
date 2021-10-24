/*
  The Mummy view and any view for an enemy will be quite simular
  Here is a kind of "flowchart" of what the code is doing
  * setTitle is used from the abstractView to set the title of the current view
  * Running the animation
  * Resetting the body HTML to the battle scene
  * load main.js to the view
  * Importing stuff that is unique to this view
    * images of the enemy
    * healthbars
*/

import abstractView from "./abstractView.js";
import { waitForMs } from "../index.js";
import { resetHTML } from "./resetHTMLBody.js";

const body = document.querySelector("body");

export default class extends abstractView {
  constructor(params) {
    super(params);
    this.setTitle("Mummy");
  }

  async animation() {
    const runIntro = async () => {
      body.innerHTML = `<img src="assets/GIF/intro-mummy.gif" style="width: 100%; height: auto;" />`;
      let waitTime = await waitForMs(2000);
      body.innerHTML = `<img src="assets/GIF/Text-Mummy.gif" style="width: 100%; height: 100%" />`;
      waitTime = await waitForMs(3000);
      body.innerHTML = `<img src="assets/GIF/Text-VS.gif" style="width: 100%; height: 100%" />`;
      waitTime = await waitForMs(3000);
      body.innerHTML = `<img src="assets/GIF/intro-hero.gif" style="width: 100%; height: 100%" />`;
      waitTime = await waitForMs(3000);
    };

    runIntro();
  }

  async resetBody() {
    return (body.innerHTML = resetHTML);
  }

  async loadScript() {
    await import("../../../../main.js");
  }

  async enemyInfo() {
    return `
    <h2>Mummy</h2>
      <div class="health-bar-enemy">
      <div class="health-bar-value"></div>
      <div class="health-bar-fill"></div>
    </div>
    `;
  }

  async enemyStatic() {
    return `
      <img src="assets/PNG/Enemy-Mummy.png" alt="enemy" class="enemy-character"/>
    `;
  }
  async enemyAttacking() {
    return `
      <img src="images/Mummy_attacking.gif" alt="enemy" class="enemy-character"/>
    `;
  }
  async heroStatic() {
    return `
    <img src="assets/PNG/Hero.png" alt="hero" class="hero-character"/>
    `;
  }
  async heroAttacking() {
    return `
    <img src="images/Mummy_attacking.gif" alt="enemy" class="enemy-character"/>
    `;
  }
}
