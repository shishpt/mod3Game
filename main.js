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

attack = (attacking, defending, move) => {
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

while (player.hp > 0 && enemy.hp > 0) {
  // still playing
  if (attackingTurn) {
    console.log(`${player.name}'s turn to attack`);
    let userSelect = prompt(
      `    1. Fireball
        2. Sword`
    );
    let chosenMove = parseInt(userSelect) - 1;
    attack(player, enemy, moveList[chosenMove]);
    // stop here and have the user choose what to do
  } else {
    console.log(`${enemy.name}'s turn to attack`);
    attack(enemy, player, moveList[0]);
  }
}
if (player.hp <= 0) {
  console.log("You died!");
}
if (enemy.hp <= 0) {
  console.log("You won!");
}

// if (player.hp > 0 && enemy.hp > 0) {
//   // still playing
//   if (attackingTurn) {
//     console.log(`${player.name}'s turn to attack`);
//     console.log("1. Fireball");
//     console.log("2. Run away");
//     let userSelect = prompt("Choose what to do");
//     let chosenMove = parseInt(userSelect) - 1;
//     attack(player, enemy, moveList[chosenMove]);
//     // stop here and have the user choose what to do
//   } else {
//     console.log(`${enemy.name}'s turn to attack`);
//     attack(enemy, player, moveList[0]);
//   }
// } else {
//   // either one has died
//   if (player.hp <= 0) {
//     console.log("You died!");
//   } else {
//     console.log("You won!");
//   }
// }
