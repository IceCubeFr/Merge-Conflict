import { render } from "./credits";

const creditsform = document.querySelector(".credits-form");
const creditBackButton = document.querySelector(".credit-back");

const mainMenuSection = document.querySelector("section.main-menu");
const creditsSection = document.querySelector(".credits-section")!;

creditsform?.addEventListener('submit', (event) => {
    event.preventDefault();
    mainMenuSection?.classList.add("hidden");
    creditsSection.classList.remove("hidden");
    const content = creditsSection.querySelector("table tbody");
    if(content) content.innerHTML = render();
});

creditBackButton?.addEventListener('click', (event) => {
    event.preventDefault();
    mainMenuSection?.classList.remove("hidden");
    creditsSection.classList.add("hidden");
});