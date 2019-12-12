import Upgrade from './upgrade.js';
import Cutscene from './cutscene.js';

export default class Game {
    constructor(user, password) {
        //Add login information to constructor later when making account info
        this.user = user;
        this.password = password;
        this.lines = 0;
        this.IQ = 0;
        this.upgrades = [];
        this.cutscenes = [];
        this.lps = 0;
        this.cps = 0;
        this.class = '110';
        this.IQtoPass = 100;
        this.readyToPass = false;
        this.classBonus = 1;
        this.totalIQ = 0;
        this.totalLines = 0;

    }

    getClass() {return this.class;}

    setClass(newClass) {this.class = newClass;}



    //IQ requirements to pass need heavy rebalancing. Need to be WAYYYYY higher in the later classes.
    passClass() {
        if (this.class == '110') {
            if (this.IQ >= this.IQtoPass) {
                this.reset();
                this.setClass('401');
                this.IQtoPass = 2000
                this.classBonus = 5;
                window.localStorage.setItem("userClass", this.class);
                return true;
            }
        } else if (this.class == '401') {
            if (this.IQ >= this.IQtoPass) {
                this.reset();
                this.setClass('410');
                this.classBonus = 18;
                this.IQtoPass = 50000;
                window.localStorage.setItem("userClass", this.class);
                return true;
            }
        } else if (this.class == '410') {
            if (this.IQ >= this.IQtoPass) {
                this.reset();
                this.setClass('411');
                this.classBonus = 66.6;
                this.IQtoPass = 666666;
                window.localStorage.setItem("userClass", this.class);
                return true;
            }
        } else if (this.class == '411') {
            if (this.IQ >= this.IQtoPass) {
                this.reset();
                this.setClass('411-2');
                this.classBonus = 250;
                this.IQtoPass = 696969;
                window.localStorage.setItem("userClass", this.class);
                return true;
            }
        } else if (this.class == '411-2') {
            if (this.IQ >= this.IQtoPass) {
                this.reset();
                this.setClass('426');
                this.classBonus = 700;
                this.IQtoPass = 100;
                window.localStorage.setItem("userClass", this.class);
                return true;
            }
        } else if (this.class == '426') {
            if (this.IQ >= this.IQtoPass) {
                this.reset();
                this.setClass('455');
                this.classBonus = 2019;
                this.IQtoPass = 10000000;
                window.localStorage.setItem("userClass", this.class);
                return true;
            }
        } else if (this.class == '455') {
            if (this.IQ >= this.IQtoPass) {
                this.reset();
                this.setClass('550');
                this.classBonus = 6969;
                this.IQtoPass = 550000000;
                window.localStorage.setItem("userClass", this.class);
                return true;
            }
        } else if (this.class == '550') {
            if (this.IQ >= this.IQtoPass) {
                this.reset();
                this.setClass('550');
                this.classBonus = 42069;
                this.IQtoPass = 10000000000000000000000000000000000;
                window.localStorage.setItem("userClass", this.class);
                return true;
            }
        } else {
            return false;
        }
    }

    reset() {
        this.lines = 0;
        this.IQ = 0;
        this.upgrades = [];
        this.lps = 0;
    }

    addUpgrade(upgrade) {
        this.upgrades.push(upgrade);
    }

    buyUpgrade(upgrade) {
        if ((upgrade.count < upgrade.maxPurchases) && (this.IQ >= upgrade.unlockIQ) && (this.lines >= upgrade.cost)){
            this.lines = this.lines - upgrade.cost;
            console.log("YOU BOUGHT THE UPGRADE FOR " + upgrade.cost + " LINES");
            upgrade.increaseCount();
        } else {
            console.log("YOU TOO POOR OR SOMETHING");
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
        // x = tickAmount * tickMultiplier * tickPercentage * allMultipler.
        // tickPercentage stacks additively.
        // tickMultipler and allMultiplier stacks multiplicatively.
        let tickAmount = 0;
        let tickMultiplier = 1;
        let tickPercentage = 1;
        let allPercentage = 1;
        let allMultiplier = 1;
        for (let i = 0; i < this.upgrades.length; i++) {
            let theUpgrade = this.upgrades[i];
            if (theUpgrade.type == 'TICK') {
                tickAmount = tickAmount + theUpgrade.increment();
            }
            if (theUpgrade.type == 'TICK_PER') {
                tickPercentage = tickPercentage + theUpgrade.increment();
            }
            if (theUpgrade.type == 'TICK_MULT') {
                if (theUpgrade.increment() == 0) {
                    tickMultiplier = tickMultiplier;
                } else {
                    tickMultiplier = tickMultiplier * theUpgrade.increment();
                }
            }
            if (theUpgrade.type == 'ALL_PER') {
                allPercentage = allPercentage + theUpgrade.increment();
            }
            if (theUpgrade.type == 'ALL_MULT') {
                allMultiplier = allMultiplier * theUpgrade.increment();
            }
        }
        this.lines = this.lines + (tickAmount * tickMultiplier * tickPercentage * allPercentage * allMultiplier * this.classBonus);
        this.IQ = this.IQ + (tickAmount * tickMultiplier * tickPercentage * allPercentage * allMultiplier * this.classBonus)/1000;
        this.lps = (tickAmount * tickMultiplier * tickPercentage * allPercentage * allMultiplier * this.classBonus) * 10;
        this.totalLines = this.totalLines + this.lps;
    }

    onClick() {
        let clickAmount = 1;
        let clickPercentage = 1;
        let clickMultiplier = 1;
        let allMultiplier = 1;
        let allPercentage = 1;
        for (let i = 0; i < this.upgrades.length; i++) {
            let theUpgrade = this.upgrades[i];
            if (theUpgrade.type == 'CLICK') {
                clickAmount = clickAmount + theUpgrade.increment();
            }
            if (theUpgrade.type == 'CLICK_PER') {
                clickPercentage = clickPercentage + theUpgrade.increment();
            }
            if (theUpgrade.type == 'CLICK_MULT') {
                clickMultiplier = clickMultiplier * theUpgrade.increment();
            }
            if (theUpgrade.type == 'ALL_PER') {
                allPercentage = allPercentage + theUpgrade.increment();
            }
            if (theUpgrade.type == 'ALL_MULT') {
                allMultiplier = allMultiplier * theUpgrade.increment();
            }
        }
        this.lines = this.lines + (clickAmount * clickMultiplier * clickPercentage * allPercentage * allMultiplier * this.classBonus);
        this.IQ = this.IQ + (clickAmount * clickMultiplier * clickPercentage * allPercentage * allMultiplier * this.classBonus)/1000;
        this.cps = (clickAmount * clickMultiplier * clickPercentage * allPercentage * allMultiplier * this.classBonus);
        this.totalIQ = this.totalIQ + this.cps;
    }

}