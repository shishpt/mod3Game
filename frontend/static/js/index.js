import mummy from "./views/mummy.js";
import err404 from "./views/err404.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    //{ path: "/", view: startGame },
    { path: "/mummy", view: mummy },
    //{ path: "/blog/:id", view: blogView },
    { path: "/404", view: err404 },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    console.log(location.pathname.match(route.path));
    return {
      route: route,
      result: location.pathname.match(route.path),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  //console.log(match);

  if (!match) {
    match = {
      route: routes[3],
      result: [location.pathname],
    };
  }

  console.log(match);

  const view = new match.route.view(getParams(match));

  document.querySelector(".content").innerHTML = await view.getHTML();
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
