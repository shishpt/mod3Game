import startGame from "./views/startGame.js";
import mummy from "./views/mummy.js";
import err404 from "./views/err404.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: startGame },
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
    console.log(match.result);
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  console.log(match);

  const view = new match.route.view();

  document.querySelector("#enemy-combat").innerHTML = await view.enemyStatic();
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
