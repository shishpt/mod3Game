import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor(params) {
    super(params);
    this.setTitle("Mummy");
  }

  async enemyStatic() {
    return `
      <img src="images/Mummy_attacking.gif" alt="enemy" class="enemy-character"/>
    `;
  }
  async enemyAttacking() {
    return `
      <img src="images/Mummy_attacking.gif" alt="enemy" class="enemy-character"/>
    `;
  }
}
