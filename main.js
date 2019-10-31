import Game from './game.js';
import Upgrade from './upgrade.js';


function main() {
    let game = new Game('user', 'password');
    makeUpgrades(game);
    renderGame(game);
    updateGame(game);
    console.log("BREAK");
    // $("#Button").click(game.onClick);
    // $("#Button").click(updateGame(game));
    window.setInterval(function() {
        game.onTick(game);
        updateGame(game);
    }, 100)
}

function makeUpgrades(game) {
    let friend = new Upgrade('friend', 10, 20, 0, 'TICK');
    // friend.setCount(1);
    friend.setCostIncrementer(function (cost) {return cost * 1.1});
    friend.setIncrease(function (count) {return count * 0.1});
    game.addUpgrade(friend);
}

function renderGame(game) {
    //Renders the DOM with the game state info.
    $("#Button").on("click", function() {
        game.onClick();
    });
}   

function updateGame(game) {
    //Updates the DOM with the game state info.
    //*May be redundant with renderGame function. Design is dependent on front-end team.
    $("#lines").text("Lines: " + parseFloat(Math.round(game.lines * 100) / 100).toFixed(1));
    $('#IQ').text("IQ: " + parseFloat(Math.round(game.IQ * 1000) / 1000).toFixed(3));
}



main()