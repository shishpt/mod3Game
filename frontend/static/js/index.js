import startGame from "./views/startGame.js";
import mummy from "./views/mummy.js";
import err404 from "./views/err404.js";
//import { waitForMs } from "../../../main.js";

export const waitForMs = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/startGame", view: startGame },
    { path: "/404", view: err404 },
    { path: "/mummy", view: mummy },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();

  view.animation();

  let waitTime = await waitForMs(11200);

  view.resetBody(); // load the HTML for the game view

  document.querySelector(".enemy-info-container").innerHTML =
    await view.enemyInfo();

  document.querySelector(".enemy-character-container").innerHTML =
    await view.enemyStatic();

  document.querySelector(".player-character-container").innerHTML =
    await view.heroStatic();

  await import("../../../main.js"); // Load main.js
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
