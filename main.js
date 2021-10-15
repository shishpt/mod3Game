//  HTML node Selecting zone

let messegeBox = document.querySelector("#messege_box"),
  moveCounter = document.querySelector("#actual_move"),
  liveActionMessege = document.querySelector("#live_action_messege"),
  sentence = document.querySelector("#sentence"),
  actionButtons = document.querySelector("#actionButtons"),
  combatLogArea = document.querySelector("#combatLogArea");

//VISUAL UTILITIES

// set timeout for the selected amount of ms
const waitForMs = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//Typewriter function

const typeIt = async (messege, textBox, delay = 100) => {
  const letters = messege.split("");
  let i = 0;
  while (i < letters.length) {
    await waitForMs(delay);
    textBox.append(letters[i].toUpperCase());
    i++;
  }
  return;
};

//textbox erasing function

const eraseIt = async (textBox, delay = 100) => {
  const text = textBox.innerText;
  const letters = text.split("");
  let i = 0;
  while (letters.length > 0) {
    await waitForMs(delay);
    letters.pop();
    textBox.innerText = letters.join("");
  }
  return;
};

//GAME MECHANICS

// gameCharacter constructor
class gameCharacter {
  constructor(name, hp, mp) {
    this.name = name;
    //starts with max HP => actualHP===maxHP
    this.maxHp = hp;
    this.hp = hp;
    this.maxMP = mp;
    this.mp = mp;
  }
}

//skillMove constructor
class skillMove {
  constructor(index, name, dmg, manaCost, msg) {
    this.index = index;
    this.name = name;
    this.dmg = dmg;
    this.manaCost = manaCost;
    this.msg = msg;
  }
}

//Character construction site
const zombie = new gameCharacter("Zombie", 20, 20);
const player = new gameCharacter("Hero", 100, 10);
const mage = new gameCharacter("Mage", 150, 50);
const enemy = new gameCharacter("Bad guy", 100, 10);

//skill moves workshop
const fireball = new skillMove(0, "Fireball", 10, 2, "Fireball goes BOOM!");
const sword = new skillMove(1, "Sword", 5, 0, "Sword goes whooosh!");

// Creating a movelist from the newly created skills
let moveList = [fireball, sword];

// Game start setup
let moveCount = 0;
let attackingTurn = true;

//

const startGame = () => {
  actionSelector();
  nextRound();
};

const attack = async (attacking, defending, move) => {
  let message = move.msg;
  let moveName = move.name;
  await eraseIt(liveActionMessege, 20);

  typeIt(
    `${message} ${attacking.name} dealt ${move.dmg} with ${moveName} to ${defending.name}`,
    liveActionMessege,
    50
  );

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

  playerHealth.setValue(player.hp);
  enemyHealth.setValue(enemy.hp);

  if (attackingTurn === false) {
    moveCount++;
    moveCounter.innerText = moveCount;
  }
  combatLog(
    ` R ${moveCount} - ${attacking.name} dealt ${move.dmg} with ${moveName} to ${defending.name}`
  );
};

const actionSelector = () => {
  // Clears old buttons
  while (actionButtons.firstChild) {
    actionButtons.removeChild(actionButtons.firstChild);
  }
  // Creates new buttons form each element in the moveList with a event listener to execute that move
  moveList.forEach((move, i) => {
    const button = document.createElement("button");
    button.innerText = move.name;
    button.classList.add("btn", "moveBtn");
    button.addEventListener("click", () => {
      executingSelectedAction(move);
    });
    actionButtons.appendChild(button);
  });
};

const nextRound = () => {
  const button = document.createElement("button");
  button.innerText = "End turn";
  button.classList.add("btn", "endTurnBtn");
  button.addEventListener("click", () => {
    executingSelectedAction("endTurn");
  });
  button.disabled = true;
  actionButtons.appendChild(button);
};

const executingSelectedAction = (selectedAction) => {
  const endTurnBtn = document.querySelector(".endTurnBtn");
  const moveBtn = document.getElementsByClassName("moveBtn");

  if (player.hp > 0 && enemy.hp > 0) {
    // still playing
    if (attackingTurn) {
      Array.from(moveBtn).forEach((btn) => {
        btn.disabled = true;
      });
      console.log(`${player.name}'s turn to attack`);
      attack(player, enemy, selectedAction); // Selected action is defined on each button
      endTurnBtn.disabled = false;
    }
    if (selectedAction === "endTurn") {
      endTurnBtn.disabled = true;
      console.log(`${enemy.name}'s turn to attack`);
      attack(enemy, player, moveList[0]);
      Array.from(moveBtn).forEach((btn) => {
        btn.disabled = false;
      });
    }
    if (player.hp <= 0) {
      console.log("You died!");
    }
    if (enemy.hp <= 0) {
      console.log("You won!");
    }
  }
};

class healthBarPlayer {
  constructor(element, initialValue = player.hp) {
    this.valueElem = element.querySelector(".health-bar-value");
    this.fillElem = element.querySelector(".health-bar-fill");

    this.setValue(initialValue);
  }

  setValue(newValue) {
    if (newValue < 0) {
      newValue = 0;
    }

    this.value = newValue;
    this.update();
  }

  update() {
    const percentage = this.value + "%";
    this.fillElem.style.width = percentage;
    this.valueElem.textContent = percentage;
  }
}

const playerHealth = new healthBarPlayer(
  document.querySelector(".health-bar-player")
);

class healthBarEnemy {
  constructor(element, initialValue = enemy.hp) {
    this.valueElem = element.querySelector(".health-bar-value");
    this.fillElem = element.querySelector(".health-bar-fill");

    this.setValue(initialValue);
  }

  setValue(newValue) {
    if (newValue < 0) {
      newValue = 0;
    }

    this.value = newValue;
    this.update();
  }

  update() {
    const percentage = this.value + "%";
    this.fillElem.style.width = percentage;
    this.valueElem.textContent = percentage;
  }
}

const enemyHealth = new healthBarEnemy(
  document.querySelector(".health-bar-enemy")
);

const combatLog = (combatMsg) => {
  const para = document.createElement("p");
  const text = document.createTextNode(combatMsg);
  para.appendChild(text);
  //combatLogArea.appendChild(para);
  combatLogArea.prepend(para);
};

startGame();
