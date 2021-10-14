//  HTML node Selecting zone

let messegeBox= document.querySelector('#messege_box');
let moveCounter =document.querySelector('#actual_move');
let liveActionMessege = document.querySelector('#live_action_messege');
let sentence = document.querySelector('#sentence')
//VISUAL UTILITIES 


//Typewriter function 
//

async function typeIt(messege, textBox, delay =100 ) {
  const letters =messege.split("");
  let i = 0;
  while(i<letters.length) { 

    await waitForMs(delay);
    textBox.append(letters[i].toUpperCase());
    i++
  }
  return;
}

function waitForMs(ms) {
  return new Promise(resolve=>setTimeout(resolve,ms))
}


//textbox erasing function 

async function eraseIt(textBox,delay=100) {
  const text=textBox.innerText;
  const letters = text.split("");
  let i=0;
  while (letters.length>0) {
    await waitForMs(delay);
    letters.pop();
    textBox.innerText=letters.join("");
  }
  return
}

//GAME MECHANICS


// gameCharacter constructor

function gameCharacter(name,hp,mp) {
  this.name=name;
  //starts with max HP => actualHP===maxHP
  this.maxHp=hp;
  this.hp=hp;
  this.maxMP=mp;
  this.mp=mp;
}

//skillMove constructor

function skillMove(name,dmg,manaCost,msg){ 
  this.name=name;
  this.dmg = dmg;
  this.manaCost = manaCost;
  this.msg = msg;
}

//Character construction site

const zombie = new gameCharacter('Zombie',20,20);
const player = new gameCharacter('Hero',100,10);
const mage = new gameCharacter('Mage',150,50);
const enemy = new gameCharacter('Bad guy',100,10);


//skill moves workshop 

const fireball = new skillMove('Fireball',10,2,'Fireball goes BOOM!');
const sword = new skillMove('Sword',5,0,'Sword goes whooosh!');



let moveList = [fireball, sword];

// Game start setup 
let moveCount = 0;
let attackingTurn = true;


//

async function attack (attacking, defending, move) {
  let message = move.msg;
  let moveName = move.name;
  await eraseIt(liveActionMessege,50);
  
  typeIt(`${message}


  ${attacking.name} dealt ${move.dmg} with ${moveName} to ${defending.name}`, liveActionMessege);

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
  
  
  moveCount ++;
  moveCounter.innerText=moveCount;

};
/*
while (player.hp > 0 && enemy.hp > 0) {
  // still playing
  if (attackingTurn) {
    console.log(`${player.name}'s turn to attack`);
    
    let userSelect = prompt(
      `    1. Fireball
        2. Sword`
    );
    let chosenMove = parseInt(userSelect) - 1;
    attack(player, enemy, moveList[chosenMove])
    
    
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

*/


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
