let player = {
  name: "Hero",
  hp: 100,
  mp: 10,
};

let enemy = {
  name: "Bad guy",
  hp: 100,
  mp: 10,
};

let fireball = {
  name: "fireball",
  dmg: 10,
  manaCost: 2,
  msg: "Fireball was super effective!",
};
let sword = {
  name: "fireball",
  dmg: 4,
  manaCost: 0,
  msg: "Sword is heavy, goes doink!",
};

let moveList = [fireball, sword];

let attackingTurn = true;

const attack = (attacking, defending, move) => {
  let message = move.msg;
  let moveName = move.name;

  console.log(
    `${attacking.name} dealt ${move.dmg} with ${moveName} to ${defending.name}`
  );
  console.log(message);

  defending.hp = defending.hp - move.dmg;
  attacking.mp = attacking.mp - move.manaCost;

  console.log(`${attacking.name} HP: ${attacking.hp}`);
  console.log(`${defending.name} HP: ${defending.hp}`);
  console.log(`-------------------------------------------`);
  attackingTurn = !attackingTurn;
};

const fireballBtn = document.getElementById("fireball");
const swordBtn = document.getElementById("sword");
const nextBtn = document.getElementById("next");

const startGame = () => {
  fireballBtn.disabled = false;
  swordBtn.disabled = false;
  nextBtn.disabled = true;
  console.log(`Please select an action`);
};

fireballBtn.addEventListener("click", () => {
  executingSelectedAction(0);
  fireballBtn.disabled = true;
  swordBtn.disabled = true;
  nextBtn.disabled = false;
});
swordBtn.addEventListener("click", () => {
  executingSelectedAction(1);
  fireballBtn.disabled = true;
  swordBtn.disabled = true;
  nextBtn.disabled = false;
});
nextBtn.addEventListener("click", () => {
  executingSelectedAction(0);
  fireballBtn.disabled = false;
  swordBtn.disabled = false;
  nextBtn.disabled = true;
});
const executingSelectedAction = (selectedAction) => {
  if (player.hp > 0 && enemy.hp > 0) {
    // still playing
    if (attackingTurn) {
      fireballBtn.disabled = false;
      swordBtn.disabled = false;
      nextBtn.disabled = true;
      console.log(`${player.name}'s turn to attack`);
      attack(player, enemy, moveList[selectedAction]); // Selected action is defined on each button
    } else {
      fireballBtn.disabled = true;
      swordBtn.disabled = true;
      nextBtn.disabled = false;
      console.log(`${enemy.name}'s turn to attack`);
      attack(enemy, player, moveList[0]);
    }
    if (player.hp <= 0) {
      console.log("You died!");
    }
    if (enemy.hp <= 0) {
      console.log("You won!");
    }
  }
};

startGame();
