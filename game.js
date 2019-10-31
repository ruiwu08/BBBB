import Upgrade from './upgrade.js';

export default class Game {
    constructor(user, password) {
        //Add login information to constructor later when making account info
        this.user = user;
        this.password = password;
        this.lines = 0;
        this.IQ = 0;
        this.upgrades = [];
        this.class = "DEFAULT"; //Add class functionality later.
    }

    addUpgrade(upgrade) {
        this.upgrades.push(upgrade);
    }

    buyUpgrade(upgrade) {
        if ((upgrade.count <= upgrade.maxPurchases) && (this.IQ >= upgrade.unlockIQ)){
            this.lines = this.lines - upgrade.cost;
            upgrade.increaseCount();
        }
        // Add something that happens if max purchases have been reached
    }

    saveGameState() {
        let gameState = {user : this.user,
                        password : this.password,
                        lines : this.lines,
                        IQ : this.IQ,
                        upgrades : this.upgrades};
        return gameState;
    }

    loadGameState(gameState) {
        this.user = gameState.user;
        this.password = gameState.password;
        this.lines = gameState.lines;
        this.IQ = gameState.IQ;
        this.upgrades = gameState.upgrades;
    }

    onTick() {
        // On each game tick, add x number of lines.
        // x = tickAmount * tickMultiplier * allMultipler.
        // tickMultipler stacks additively, allMultiplier stacks multiplicatively.
        let tickAmount = 0;
        let tickMultiplier = 1;
        let allMultiplier = 1;
        for (let i = 0; i < this.upgrades.length; i++) {
            let theUpgrade = this.upgrades[i];
            if (theUpgrade.type == 'TICK') {
                tickAmount = tickAmount + theUpgrade.increment();
            }
            if (theUpgrade.type == 'TICK_MULT') {
                tickMultiplier = tickMultiplier + theUpgrade.increment();
            }
            if (theUpgrade.type == 'ALL_MULT') {
                allMultiplier = allMultiplier * theUpgrade.increment();
            }
        }
        this.lines = this.lines + (tickAmount * tickMultiplier * allMultiplier);
        this.IQ = this.IQ + (tickAmount * tickMultiplier * allMultiplier)/1000;
    }

    onClick() {
        let clickAmount = 1;
        let clickMultiplier = 1;
        let allMultiplier = 1;
        console.log("CLICK");
        for (let i = 0; i < this.upgrades.length; i++) {
            let theUpgrade = this.upgrades[i];
            if (theUpgrade.type == 'CLICK') {
                clickAmount = clickAmount + theUpgrade.increment();
            }
            if (theUpgrade.type == 'CLICK_MULT') {
                clickMultiplier = clickMultiplier + theUpgrade.increment();
            }
            if (theUpgrade.type == 'ALL_MULT') {
                allMultiplier = allMultiplier * theUpgrade.increment();
            }
        }
        this.lines = this.lines + (clickAmount * clickMultiplier * allMultiplier);
        this.IQ = this.IQ + (clickAmount * clickMultiplier * allMultiplier)/1000;
    }

}