import Game from './game.js';
import Upgrade from './upgrade.js';
// import { runInNewContext } from 'vm';


function main() {
    let game = new Game('user', 'password');
    makeUpgrades(game);
    renderGame(game);
    updateGame(game);
    updateUpgrades(game);
    window.setInterval(function() {
        game.onTick(game);
        updateGame(game);
        updateUpgrades(game);
    }, 100)
}

function makeUpgrades(game) {
    let friend = new Upgrade('Friend', 10, 20, 0, 'TICK');
    friend.setCostIncrementer(function (cost) {return cost * 1.1});
    friend.setIncrease(function (count) {return count * 0.1});
    friend.setDescription("BUY A FRIEND");
    friend.setImage("images/friend.jpg");
    game.addUpgrade(friend);

    let keyboard = new Upgrade('Keyboard', 20, 10, 0, 'CLICK');
    keyboard.setCostIncrementer(function (cost) {return cost * 1.1 + 3});
    keyboard.setIncrease(function (count) {return count});
    keyboard.setDescription("More keyboards mean you can type faster :D");
    keyboard.setImage("images/keyboard.png");
    game.addUpgrade(keyboard);
}

function renderGame(game) {
    //Renders the DOM with the game state info.
    $("#Button").on("click", function() {
        game.onClick();
    });
    for (let i = 0; i < game.upgrades.length; i++) {
        let upgrade = game.upgrades[i];

        let box = $("<div>");
        box.attr("id", upgrade.name);
        box.text(upgrade.name + ": \n");

        let count = $("<p>");
        count.attr("id", upgrade.name + "_count");
        box.append(count);

        let max = $("<p>");
        max.attr("id", upgrade.name + "_max");
        box.append(max);

        let buyButton = $('<button/>', {
            text: 'Buy',
            id: upgrade.name + "_buyButton",
            click: function () {game.buyUpgrade(upgrade)}
        });
        box.append(buyButton);
        box.append("<br/>")

        let cost = $("<p>");
        cost.attr("id", upgrade.name + "_cost");
        cost.addClass("tooltip");
        box.append(cost);

        let desc = $("<p>");
        desc.attr("id", upgrade.name + "_desc");
        desc.text(upgrade.description);
        box.append(desc);

        let img = $('<img>');
        img.attr("id", upgrade.name + "_img");
        img.attr("src", upgrade.image);
        box.append(img);

        $("#upgrade_container").append(box);
    }

}   

function updateGame(game) {
    //Updates the DOM with the game state info.
    //*May be redundant with renderGame function. Design is dependent on front-end team.
    $("#lines").text("Lines: " + parseFloat(Math.round(game.lines * 100) / 100).toFixed(1));
    $('#IQ').text("IQ: " + parseFloat(Math.round(game.IQ * 1000) / 1000).toFixed(3));
}

function updateUpgrades(game) {
    for(let i = 0; i < game.upgrades.length; i++) {
        let upgrade = game.upgrades[i];
        $(`#${upgrade.name}_count`).text("Amount: " + upgrade.count + '\n');
        $(`#${upgrade.name}_max`).text("Max Purchases: " + upgrade.maxPurchases + '\n');
        $(`#${upgrade.name}_cost`).text("Upgrade Cost: " + upgrade.cost.toFixed(0) + '\n');
    }
}

main()