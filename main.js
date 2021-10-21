//  HTML node Selecting zone

let messegeBox = document.querySelector("#messege_box"),
  moveCounter = document.querySelector("#actual_move"),
  liveActionMessege = document.querySelector("#live_action_messege"),
  sentence = document.querySelector("#sentence"),
  actionButtons = document.querySelector("#actionButtons"),
  combatLogArea = document.querySelector("#combatLogArea"),
  moveBtn = document.getElementsByClassName("moveBtn"),
  heroCharacterImage = document.querySelector(".hero-character"),
  enemyCharacterImage = document.querySelector(".enemy-character"),
  heroNameTag = document.querySelector("#hero-name"),
  enemyNameTag = document.querySelector("#enemy-name");

// Game start setup
let moveCount = 0;
let attackingTurn = true;

//randomized integer (index-like range froom 0 to max-1)
const randomNum = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};
// set timeout for the selected amount of ms
const waitForMs = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//VISUAL UTILITIES

//Animating characters during attacks

const animateAttack = async (character) => {
  let charName = character.name;
  let playerName = player.name;

  if (charName === playerName) {
    let basicStance = heroCharacterImage.src;
    heroCharacterImage.src = "/assets/GIF/hero_attacking.gif";
    await waitForMs(1400);
    heroCharacterImage.src = basicStance;
  } else {
    let basicStance = enemyCharacterImage.src;
    console.log(character.name);
    enemyCharacterImage.src = `/assets/GIF/${character.name}_attacking.gif`;
    await waitForMs(2000);
    enemyCharacterImage.src = basicStance;
  }
};

//Typewriter function

//textbox erasing function

const eraseIt = async (textBox, delay = 15) => {
  const text = textBox.innerText;
  const letters = text.split("");
  while (letters.length > 0) {
    await waitForMs(delay);
    letters.pop();
    textBox.innerText = letters.join("");
  }
  return;
};
// Types out a message letter by letter and disables all buttons in the meanwhile
const typeIt = async (messege, textBox, delay = 60) => {
  //Disable all buttons
  const btns = document.getElementsByTagName("button");
  Array.from(btns).forEach((btn) => {
    btn.disabled = true;
  });

  let eraseDelay = delay / 4;
  await eraseIt(textBox, eraseDelay);

  const letters = messege.split("");

  let i = 0;
  while (i < letters.length) {
    await waitForMs(delay);
    textBox.append(letters[i].toUpperCase());
    i++;
  }
  enableDisableBtnsBasedOnWhosTurnItIs(); // Enables and disable the buttons based on whos turn it is
  return;
};

//GAME MECHANICS

// gameCharacter constructor
class gameCharacter {
  constructor(name, hp, mp, statusName, statusDuration) {
    this.name = name;
    //starts with max HP => actualHP===maxHP
    this.maxHp = hp;
    this.hp = hp;
    this.maxMP = mp;
    this.mp = mp;
    this.status = [{ statusName: statusName, statusDuration: statusDuration }];
  }
}

//skillMove constructor
class skillMove {
  constructor(
    name,
    dmg,
    manaCost,
    msg,
    tooltipMsg,
    statusName,
    statusDuration
  ) {
    this.name = name;
    this.dmg = dmg;
    this.manaCost = manaCost;
    this.msg = msg;
    this.tooltipMsg = tooltipMsg;
    if (statusName) {
      this.statusName = statusName;
      this.statusDuration = statusDuration;
    }
  }
}

//Character construction site
const mummy = new gameCharacter("Mummy", 20, 20);
const player = new gameCharacter("Hero", 100, 10);
const mage = new gameCharacter("Mage", 150, 50);
const enemy = new gameCharacter("mummy", 100, 10);

//skill moves workshop
const fireball = new skillMove(
  "Fireball",
  15,
  5,
  "Fireball goes BOOM!",
  "Powerfull spell which burns",
  "burn",
  5
);
const gamepad = new skillMove(
  "Gamepad",
  5,
  0,
  "Gamepad goes whooosh!",
  "Light attack with a console controller"
);
const acid = new skillMove(
  "Acid",
  2,
  0,
  "Acid goes SPLASH!",
  "acid attack, cause poison",
  "poison",
  5
);
const bubble = new skillMove(
  "Bubble bomb",
  10,
  1,
  "Chewing gum explodes!",
  "Strong attack with a chewing gum,cause poison",
  "poison",
  6
);
const bondage = new skillMove(
  "Bandage ",
  7,
  0,
  "Bandage Bondage!",
  "medium attack with bandages"
);
const screem = new skillMove(
  "Screem",
  9,
  0,
  "High pitch screem is painful",
  "attack with a sonic wave"
);
const zap = new skillMove(
  "Zap",
  20,
  1,
  "Zapper goes Zzzzap",
  "Powerful shot from the Zapper"
);
const lighter = new skillMove(
  "Lighter",
  30,
  5,
  "Lighter explodes. KABOOM!",
  "Powerful lighter cause burn ",
  "burn",
  6
);
const jab = new skillMove(
  "Jab",
  randomNum(40, 1),
  0,
  "Surprising skill",
  "pretty random Jab"
);

// Creating a movelist from the newly created skills
let moveList = [gamepad, bubble, lighter, jab];
let enemyMoveList = [bondage, acid, zap, screem];

//Function to start the game, running a few functions that create buttons based on the moveList and endTurn button
const loadGame = () => {
  actionSelector();
  nextRound();
};

//Attack function

const checkMana = (move, attacking) => {
  return move.manaCost <= attacking.mp;
};

const attack = async (attacking, defending, move) => {
  let message = move.msg;
  let moveName = move.name;

  //animateAttack(attacking);

  typeIt(
    `${message} ${attacking.name} dealt ${move.dmg} with ${moveName} to ${defending.name}`,
    liveActionMessege
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

  //If move has a status effect, let's add it!
  if (move.statusName) {
    addStatus(defending, move.statusName, move.statusDuration);
  }

  attackingTurn = !attackingTurn;

  playerHealth.setValue(player.hp);
  enemyHealth.setValue(enemy.hp);
  playerMana.setValue(player.mp);

  if (attackingTurn === false) {
    moveCount++;
    moveCounter.innerText = moveCount;
  }
  combatLog(
    ` R ${moveCount} - ${attacking.name} dealt ${move.dmg} with ${moveName} to ${defending.name}`
  );
};

const findStatus = (character, statusName) => {
  for (let i = 0; i < character.status.length; i++) {
    if (character.status[i].statusName === statusName) {
      return i;
    }
  }
  return -1;
};

const addStatus = (characterAffected, statusName, statusDuration) => {
  //if character is not affected by this debuff yet:
  if (findStatus(characterAffected, statusName) < 0) {
    characterAffected.status.push({
      statusName: statusName,
      statusDuration: statusDuration,
    });
  } else {
    // if character has the debuff already, add to its duration
    let index = findStatus(characterAffected, statusName);
    characterAffected.status[index].statusDuration += statusDuration;
  }
};

const checkStatus = async (character, statusName) => {
  if (findStatus(character, statusName) >= 0) {
    let index = findStatus(character, statusName);
    switch (character.status[index]["statusName"]) {
      case "burn":
        if (character.status[index].statusDuration > 0) {
          character.hp -= 5;
          character.status[index].statusDuration--;
          playerHealth.setValue(player.hp);
          enemyHealth.setValue(enemy.hp);
          await typeIt(
            `${character.name} loses 5 hp in fact of a burn`,
            liveActionMessege
          );
        }
        break;
      case "poison":
        if (character.status[index].statusDuration > 0) {
          let dmg = character.status[index].statusDuration;
          character.hp -= dmg;
          character.status[index].statusDuration--;
          playerHealth.setValue(player.hp);
          enemyHealth.setValue(enemy.hp);
          await typeIt(
            `${character.name} loses ${dmg} hp in fact of Poison`,
            liveActionMessege
          );
        }
        break;
      default:
        console.log("no status effect");
    }
  }
};

const actionSelector = () => {
  // Clears old buttons
  while (actionButtons.firstChild) {
    actionButtons.removeChild(actionButtons.firstChild);
  }
  // Creates new buttons form each element in the moveList with a event listener to execute that move
  moveList.forEach((move) => {
    const button = document.createElement("button");

    button.innerHTML = ` ${move.name} <span class='tooltip-text'>costs ${move.manaCost} MP.  ${move.tooltipMsg}</span>`;

    button.classList.add("btn", "moveBtn");

    button.addEventListener("click", () => {
      if (checkMana(move, player)) {
        executingSelectedAction(move);
      } else {
        console.log("mana issue");
        typeIt(
          `You don't have enough mana. Pick another attack`,
          liveActionMessege
        );
      }
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
    console.log("end of the turn");
  });
  button.disabled = true;
  actionButtons.appendChild(button);
};

const executingSelectedAction = async (selectedAction) => {
  const endTurnBtn = document.querySelector(".endTurnBtn");

  if (player.hp > 0 && enemy.hp > 0) {
    // still playing
    if (attackingTurn) {
      Array.from(moveBtn).forEach((btn) => {
        btn.disabled = true;
      });
      await checkStatus(player, "burn");
      await checkStatus(player, "poison");
      console.log(`${player.name}'s turn to attack`);
      await attack(player, enemy, selectedAction); // Selected action is defined on each button
      endTurnBtn.disabled = false;
    }
    if (selectedAction === "endTurn") {
      await checkStatus(enemy, "burn");
      await checkStatus(enemy, "poison");
      endTurnBtn.disabled = true;
      console.log(`${enemy.name}'s turn to attack`);
      await attack(
        enemy,
        player,
        enemyMoveList[randomNum(enemyMoveList.length)]
      );
      Array.from(moveBtn).forEach((btn) => {
        btn.disabled = false;
      });
    }
    if (player.hp <= 0) {
      await waitForMs(4000);
      typeIt(`Congratz! You've just died!`, liveActionMessege);
      console.log("You died!");
    }
    if (enemy.hp <= 0) {
      await waitForMs(4000);
      typeIt(
        `Congratz! You've just defeat the ${enemy.name}`,
        liveActionMessege
      );
      console.log("You won!");
    }
  }
};

class healthBarPlayer {
  constructor(element, initialValue = player.hp) {
    this.valueElem = element.querySelector(".health-bar-value");
    this.fillElem = element.querySelector(".health-bar-fill");
    if (this.value <= 50 && this.value >= 31) {
      this.fillElem.style.background = "#FFBF00";
    } else if (this.value < 30) {
      this.fillElem.style.background = "#C41E3A";
    }
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
    const percentage = (this.value * 100) / player.maxHp;
    this.fillElem.style.width = percentage + "%";
    this.valueElem.textContent = this.value + "/" + player.maxHp;
    if (percentage <= 50 && percentage >= 31) {
      this.fillElem.style.background = "#FFBF00";
    } else if (percentage < 30) {
      this.fillElem.style.background = "#C41E3A";
    }
  }
}

const playerHealth = new healthBarPlayer(
  document.querySelector(".health-bar-player")
);

class manaBarPlayer {
  constructor(element, initialValue = player.mp) {
    this.valueElem = element.querySelector(".mana-bar-value");
    this.fillElem = element.querySelector(".mana-bar-fill");

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
    const percentage = (this.value * 100) / player.maxMP + "%";
    this.fillElem.style.width = percentage;
    this.valueElem.textContent = this.value + "/" + player.maxMP;
  }
}

const playerMana = new manaBarPlayer(
  document.querySelector(".mana-bar-player")
);

class healthBarEnemy {
  constructor(element, initialValue = enemy.hp) {
    this.valueElem = element.querySelector(".health-bar-value");
    this.fillElem = element.querySelector(".health-bar-fill");
    if (
      (this.value * 100) / enemy.maxHp <= 50 &&
      (this.value * 100) / enemy.maxHp >= 31
    ) {
      this.fillElem.style.background = "#FFBF00";
    } else if ((this.value * 100) / enemy.maxHp < 30) {
      this.fillElem.style.background = "#C41E3A";
    }

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
    const percentage = (this.value * 100) / enemy.maxHp;
    this.fillElem.style.width = percentage + "%";
    this.valueElem.textContent = this.value + "/" + enemy.maxHp;
    if (percentage <= 50 && percentage >= 31) {
      this.fillElem.style.background = "#FFBF00";
    } else if (percentage < 30) {
      this.fillElem.style.background = "#C41E3A";
    }
  }
}

const enemyHealth = new healthBarEnemy(
  document.querySelector(".health-bar-enemy")
);

const combatLog = (combatMsg) => {
  const para = document.createElement("p");
  const text = document.createTextNode(combatMsg);
  para.appendChild(text);
  combatLogArea.prepend(para);
};

const enableDisableBtnsBasedOnWhosTurnItIs = () => {
  const endTurnBtn = document.querySelector(".endTurnBtn");

  if (attackingTurn) {
    Array.from(moveBtn).forEach((btn) => {
      btn.disabled = false;
    });
    endTurnBtn.disabled = true;
  }
  if (!attackingTurn) {
    endTurnBtn.disabled = false;
    Array.from(moveBtn).forEach((btn) => {
      btn.disabled = true;
    });
  }
};

loadGame();
