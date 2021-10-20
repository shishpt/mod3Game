import abstractView from "./abstractView.js";
import { waitForMs } from "../index.js";

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
    return (body.innerHTML = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css" />
        <title>PokeDex RPG</title>
      </head>
      <body>
        <div class="content-desktop">
          <div class="grid-container">
            <div class="player-info-container">
              <!-- Instert player info container here -->
              <h2>Hero</h2>
              <div class="hp-container-player">
                <div class="health-bar-player">
                  <div class="health-bar-value"></div>
                  <div class="health-bar-fill"></div>
                </div>
                <div class="mana-bar-player">
                  <div class="mana-bar-value"></div>
                  <div class="mana-bar-fill"></div>
                </div>
              </div>
            </div>
    
            <div id="actionButtons" class="action-buttons">
              <button class="btn">Button</button>
            </div>
    
            <div class="vertical-line"></div>
    
            <div class="enemy-info-container">
              <!-- Instert enemy info container here -->
              <h2>Bad Guy</h2>
              <div class="health-bar-enemy">
                <div class="health-bar-value"></div>
                <div class="health-bar-fill"></div>
              </div>
            </div>
    
            <div class="enemy-character-container">
              <!-- Instert enemy character model here -->
            </div>
    
            <div class="player-character-container">
              <!-- Instert player character model here -->
            </div>
    
            <div class="message-box-container">
              <div id="messege_box">
                <h1 id="move_counter">Round <span id="actual_move">0</span></h1>
                <p id="live_action_messege"></p>
              </div>
            </div>
    
            <div class="horizontal-line"></div>
            <div class="log-area-container">
              <img src="assets/PNG/TV.png" class="tv" alt="TV" />
              <div id="combatLogArea"></div>
            </div>
          </div>
        </div>
    
        <!-- <script type="module" src="main.js"></script> -->
        <script type="module" src="./frontend/static/js/index.js"></script>
      </body>
    </html>
    `);
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
    <img src="assets/PNG/Thumbnail-Hero.png" alt="enemy" class="enemy-character"/>
    `;
  }
  async heroAttacking() {
    return `
    <img src="images/Mummy_attacking.gif" alt="enemy" class="enemy-character"/>
    `;
  }
}
