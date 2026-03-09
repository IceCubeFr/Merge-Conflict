import type { BestScore } from "./domain/types";

const todayDate:Date = new Date(Date.now());

const bestScores:BestScore[] = [{pseudo:"j1", score:100, date:todayDate}, {pseudo:"j2", score:97, date:todayDate}, {pseudo:"j3", score:95, date:todayDate}];

export function renderLeaderboard() {
    let html = "";
    bestScores.forEach((val:BestScore) => {
        html += `<tr><th>${val.pseudo}</th><td>${val.score}</td><td>${val.date.toLocaleDateString()}</td></tr>`
    });
    return html;
}