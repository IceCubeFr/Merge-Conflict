export interface Developer {
    forename:string;
    lastname:string;
    surname:string;
    group:string;
    favGame:string;
    grade:number;
}

export interface BestScore {
    pseudo:string;
    score:number;
    date:Date;
}

export default class Player {
    health: number;
    score: number;
    models = [];

    constructor() {
        this.health = 3;
        this.score = 0;
    }

    takeHealth() {
        this.health--;
    }

    verifyHealth() {
        if(this.health == 0) {
            return false;
        }
        return true;
    }

    giveHealth(hp:number) {
        this.health += hp;
    }
}