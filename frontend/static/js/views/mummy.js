import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor(params) {
    super(params);
    this.setTitle("Mummy");
  }

  async enemyStatic() {
    return `
      <img src="assets/PNG/Enemy-Mummy-Combat.png" alt="enemy" class="enemy-character"/>
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
