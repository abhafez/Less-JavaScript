import "./style.css";
import javascriptLogo from "./assets/javascript.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

document.querySelector("#app").innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src=${viteLogo} class="vite" alt="Vite logo" />
  </div>
</section>

<section id="demos">
  <a href="/src/examples/sticky-cards-scroll.html" class="demo-card">
    <span class="demo-card__title">Stacking Cards Scroll</span>
    <span class="demo-card__desc">Cards pile up as you scroll</span>
    <span class="demo-card__arrow">&#8594;</span>
  </a>
  <a href="/src/examples/back-to-top.html" class="demo-card">
    <span class="demo-card__title">Back to Top Button</span>
    <span class="demo-card__desc">Sticky scroll-to-top anchor</span>
    <span class="demo-card__arrow">&#8594;</span>
  </a>
</section>

<div class="ticks"></div>

<div class="ticks"></div>
<section id="spacer"></section>
`;
