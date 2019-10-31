import Game from './game.js';
import Upgrade from './upgrade.js';


function main() {
    let game = new Game('user', 'password');
    makeUpgrades(game);
    renderGame(game);
    updateGame(game);
    window.setInterval(function() {
        console.log("MONEY");
        game.onTick(game);
        updateGame(game);
    }, 100)
}

function makeUpgrades(game) {
    let friend = new Upgrade('friend', 10, 20, 0, 'TICK');
    friend.costIncrementer = function (cost) {return cost * 1.1};
    friend.increase = function (count) {return count * 0.1};
    game.addUpgrade(friend);
}

function renderGame(game) {
    //Renders the DOM with the game state info.
    $("lines");
    $("lines");
}

function updateGame(game) {
    //Updates the DOM with the game state info.
    //*May be redundant with renderGame function. Design is dependent on front-end team.
}



main()